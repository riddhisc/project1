import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const FeedbackReport = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("/api/feedback"); // Adjust API endpoint
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Feedback Report</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={feedbackData}>
          <XAxis dataKey="eventName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackReport;
