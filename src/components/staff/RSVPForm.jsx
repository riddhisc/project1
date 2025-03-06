import React, { useState } from "react";
import axios from "axios";

const RSVPForm = () => {
  const [eventId, setEventId] = useState("");
  const [status, setStatus] = useState("Going");

  const handleRSVP = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/rsvp", { eventId, status });
      alert("RSVP submitted successfully!");
      setEventId("");
      setStatus("Going");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">RSVP for Event</h2>
      <form onSubmit={handleRSVP} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Going">Going</option>
          <option value="Maybe">Maybe</option>
          <option value="Not Going">Not Going</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
