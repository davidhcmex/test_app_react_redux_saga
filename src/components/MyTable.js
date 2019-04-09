import React, { Component } from "react";
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
  render() {
    const { classes } = this.state.props;

    return (
      <Paper className={classes.root}>
        <Typography component="h3" variant="h4" gutterBottom>
          Persons
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.head}>
              <CustomTableCell align="right">Name</CustomTableCell>
              <CustomTableCell align="right">Username</CustomTableCell>
              <CustomTableCell align="right">email</CustomTableCell>
              <CustomTableCell align="right">Phone</CustomTableCell>
              <CustomTableCell align="right">Location</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableDetail />
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyTable);
