import React, { useEffect, useState } from "react";
import axios from "axios";

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("/api/participants");
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Event Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id} className="border-b p-2">
            {participant.name} ({participant.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
