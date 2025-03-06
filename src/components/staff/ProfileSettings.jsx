import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/staff/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/staff/profile", profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Profile Settings</h2>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        name="role"
        value={profile.role}
        onChange={handleChange}
        placeholder="Role"
        className="border p-2 rounded w-full mb-2"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
