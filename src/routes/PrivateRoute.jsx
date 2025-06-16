import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  
  if (loading) {
      return  <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-blue-600 text-4xl" />
              <span className="ml-2 text-xl text-blue-500">Loading...</span>
            </div>
  }

  
  if (user && user.email) {
    return children;
  }

  
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
