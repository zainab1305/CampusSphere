import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import { mockCredentials } from '../data/mockData';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      setError(result.message);
    }
  };

  const fillStudentCredentials = () => {
    setEmail(mockCredentials.student.email);
    setPassword(mockCredentials.student.password);
    setError('');
  };

  const fillCollegeCredentials = () => {
    setEmail(mockCredentials.college.email);
    setPassword(mockCredentials.college.password);
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">🎓 CampusSphere</h1>
          <p className="auth-subtitle">Academic Event Management Platform</p>
        </div>

        <div className="auth-form-container">
          <h2>Welcome Back</h2>
          <p className="auth-description">Sign in to your account to continue</p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-label">📌 Demo Credentials (for testing):</p>
            <div className="credentials-row">
              <button type="button" className="btn btn-secondary btn-small" onClick={fillStudentCredentials}>
                👨‍🎓 Student Demo
              </button>
              <button type="button" className="btn btn-secondary btn-small" onClick={fillCollegeCredentials}>
                🏫 College Demo
              </button>
            </div>
            <p className="demo-info">Password: password123</p>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
