import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import TableDetail from "./TableDetail";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  head: {
    backgroundColor: theme.palette.common.white
  }
});

class MyTable extends Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }

  componentDidMount() {
    this.props.onRequestUsersData();
    this.props.onRequestAlbumsData();
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Persons
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.head}>
              <CustomTableCell align="center">Name</CustomTableCell>
              <CustomTableCell align="center">Username</CustomTableCell>
              <CustomTableCell align="center">email</CustomTableCell>
              <CustomTableCell align="center">Phone</CustomTableCell>
              <CustomTableCell align="center">Location</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableDetail data={data} />
          </TableBody>
        </Table>
        <Typography component="span" variant="body1" gutterBottom>
          This test app has two routes: they were created with React Router 4.
          Other libraries/technologies used were:
          <ul>
            <li>React Material UI</li>
            <ul>
              <li>
                Many Components (such as "Table", "List", "Icons", "Button"),
                Subcomponents (such as "ListItem","Collapse", "ExpandLess",
                "ExpandMore"), etc{" "}
              </li>
              <li>Custom Styling</li>
            </ul>
            <li>React Map GL (Mapbox)</li>
            <li>Redux</li>
            <ul>
              <li>Redux Saga</li>
              <li>Redux Selectors</li>
            </ul>
          </ul>
        </Typography>
      </Paper>
    );
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    fetching: state.reducerUsers.fetching,
    data: state.reducerUsers.data,
    error: state.reducerUsers.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestUsersData: () => dispatch({ type: "API_CALL_USERS_REQUEST" }),
    onRequestAlbumsData: () => dispatch({ type: "API_CALL_ALBUMS_REQUEST" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyTable));
