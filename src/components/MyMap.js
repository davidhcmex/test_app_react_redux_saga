import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CityPin from "./helpers/city-pin";
import DataList from "./dataList";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import la_points from "./helpers/points";

const TOKEN =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"; // Set your mapbox token here

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 33.9365,
        longitude: -118.1509,
        zoom: 9
      },
      person: JSON.parse(this.props.match.params.userid),
      locations: la_points[0]
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  componentDidMount() {
    this.props.setUserId(this.state.person.id);
  }

  updateMap = id => {
    console.log(id);
    this.setState({ locations: la_points[id] });
  };

  render() {
    const { viewport } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={8} sm={8} lg={8}>
            <Typography component="h3" variant="h4" gutterBottom>
              Locations
            </Typography>
            <ReactMapGL
              {...viewport}
              onViewportChange={this._updateViewport}
              width={800}
              height={400}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxApiAccessToken={TOKEN}
            >
              <Marker
                latitude={this.state.locations.lat}
                longitude={this.state.locations.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <CityPin size={20} />
              </Marker>
            </ReactMapGL>
          </Grid>
          <Grid item xs={4} sm={4} lg={4}>
            <Typography component="h3" variant="h4" gutterBottom>
              Person Details
            </Typography>
            <DataList person={this.state.person} updateMap={this.updateMap} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

MyMap.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setUserId: id => dispatch({ type: "SET_USER_ID", id })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MyMap));
