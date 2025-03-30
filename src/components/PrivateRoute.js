import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={
        authState ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" /> // Redirect using Navigate in React Router v6
        )
      }
    />
  );
};

export default PrivateRoute;
