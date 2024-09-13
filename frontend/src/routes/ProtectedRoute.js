import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === "null" || accessToken === null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
