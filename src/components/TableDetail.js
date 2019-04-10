import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const StyledButton = withStyles({
  root: {
    background: "lightgray",
    borderRadius: 3,
    border: 0
  },
  label: {
    textTransform: "none"
  }
})(Button);

class TableDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onRequestUsersData();
    this.props.onRequestAlbumsData();
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { data, classes } = this.props;

    return data ? (
      data.data.map(row => (
        <TableRow key={row.id} className={classes.row}>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.username}</TableCell>
          <TableCell align="left">{row.email}</TableCell>
          <TableCell align="left">{row.phone}</TableCell>
          <TableCell align="left">
            <StyledButton>
              <Link to={"/map/" + JSON.stringify(row)}>Location</Link>
            </StyledButton>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow key="1">
        <TableCell align="right">"No Data"</TableCell>
      </TableRow>
    );
  }
}

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
)(withStyles(styles)(TableDetail));
