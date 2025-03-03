import React, { useEffect, useState } from 'react';
import { fetchUpcomingEvents } from '../../services/eventService';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import EventCard from '../../components/staff/EventCard';
import NotificationCenter from '../../components/staff/NotificationCenter';
import EventCalendar from '../../components/staff/EventCalendar';
import Loader from '../../components/common/Loader';

const StaffDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('cards'); // 'cards' or 'calendar'

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchUpcomingEvents();
        setUpcomingEvents(data);
      } catch (err) {
        setError('Failed to load upcoming events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="staff-layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar type="staff" />
        <main className="dashboard-content">
          <div className="page-header">
            <h1>Staff Dashboard</h1>
            <div className="view-toggles">
              <button 
                className={view === 'cards' ? 'active' : ''} 
                onClick={() => setView('cards')}
              >
                Card View
              </button>
              <button 
                className={view === 'calendar' ? 'active' : ''} 
                onClick={() => setView('calendar')}
              >
                Calendar View
              </button>
            </div>
          </div>
          
          <div className="dashboard-container">
            <div className="events-section">
              <h2>Upcoming Events</h2>
              
              {error ? (
                <div className="error-container">
                  <p>{error}</p>
                  <button onClick={() => window.location.reload()}>Retry</button>
                </div>
              ) : (
                view === 'cards' ? (
                  <div className="event-cards">
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map(event => (
                        <EventCard key={event._id} event={event} />
                      ))
                    ) : (
                      <p className="no-events">No upcoming events</p>
                    )}
                  </div>
                ) : (
                  <EventCalendar events={upcomingEvents} />
                )
              )}
            </div>
            
            <div className="notifications-section">
              <NotificationCenter />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;