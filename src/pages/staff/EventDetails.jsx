import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.description}</p>
      <p className="mt-2">
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
    </div>
  );
};

export default EventDetails;
