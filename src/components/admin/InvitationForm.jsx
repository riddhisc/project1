import React, { useState } from "react";
import axios from "axios";

const InvitationForm = () => {
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState("");

  const handleSendInvitation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/invitations", { email, eventId });
      alert("Invitation sent successfully!");
      setEmail("");
      setEventId("");
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Send Event Invitation</h2>
      <form onSubmit={handleSendInvitation} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter staff email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Enter Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send Invitation
        </button>
      </form>
    </div>
  );
};

export default InvitationForm;
