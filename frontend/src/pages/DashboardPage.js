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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEventsCount = events.filter((event) => {
    const eventDate = new Date(event.date);
    return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
  }).length;

  const bookmarkedCount = events.filter((event) => isBookmarked(event.id)).length;

  const selectedCategoryCount =
    filterCategory === 'All'
      ? events.length
      : events.filter((event) => event.category === filterCategory).length;

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const isCollegeRole = user?.role === 'college';
  const isAdminRole = user?.role === 'admin';

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.email}! 👋</h1>
            <p>
              {isAdminRole
                ? '🛡️ Admin Dashboard · Verify and moderate college submissions'
                : isCollegeRole
                ? '🏫 College Dashboard · Publish and manage verified academic opportunities'
                : '👨‍🎓 Student Dashboard · Track opportunities before deadlines'}
            </p>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Total Events</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{upcomingEventsCount}</span>
              <span className="stat-label">Upcoming</span>
            </div>
            {!isCollegeRole && !isAdminRole ? (
              <div className="stat-card">
                <span className="stat-number">{bookmarkedCount}</span>
                <span className="stat-label">Bookmarked</span>
              </div>
            ) : (
              <div className="stat-card">
                <span className="stat-number">{selectedCategoryCount}</span>
                <span className="stat-label">In Category</span>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-summary-strip">
          <div className="summary-item">
            <span className="summary-label">Active Filter</span>
            <span className="summary-value">{filterCategory}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Showing Results</span>
            <span className="summary-value">{filteredEvents.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Search Query</span>
            <span className="summary-value">{searchTerm || 'All events'}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="filters-section">
            <div className="section-title-row">
              <h2>Explore Academic Opportunities</h2>
              <p>Use search and category filters to focus on the right events.</p>
            </div>

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
              <>
                <div className="events-header-row">
                  <h3>Available Events</h3>
                  <span>{filteredEvents.length} found</span>
                </div>

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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
