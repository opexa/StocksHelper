import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import accountActions from '../../actions/accountActions';

const Logout = ({ logout }) => {
  logout();

  return <Redirect to='/' />
}

export default connect(
  null,
  dispatch => bindActionCreators({
    logout: accountActions.logout
  }, dispatch)
)(Logout);