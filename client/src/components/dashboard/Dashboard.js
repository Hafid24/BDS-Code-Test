import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser, deleteUser } from "../../actions/auth";

const Dashboard = ({ loadUser, auth: { user }, deleteUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return <div></div>;
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser, deleteUser })(Dashboard);
