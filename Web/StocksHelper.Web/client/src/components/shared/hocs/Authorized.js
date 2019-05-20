import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../../services/AuthService';

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    authService.isAuthorized() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/account/login',
          state: { from: props.location }
        }} />
      )
  )
  } />
);