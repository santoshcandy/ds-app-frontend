import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../Config";

const SetTarget = () => {
  const [target_clients, setTarget] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("No access token found. Please login again.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/targets/`,
        { target_clients },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Target set successfully!");
      setTarget("");
    } catch (error) {
      setMessage("Failed to set target_clients. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full sm:w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Your Target</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={target_clients}
            onChange={(e) => setTarget(e.target_clients.value)}
            placeholder="Enter target_clients"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-lg text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default SetTarget;
