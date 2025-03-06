import React from "react";

const Reports = () => {
  // Dummy report data
  const reports = [
    { id: 1, name: "Event Participation", date: "2025-03-05", status: "Completed" },
    { id: 2, name: "Feedback Analysis", date: "2025-03-04", status: "Pending" },
    { id: 3, name: "Staff Performance", date: "2025-03-02", status: "Completed" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Reports</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Report Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="text-center">
              <td className="border p-2">{report.id}</td>
              <td className="border p-2">{report.name}</td>
              <td className="border p-2">{report.date}</td>
              <td className="border p-2">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
