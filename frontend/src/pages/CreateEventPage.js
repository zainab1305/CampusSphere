import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import { useEvents } from '../hooks/useContext';
import EventForm from '../components/EventForm';
import './CreateEventPage.css';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { createEvent, updateEvent } = useEvents();
  const editingEvent = location.state?.event || null;

  // Restrict access to college role only
  if (user?.role !== 'college') {
    return (
      <div className="create-event-page">
        <div className="container">
          <div className="access-denied">
            <p className="denied-icon">🚫</p>
            <p className="denied-message">Access Denied</p>
            <p className="denied-text">Only college administrators can create events</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (eventData) => {
    const payload = {
      ...eventData,
      registered: editingEvent?.registered || 0,
    };

    const result = editingEvent
      ? await updateEvent(editingEvent.id, payload)
      : await createEvent(payload);

    if (result.success) {
      alert(editingEvent ? 'Event updated successfully! 🎉' : 'Event created successfully! 🎉');
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="create-event-page">
      <div className="container">
        <EventForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          initialValues={editingEvent || {}}
          title={editingEvent ? 'Edit Event' : 'Create New Event'}
          submitLabel={editingEvent ? 'Update Event' : 'Create Event'}
        />
      </div>
    </div>
  );
};

export default CreateEventPage;
