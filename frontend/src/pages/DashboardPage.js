import React, { useState } from 'react';
import { useAuth } from '../hooks/useContext';
import { useEvents } from '../hooks/useContext';
import EventCard from '../components/EventCard';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const { events, toggleBookmark, isBookmarked } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Conference', 'Workshop', 'Seminar', 'Sports', 'Expo'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const isCollegeRole = user?.role === 'college';

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.email}! 👋</h1>
            <p>{isCollegeRole ? '🏫 College Account' : '👨‍🎓 Student Account'}</p>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Total Events</span>
            </div>
            {!isCollegeRole && (
              <div className="stat-card">
                <span className="stat-number">{events.filter((e) => isBookmarked(e.id)).length}</span>
                <span className="stat-label">Bookmarked</span>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-content">
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="events-section">
            {filteredEvents.length === 0 ? (
              <div className="no-events">
                <p className="no-events-icon">📭</p>
                <p className="no-events-message">No events found</p>
                <p className="no-events-hint">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onBookmarkToggle={toggleBookmark}
                    isBookmarked={isBookmarked(event.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
