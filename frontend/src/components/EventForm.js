import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    date: initialValues.date || '',
    time: initialValues.time || '',
    location: initialValues.location || '',
    category: initialValues.category || 'Conference',
    capacity: initialValues.capacity || '',
    image: initialValues.image || 'https://via.placeholder.com/400x200?text=Event',
  });

  const [errors, setErrors] = useState({});

  const categories = ['Conference', 'Workshop', 'Seminar', 'Sports', 'Expo'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.capacity || formData.capacity < 1) newErrors.capacity = 'Capacity must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="event-form-container">
      <h2 className="form-title">Create New Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Event Title *</label>
          <input
            type="text"
            className="form-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Annual Tech Conference 2026"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            className="form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the event"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              className="form-input"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Time *</label>
            <input
              type="time"
              className="form-input"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <span className="error">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location *</label>
          <input
            type="text"
            className="form-input"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Convention Center, Hall A"
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Capacity *</label>
            <input
              type="number"
              className="form-input"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="e.g., 500"
              min="1"
            />
            {errors.capacity && <span className="error">{errors.capacity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-input"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            Create Event
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
