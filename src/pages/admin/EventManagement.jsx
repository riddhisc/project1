import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../../services/eventService';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import EventList from '../../components/admin/EventList';
import CreateEventForm from '../../components/admin/CreateEventForm';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleCreateEvent = () => {
    setEditEvent(null);
    setShowCreateModal(true);
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditEvent(null);
  };

  const handleEventSaved = (savedEvent) => {
    if (editEvent) {
      // Update existing event
      setEvents(events.map(e => e._id === savedEvent._id ? savedEvent : e));
    } else {
      // Add new event
      setEvents([...events, savedEvent]);
    }
    handleCloseModal();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event._id !== eventId));
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar type="admin" />
        <main className="content">
          <div className="page-header">
            <h1>Event Management</h1>
            <button 
              className="create-button"
              onClick={handleCreateEvent}
            >
              Create New Event
            </button>
          </div>
          
          {error ? (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          ) : (
            <EventList 
              events={events} 
              onEdit={handleEditEvent} 
              onDelete={handleDeleteEvent} 
            />
          )}
          
          <Modal isOpen={showCreateModal} onClose={handleCloseModal}>
            <CreateEventForm 
              event={editEvent} 
              onSave={handleEventSaved}
              onCancel={handleCloseModal}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default EventManagement;