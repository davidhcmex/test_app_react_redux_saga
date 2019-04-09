import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DoneIcon from "@material-ui/icons/Done";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import filteredAlbums from "../albums/selectorAlbums";

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
    const { classes, fData, person } = this.props;
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
                onClick={() => this.props.updateMap(index)}
              >
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText inset primary={elem.title} secondary="Title" />
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

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(DataList));
