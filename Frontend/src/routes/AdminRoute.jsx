import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    // Logged in but not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

