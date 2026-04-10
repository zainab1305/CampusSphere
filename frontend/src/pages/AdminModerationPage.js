import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import './AdminModerationPage.css';

const AdminModerationPage = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeEventId, setActiveEventId] = useState('');

  const loadPendingEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await apiClient.get('/admin/events/pending');
      setPendingEvents(data);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Failed to load pending events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingEvents();
  }, []);

  const moderateEvent = async (eventId, status) => {
    try {
      setActiveEventId(eventId);
      await apiClient.patch(`/admin/events/${eventId}/status`, {
        status,
        moderationNote: status === 'approved' ? 'Approved by admin' : 'Rejected by admin',
      });

      setPendingEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Moderation action failed');
    } finally {
      setActiveEventId('');
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Moderation Panel</h1>
          <p>Review college submissions before they become visible to students.</p>
          <span className="pending-count">{pendingEvents.length} pending</span>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="admin-empty-state">Loading pending events...</div>
        ) : pendingEvents.length === 0 ? (
          <div className="admin-empty-state">All clear. There are no pending events right now.</div>
        ) : (
          <div className="moderation-grid">
            {pendingEvents.map((event) => (
              <div key={event._id} className="moderation-card">
                <img src={event.image} alt={event.title} className="moderation-image" />
                <div className="moderation-body">
                  <h3>{event.title}</h3>
                  <p className="moderation-meta">By: {event.createdBy?.email || 'Unknown college'}</p>
                  <p className="moderation-description">{event.description}</p>
                  <p className="moderation-meta">
                    {new Date(event.date).toLocaleDateString()} · {event.time} · {event.location}
                  </p>

                  <div className="moderation-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => moderateEvent(event._id, 'approved')}
                      disabled={activeEventId === event._id}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => moderateEvent(event._id, 'rejected')}
                      disabled={activeEventId === event._id}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModerationPage;