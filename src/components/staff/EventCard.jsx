import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/formatters';
import { rsvpToEvent } from '../../services/eventService';

const EventCard = ({ event }) => {
  const [rsvpStatus, setRsvpStatus] = React.useState(event.rsvpStatus || 'none');
  const [loading, setLoading] = React.useState(false);

  const handleRSVP = async (status) => {
    setLoading(true);
    try {
      await rsvpToEvent(event._id, status);
      setRsvpStatus(status);
    } catch (error) {
      console.error('RSVP failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const isUpcoming = new Date(event.date) > new Date();

  return (
    <div className={`event-card ${isUpcoming ? '' : 'past-event'}`}>
      <div className="event-date">
        {formatDate(event.date)}
      </div>
      
      <h3 className="event-title">{event.name}</h3>
      
      <div className="event-details">
        <div className="event-time">
          <span className="icon">⏰</span> 
          {formatTime(event.startTime)} - {formatTime(event.endTime)}
        </div>
        
        <div className="event-location">
          <span className="icon">📍</span> {event.location}
        </div>
        <div className="event-type">
          <span className="icon">
            {event.type === 'in-person' ? '🏢' : event.type === 'virtual' ? '💻' : '🔄'}
          </span> 
          {event.type === 'in-person' ? 'In-Person' : event.type === 'virtual' ? 'Virtual' : 'Hybrid'}
        </div>
      </div>
      
      <p className="event-description">{event.description}</p>
      
      {isUpcoming && (
        <div className="event-actions">
          <div className="rsvp-buttons">
            <button 
              className={`rsvp-button attending ${rsvpStatus === 'attending' ? 'active' : ''}`}
              onClick={() => handleRSVP('attending')}
              disabled={loading}
            >
              Going
            </button>
            <button 
              className={`rsvp-button maybe ${rsvpStatus === 'maybe' ? 'active' : ''}`}
              onClick={() => handleRSVP('maybe')}
              disabled={loading}
            >
              Maybe
            </button>
            <button 
              className={`rsvp-button declined ${rsvpStatus === 'declined' ? 'active' : ''}`}
              onClick={() => handleRSVP('declined')}
              disabled={loading}
            >
              Can't Go
            </button>
          </div>
          
          <Link to={`/staff/events/${event._id}`} className="view-details-link">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventCard;