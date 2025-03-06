import React, { useEffect, useState } from "react";
import axios from "axios";

const Networking = () => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get("/api/networking");
        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    fetchAttendees();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Networking</h2>
      <p className="text-gray-600 mb-2">Connect with event attendees:</p>
      <ul>
        {attendees.map((person) => (
          <li key={person.id} className="border-b p-2">
            <strong>{person.name}</strong> - {person.role}
            <p className="text-gray-500">{person.company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Networking;
