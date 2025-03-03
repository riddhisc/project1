import React from 'react';

const NetworkingMatch = ({ suggestion, onSelect, isSelected }) => {
  return (
    <div 
      className={`networking-match ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="match-avatar">
        {suggestion.profileImage ? (
          <img src={suggestion.profileImage} alt={suggestion.name} />
        ) : (
          <div className="avatar-placeholder">
            {suggestion.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="match-details">
        <h3 className="match-name">{suggestion.name}</h3>
        <p className="match-title">{suggestion.title}</p>
        <p className="match-department">{suggestion.department}</p>
        
        <div className="match-interests">
          <h4>Common Interests:</h4>
          <div className="interest-tags">
            {suggestion.commonInterests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        <div className="match-events">
          <h4>Events Attending:</h4>
          <div className="event-tags">
            {suggestion.commonEvents.map((event, index) => (
              <span key={index} className="event-tag">
                {event}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <button className="connect-button">
        Connect
      </button>
    </div>
  );
};

export default NetworkingMatch;