import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import PasswordReset from './pages/auth/PasswordReset';
import AdminDashboard from './pages/admin/Dashboard';
import EventManagement from './pages/admin/EventManagement';
import StaffDirectory from './pages/admin/StaffDirectory';
import Reports from './pages/admin/Reports';
import StaffDashboard from './pages/staff/Dashboard';
import EventDetails from './pages/staff/EventDetails';
import MyEvents from './pages/staff/MyEvents';
import Networking from './pages/staff/Networking';
import NotFound from './pages/NotFound';
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<PasswordReset />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/events" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <EventManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/staff" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <StaffDirectory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reports" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              
              {/* Staff Routes */}
              <Route 
                path="/staff/dashboard" 
                element={
                  <ProtectedRoute allowedRole="staff">
                    <StaffDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/staff/events/:id" 
                element={
                  <ProtectedRoute allowedRole="staff">
                    <EventDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/staff/my-events" 
                element={
                  <ProtectedRoute allowedRole="staff">
                    <MyEvents />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/staff/networking" 
                element={
                  <ProtectedRoute allowedRole="staff">
                    <Networking />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationProvider>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;