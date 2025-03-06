import eventsData from '../mock/events.json';

export const fetchEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return eventsData.events;
};

export const fetchUpcomingEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return eventsData.events.filter(event => 
    new Date(event.date) > new Date() && event.status === 'upcoming'
  );
};

export const fetchEvent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return eventsData.events.find(event => event.id === id);
};

export const createEvent = async (eventData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newEvent = {
    ...eventData,
    id: eventsData.events.length + 1,
    status: 'upcoming',
    registeredParticipants: 0
  };
  eventsData.events.push(newEvent);
  return newEvent;
};

export const updateEvent = async (id, eventData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = eventsData.events.findIndex(event => event.id === id);
  if (index !== -1) {
    eventsData.events[index] = { ...eventsData.events[index], ...eventData };
    return eventsData.events[index];
  }
  throw new Error('Event not found');
};

export const deleteEvent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = eventsData.events.findIndex(event => event.id === id);
  if (index !== -1) {
    eventsData.events.splice(index, 1);
    return true;
  }
  throw new Error('Event not found');
};

export const fetchAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    totalEvents: eventsData.events.length,
    upcomingEvents: eventsData.events.filter(event => 
      new Date(event.date) > new Date() && event.status === 'upcoming'
    ).length,
    pastEvents: eventsData.events.filter(event => 
      new Date(event.date) <= new Date()
    ).length
  };
};

export const rsvpToEvent = async (eventId, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const event = eventsData.events.find(e => e.id === eventId);
  if (event) {
    if (status === 'confirmed') {
      event.registeredParticipants = (event.registeredParticipants || 0) + 1;
    }
    return event;
  }
  throw new Error('Event not found');
};

export const fetchParticipants = async (eventId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const event = eventsData.events.find(e => e.id === eventId);
  // In a real app, this would fetch actual participants
  return event ? [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ] : [];
};