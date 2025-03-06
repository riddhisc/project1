import { useState, useEffect } from 'react';

// Mock events data
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Annual Tech Conference',
    description: 'Largest technology conference of the year',
    date: '2024-09-15',
    time: '09:00 AM',
    location: 'San Francisco Convention Center',
    capacity: 500,
    registeredParticipants: 250,
    status: 'upcoming',
    organizer: 2,
    tags: ['technology', 'networking', 'innovation']
  },
  {
    id: 2,
    title: 'Design Thinking Workshop',
    description: 'Intensive design thinking and innovation workshop',
    date: '2024-07-20',
    time: '10:00 AM',
    location: 'New York Creative Hub',
    capacity: 100,
    registeredParticipants: 75,
    status: 'upcoming',
    organizer: 2,
    tags: ['design', 'workshop', 'creativity']
  }
];

export const useEvents = () => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const upcoming = events.filter(event => 
      new Date(event.date) > new Date() && event.status === 'upcoming'
    );
    setUpcomingEvents(upcoming);
  }, [events]);

  const createEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      status: 'upcoming',
      registeredParticipants: 0
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    return newEvent;
  };

  const updateEvent = (id, eventData) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, ...eventData } : event
      )
    );
    return events.find(event => event.id === id);
  };

  const deleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const rsvpToEvent = (eventId, status) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            registeredParticipants: status === 'confirmed' 
              ? event.registeredParticipants + 1 
              : event.registeredParticipants
          };
        }
        return event;
      })
    );
  };

  return {
    events,
    upcomingEvents,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpToEvent
  };
};