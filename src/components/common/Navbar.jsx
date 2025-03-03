import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.svg" alt="EventBuddy Logo" />
          <span>EventBuddy</span>
        </Link>
      </div>
      
      {currentUser && (
        <div className="navbar-actions">
          <div className="notification-icon">
            <Link to={currentUser.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'}>
              <span className="icon">🔔</span>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </Link>
          </div>
          
          <div className="user-profile">
            <button onClick={toggleDropdown} className="profile-button">
              {currentUser.profileImage ? (
                <img src={currentUser.profileImage} alt={currentUser.name} />
              ) : (
                <div className="profile-initials">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <span className="profile-name">{currentUser.name}</span>
            </button>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <p>{currentUser.name}</p>
                  <p className="user-role">{currentUser.role}</p>
                </div>
                
                <ul>
                  <li>
                    <Link to={currentUser.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;