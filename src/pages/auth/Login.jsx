import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  const [activePanel, setActivePanel] = useState('staff');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/staff/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <img src="/logo.svg" alt="EventBuddy Logo" />
          <h1>EventBuddy</h1>
          <p>Office Event Tracker</p>
        </div>
        
        <div className="login-tabs">
          <button 
            className={activePanel === 'staff' ? 'active' : ''}
            onClick={() => setActivePanel('staff')}
          >
            Staff Login
          </button>
          <button 
            className={activePanel === 'admin' ? 'active' : ''}
            onClick={() => setActivePanel('admin')}
          >
            Admin Login
          </button>
        </div>
        
        <div className="login-panel">
          <LoginForm 
            role={activePanel} 
            onLoginSuccess={handleLoginSuccess}
            login={login}
          />
        </div>
        
        <div className="login-footer">
          <a href="/reset-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;