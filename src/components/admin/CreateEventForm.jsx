import React, { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '../../services/eventService';

const CreateEventForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    capacity: '',
    type: 'in-person'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      // Format the date for the input field
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toISOString().split('T')[0];
      
      setFormData({
        ...event,
        date: formattedDate,
        startTime: event.startTime || '',
        endTime: event.endTime || ''
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Combine date and time
      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity, 10) || 0
      };

      let savedEvent;
      if (event) {
        savedEvent = await updateEvent(event._id, eventData);
      } else {
        savedEvent = await createEvent(eventData);
      }
      
      onSave(savedEvent);
    } catch (err) {
      setError(err.message || 'Failed to save event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-form">
      <h2>{event ? 'Edit Event' : 'Create New Event'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Event Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="in-person">In-Person</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="save-button">
            {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;