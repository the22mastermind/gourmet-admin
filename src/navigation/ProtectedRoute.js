import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth?.authenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: {
          from: props.location,
        },
      }}
      />
    ))}
  />
);

export default ProtectedRoute;
