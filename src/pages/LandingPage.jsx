import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LandingPage = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">
          <img src="/logo.svg" alt="EventBuddy Logo" />
          <h1>EventBuddy</h1>
        </div>
        
        <nav className="landing-nav">
          {currentUser ? (
            <Link to={currentUser.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'} className="nav-button">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/login" className="nav-button">Login</Link>
          )}
        </nav>
      </header>
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Streamline Your Office Events</h1>
          <p>Manage events, track participation, and connect with colleagues - all in one place.</p>
          
          {!currentUser && (
            <Link to="/login" className="cta-button">
              Get Started
            </Link>
          )}
        </div>
        
        <div className="hero-image">
          <img src="/hero-image.png" alt="EventBuddy Overview" />
        </div>
      </section>
      
      <section className="features-section">
        <h2>Why Choose EventBuddy?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Event Management</h3>
            <p>Create, organize, and track office events with ease.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Get insights on participation and engagement metrics.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Networking Tools</h3>
            <p>Connect with colleagues who share similar interests.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Real-time Notifications</h3>
            <p>Stay updated with event reminders and changes.</p>
          </div>
        </div>
      </section>
      
      <footer className="landing-footer">
        <p>&copy; 2025 EventBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;