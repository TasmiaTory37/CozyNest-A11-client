import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (user && user.email) {
    return children;
  }

  
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
