import React, { useState } from "react";

const StaffDirectory = () => {
  // Dummy staff data
  const [staff] = useState([
    { id: 1, name: "Alice Johnson", role: "Event Manager", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", role: "Coordinator", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", role: "Admin", email: "charlie@example.com" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Staff Directory</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id} className="text-center">
              <td className="border p-2">{member.id}</td>
              <td className="border p-2">{member.name}</td>
              <td className="border p-2">{member.role}</td>
              <td className="border p-2">{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDirectory;
