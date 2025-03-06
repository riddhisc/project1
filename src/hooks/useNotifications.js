import { useState, useEffect } from 'react';

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    message: 'Welcome to EventBuddy!',
    type: 'welcome',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    message: 'Your event "Tech Conference" is approaching',
    type: 'event_reminder',
    read: false,
    createdAt: new Date().toISOString()
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.length);

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const createNotification = (notificationData) => {
    const newNotification = {
      ...notificationData,
      id: notifications.length + 1,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, newNotification]);
    return newNotification;
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    createNotification,
    markNotificationAsRead,
    clearNotifications
  };
};