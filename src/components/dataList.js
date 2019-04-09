import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DoneIcon from "@material-ui/icons/Done";
import TouchIcon from "@material-ui/icons/TouchApp";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import filteredAlbums from "../albums/selectorAlbums";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    height: "100%",
    maxHeight: 400,
    overflow: "auto"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, fData, person, setMaxNumber } = this.props;
    return (
      <List component="nav" className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText inset secondary="Name" primary={person.name} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText inset secondary="User Name" primary={person.username} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText
            inset
            secondary="e-Mail address"
            primary={person.email}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TouchIcon />
          </ListItemIcon>
          <Button
            variant="outlined"
            onClick={() => setMaxNumber(30)}
            color="primary"
            className={classes.button}
          >
            {`Letters in Title < 30`}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setMaxNumber(40)}
            color="primary"
            className={classes.button}
          >
            {`Letters in Title < 40`}
          </Button>
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText
            inset
            secondary="see breakdown and click for location"
            primary={`Number of Albums: ${fData.length}`}
          />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.open}
          timeout="auto"
          collapsedHeight="10px"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {fData.map((elem, index) => (
              <ListItem
                button
                className={classes.nested}
                key={index}
                onClick={() => this.props.updateMap(index)}
              >
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary={` ${index + 1}.- ${elem.title},(${
                    elem.title.length
                  } letters)`}
                  secondary="Title"
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    );
  }
}

DataList.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default withStyles(styles)(DataList);
const mapStateToProps = state => {
  console.log(state.reducerUsers);
  return {
    fetching: state.reducerUsers.fetching,
    fData: filteredAlbums(state),
    error: state.reducerUsers.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMaxNumber: maxNumber => {
      return dispatch({ type: "SET_MAX_NUMBER", maxNumber });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DataList));
