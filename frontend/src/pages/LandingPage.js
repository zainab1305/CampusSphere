import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import './LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <header className="landing-topbar">
          <div className="landing-logo">CampusSphere</div>
          <nav className="landing-nav">
            <Link to="/login" className="btn btn-secondary btn-small">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-small">
              Sign Up
            </Link>
          </nav>
        </header>

        <main className="landing-content">
          <p className="landing-kicker">Campus Event Platform</p>
          <h1>Discover, Host, and Manage Events That Matter</h1>
          <p className="landing-description">
            CampusSphere helps students explore events and helps colleges publish, manage, and track attendance from one unified dashboard.
          </p>
          <div className="landing-actions">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              I Already Have an Account
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;