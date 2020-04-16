import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// unconnected component
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
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

export default connect(mapStateToProps)(PrivateRoute);


