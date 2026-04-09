import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import { useEvents } from '../hooks/useContext';
import './EventDetailPage.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEventById, toggleBookmark, isBookmarked } = useEvents();

  const event = getEventById(id);

  if (!event) {
    return (
      <div className="event-detail-page">
        <div className="container">
          <div className="not-found">
            <p className="not-found-icon">❌</p>
            <p className="not-found-message">Event not found</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const availableSeats = event.capacity - event.registered;
  const registrationPercentage = (event.registered / event.capacity) * 100;
  const isCollegeRole = user?.role === 'college';
  const bookmarkedByUser = isBookmarked(event.id);

  return (
    <div className="event-detail-page">
      <div className="container">
        <button className="btn btn-secondary btn-small" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>

        <div className="event-detail-container">
          <div className="event-detail-image">
            <img src={event.image} alt={event.title} />
            <span className={`event-badge ${event.category.toLowerCase()}`}>{event.category}</span>
          </div>

          <div className="event-detail-content">
            <div className="event-detail-header">
              <h1>{event.title}</h1>
              <div className="event-detail-meta">
                <span className="meta-badge">📅 {event.date}</span>
                <span className="meta-badge">⏰ {event.time}</span>
                <span className="meta-badge">📍 {event.location}</span>
              </div>
            </div>

            <p className="event-detail-description">{event.description}</p>

            <div className="event-stats-grid">
              <div className="event-stat">
                <div className="stat-value">{event.capacity}</div>
                <div className="stat-label">Total Capacity</div>
              </div>
              <div className="event-stat">
                <div className="stat-value">{event.registered}</div>
                <div className="stat-label">Registered</div>
              </div>
              <div className="event-stat">
                <div className="stat-value">{availableSeats}</div>
                <div className="stat-label">Available Seats</div>
              </div>
              <div className="event-stat">
                <div className="stat-value">{registrationPercentage.toFixed(0)}%</div>
                <div className="stat-label">Filled</div>
              </div>
            </div>

            <div className="registration-bar-container">
              <div className="registration-bar">
                <div className="registration-fill" style={{ width: `${registrationPercentage}%` }}></div>
              </div>
              <p className="registration-text">
                {availableSeats <= 0 ? '❌ Event is full' : `✅ ${availableSeats} seats remaining`}
              </p>
            </div>

            <div className="event-actions">
              {!isCollegeRole && (
                <button
                  className={`btn ${bookmarkedByUser ? 'btn-danger' : 'btn-secondary'}`}
                  onClick={() => toggleBookmark(event.id)}
                >
                  {bookmarkedByUser ? '❌ Remove Bookmark' : '⭐ Add to Bookmarks'}
                </button>
              )}

              {availableSeats > 0 && (
                <button className="btn btn-success">Register for Event</button>
              )}

              {availableSeats <= 0 && <button className="btn btn-secondary" disabled>Event Full</button>}
            </div>

            {isCollegeRole && (
              <div className="college-actions">
                <p className="info-text">You are the event organizer</p>
                <button className="btn btn-secondary">Edit Event</button>
                <button className="btn btn-danger">Delete Event</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
