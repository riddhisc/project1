import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../../services/eventService';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Analytics from '../../components/admin/Analytics';
import ParticipantList from '../../components/admin/ParticipantList';
import StaffEngagement from '../../components/admin/StaffEngagement';
import FeedbackReport from '../../components/admin/FeedbackReport';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="admin-layout">
        <Navbar />
        <div className="layout-container">
          <Sidebar type="admin" />
          <main className="dashboard-content">
            <div className="error-container">
              <h2>Error</h2>
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar type="admin" />
        <main className="dashboard-content">
          <h1>Admin Dashboard</h1>
          
          <div className="dashboard-summary">
            <div className="summary-card">
              <h3>Total Events</h3>
              <div className="summary-value">{analytics.totalEvents}</div>
            </div>
            <div className="summary-card">
              <h3>Upcoming Events</h3>
              <div className="summary-value">{analytics.upcomingEvents}</div>
            </div>
            <div className="summary-card">
              <h3>Total Staff</h3>
              <div className="summary-value">{analytics.totalStaff}</div>
            </div>
            <div className="summary-card">
              <h3>Average Participation</h3>
              <div className="summary-value">{analytics.avgParticipation}%</div>
            </div>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-section">
              <Analytics data={analytics.participationData} />
            </div>
            <div className="dashboard-section">
              <StaffEngagement data={analytics.engagementData} />
            </div>
            <div className="dashboard-section">
              <ParticipantList data={analytics.recentParticipants} />
            </div>
            <div className="dashboard-section">
              <FeedbackReport data={analytics.feedbackData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
