import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const StaffEngagement = () => {
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    const fetchEngagementData = async () => {
      try {
        const response = await axios.get("/api/engagement");
        setEngagementData(response.data);
      } catch (error) {
        console.error("Error fetching engagement data:", error);
      }
    };

    fetchEngagementData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Staff Engagement Report</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={engagementData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="engagementScore" stroke="#4CAF50" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaffEngagement;
