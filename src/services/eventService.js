import api from './api';

export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const fetchUpcomingEvents = async () => {
  const response = await api.get('/events/upcoming');
  return response.data;
};

export const fetchEvent = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export const rsvpToEvent = async (eventId, status) => {
  const response = await api.post(`/events/${eventId}/rsvp`, { status });
  return response.data;
};

export const fetchParticipants = async (eventId) => {
  const response = await api.get(`/events/${eventId}/participants`);
  return response.data;
};

export const fetchAnalytics = async () => {
  const response = await api.get('/events/analytics');
  return response.data;
};

export const fetchNetworkingSuggestions = async () => {
  const response = await api.get('/networking/suggestions');
  return response.data;
};