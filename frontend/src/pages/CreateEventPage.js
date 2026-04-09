import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContext';
import { useEvents } from '../hooks/useContext';
import EventForm from '../components/EventForm';
import './CreateEventPage.css';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createEvent } = useEvents();

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

  const handleFormSubmit = (eventData) => {
    const result = createEvent({
      ...eventData,
      registered: 0,
    });

    if (result.success) {
      alert('Event created successfully! 🎉');
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="create-event-page">
      <div className="container">
        <EventForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default CreateEventPage;
