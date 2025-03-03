import React, { createContext, useState, useEffect } from 'react';
import { fetchNotifications, markAsRead, markAllAsRead } from '../services/notificationService';
import { listenForNotifications } from '../services/socketService';
import { useAuth } from '../hooks/useAuth';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    
    const loadNotifications = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
        setUnreadCount(data.filter(notification => !notification.read).length);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
    
    // Set up real-time notifications
    const socket = listenForNotifications((notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });
    
    return () => {
      if (socket) {
        socket.off('notification');
      }
    };
  }, [currentUser]);
  
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      
      setNotifications(notifications.map(notification => 
        notification._id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError(err.message || 'Failed to mark notification as read');
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      
      setNotifications(notifications.map(notification => 
        ({ ...notification, read: true })
      ));
      
      setUnreadCount(0);
    } catch (err) {
      setError(err.message || 'Failed to mark all notifications as read');
    }
  };

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};