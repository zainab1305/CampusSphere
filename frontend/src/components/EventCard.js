import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import './EventCard.css';

const EventCard = ({ event, onBookmarkToggle, isBookmarked = false }) => {
  const { user } = useAuth();
  const availableSeats = event.capacity - event.registered;
  const isCollegeRole = user?.role === 'college';
  const fallbackImage =
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80';
  const imageSrc = event.image?.trim() ? event.image : fallbackImage;

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={imageSrc} alt={event.title} onError={(e) => { e.currentTarget.src = fallbackImage; }} />
        <span className={`event-badge ${event.category.toLowerCase()}`}>{event.category}</span>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description.substring(0, 100)}...</p>

        <div className="event-meta">
          <div className="meta-item">
            <span className="meta-label">📅 Date:</span>
            <span className="meta-value">{event.date}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">⏰ Time:</span>
            <span className="meta-value">{event.time}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">📍 Location:</span>
            <span className="meta-value">{event.location}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">👥 Registered:</span>
            <span className="meta-value">
              {event.registered} / {event.capacity}
            </span>
          </div>
        </div>

        <div className="event-seats">
          <div className={`seats-indicator ${availableSeats <= 10 ? 'low' : 'available'}`}>
            {availableSeats <= 0 ? '❌ Full' : `✅ ${availableSeats} seats left`}
          </div>
        </div>

        <div className="event-actions">
          <Link to={`/event/${event.id}`} className="btn btn-primary btn-small">
            View Details
          </Link>

          {!isCollegeRole && (
            <button
              className={`btn ${isBookmarked ? 'btn-danger' : 'btn-secondary'} btn-small bookmark-btn`}
              onClick={() => onBookmarkToggle(event.id)}
            >
              {isBookmarked ? '❌ Remove' : '⭐ Bookmark'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
