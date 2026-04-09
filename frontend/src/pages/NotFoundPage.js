import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigate = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <p className="not-found-code">404</p>
        <p className="not-found-title">Page Not Found</p>
        <p className="not-found-description">Sorry, the page you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={handleNavigate}>
          {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
