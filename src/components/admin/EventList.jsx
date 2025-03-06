import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="border-b p-2">
            <strong>{event.name}</strong> - {event.date} at {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
