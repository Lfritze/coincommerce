import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

// This checks if the user is authenticated for viewing the Dashboard
// It the user is authenticated we return the component, otherwise we redirect them to signin

const PrivateRoute = ({component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect 
          to={{
            pathname: './signin', 
          state: {from: props.location}
          }}
        />
      )
    } 
  />
);

export default PrivateRoute;
