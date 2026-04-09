import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import { useEvents } from '../hooks/useContext';
import EventCard from '../components/EventCard';
import './BookmarkedEventsPage.css';

const BookmarkedEventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBookmarkedEvents, toggleBookmark, isBookmarked } = useEvents();

  // Restrict access to student role only
  if (user?.role !== 'student') {
    return (
      <div className="bookmarks-page">
        <div className="container">
          <div className="access-denied">
            <p className="denied-icon">🚫</p>
            <p className="denied-message">Access Denied</p>
            <p className="denied-text">Only students can view bookmarks</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const bookmarkedEvents = getBookmarkedEvents();

  return (
    <div className="bookmarks-page">
      <div className="container">
        <div className="bookmarks-header">
          <button className="btn btn-secondary btn-small" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>⭐ My Bookmarks</h1>
          <p className="bookmarks-count">{bookmarkedEvents.length} events saved</p>
        </div>

        {bookmarkedEvents.length === 0 ? (
          <div className="no-bookmarks">
            <p className="no-bookmarks-icon">📚</p>
            <p className="no-bookmarks-message">No Bookmarks Yet</p>
            <p className="no-bookmarks-hint">Bookmark events from the dashboard to save them for later</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Browse Events
            </button>
          </div>
        ) : (
          <div className="bookmarks-grid">
            {bookmarkedEvents.map((event) => (
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
  );
};

export default BookmarkedEventsPage;
