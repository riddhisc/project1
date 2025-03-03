import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRole && currentUser.role !== allowedRole) {
    return currentUser.role === 'admin' 
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/staff/dashboard" />;
  }
  
  return children;
};

export default ProtectedRoute;