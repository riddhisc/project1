import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NotFound = () => {
  const { currentUser } = useAuth();
  
  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    return currentUser.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard';
  };
  
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <Link to={getDashboardLink()} className="return-link">
          Return to {currentUser ? 'Dashboard' : 'Login'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;