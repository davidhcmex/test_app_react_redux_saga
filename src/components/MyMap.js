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
      markerVisible: false,
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
    this.setState({
      markerVisible: true,
      locations: la_points[id]
    });
  };

  setMarkerOff = () => {
    this.setState({
      markerVisible: false
    });
  };

  render() {
    const { viewport } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={8} sm={8} lg={8}>
            <Typography variant="h4" gutterBottom>
              Locations
            </Typography>
            <ReactMapGL
              {...viewport}
              onViewportChange={this._updateViewport}
              width={800}
              height={420}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxApiAccessToken={TOKEN}
            >
              {this.state.markerVisible ? (
                <Marker
                  latitude={this.state.locations.lat}
                  longitude={this.state.locations.long}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <CityPin size={20} />
                </Marker>
              ) : null}
              }
            </ReactMapGL>
          </Grid>
          <Grid item xs={4} sm={4} lg={4}>
            <Typography variant="h4" gutterBottom>
              Person Details
            </Typography>
            <DataList
              person={this.state.person}
              updateMap={this.updateMap}
              setMarkerOff={this.setMarkerOff}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <Typography component="span" variant="body1" gutterBottom>
            <p>
              The app fetches data from two endpoints provided by the site
              "jsonplaceholder.typicode.com". When a person is selected from the
              table, the app redirects to this page where the details are shown
              on the right along with the number of Albums (Music CD albums)
              associated with the person.
            </p>
            <p>
              One interesting feature in the "Person Details" list is the
              ability to filter the Albums by the maximum number of letters in
              the corresponding Album Title: that is achieved by pressing the
              corresponding button, two are provided: one that filters to only
              the albums with a maximum number of letters in the title less that
              30 and the other less than 40. The number of albums adjusts to the
              filtering option and the expandable list adjusts too.
            </p>
            <p>
              The feature described above was made possible using an advanced
              Redux feature: Selectors
            </p>
            <p>
              Each album is associated with a location on the map to the right.
              When an Album Title is selected from the sub-list that shows when
              pressing "Number of Albums", the corresponding location is updated
              on the map
            </p>
          </Typography>
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
