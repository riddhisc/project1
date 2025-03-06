import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get("/api/myevents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">My Events</h2>
      {events.length === 0 ? (
        <p>You have no upcoming events.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="border-b p-2">
              <Link to={`/staff/event/${event.id}`} className="text-blue-500">
                {event.title}
              </Link>
              <p className="text-gray-500">{event.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
