import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🎓 CampusSphere
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          {user?.role === 'college' && (
            <Link to="/create-event" className="navbar-link">
              Create Event
            </Link>
          )}
          {user?.role === 'student' && (
            <Link to="/bookmarks" className="navbar-link">
              My Bookmarks
            </Link>
          )}
        </div>

        <div className="navbar-user">
          <span className="navbar-email">{user?.email}</span>
          <span className="navbar-role">
            {user?.role === 'college' ? '🏫 College' : '👨‍🎓 Student'}
          </span>
          <button className="btn btn-danger btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
