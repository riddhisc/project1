import React, { createContext, useState, useEffect } from 'react';
import { fetchEvents, fetchUpcomingEvents } from '../services/eventService';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        // Fetch all events
        const allEvents = await fetchEvents();
        setEvents(allEvents);
        
        // Fetch upcoming events
        const upcoming = await fetchUpcomingEvents();
        setUpcomingEvents(upcoming);
        
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);
  
  const refreshEvents = async () => {
    try {
      setLoading(true);
      const allEvents = await fetchEvents();
      setEvents(allEvents);
      
      const upcoming = await fetchUpcomingEvents();
      setUpcomingEvents(upcoming);
      
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to refresh events');
    } finally {
      setLoading(false);
    }
  };
  
  const addEvent = (event) => {
    setEvents([...events, event]);
    if (new Date(event.date) >= new Date()) {
      setUpcomingEvents([...upcomingEvents, event]);
    }
  };
  
  const updateEventInState = (updatedEvent) => {
    setEvents(events.map(event => 
      event._id === updatedEvent._id ? updatedEvent : event
    ));
    
    setUpcomingEvents(upcomingEvents.map(event => 
      event._id === updatedEvent._id ? updatedEvent : event
    ));
  };
  
  const removeEvent = (eventId) => {
    setEvents(events.filter(event => event._id !== eventId));
    setUpcomingEvents(upcomingEvents.filter(event => event._id !== eventId));
  };

  const value = {
    events,
    upcomingEvents,
    loading,
    error,
    refreshEvents,
    addEvent,
    updateEvent: updateEventInState,
    removeEvent
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};