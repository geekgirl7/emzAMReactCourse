import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// unconnected component
export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    )} />
);

// connected component
// Remember: flipping values twice results in a Boolean value  
//  See previous notes for this course
//  If you don't, the state.auth.uid with be *undefined* if *unauthenticated*
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid  // Boolean true if authenticated, Boolean false otherwise
});

export default connect(mapStateToProps)(PublicRoute);


