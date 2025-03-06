import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="border-b p-2">
              {notification.message} - <span className="text-gray-500">{notification.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;
