import React, { useState, useEffect } from "react";
import "../style/style.css"; // Import the CSS file
import { API_URL } from "../Config";

const AttendanceForm = () => {
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("accessToken"); // Assuming JWT is stored in localStorage

    // Get today's date in "YYYY-MM-DD" format
    const todayDate = new Date().toISOString().split("T")[0];

    // Fetch Attendance Data
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch(`${API_URL}/attendance/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.detail || "Failed to fetch attendance");

                // Find today's attendance record
                const todayAttendance = data.find((entry) => entry.date === todayDate);

                setAttendance(todayAttendance || null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    // Mark Attendance
    const markAttendance = async () => {
        try {
            const response = await fetch(`${API_URL}/attendance/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Present" }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.status || "Failed to mark attendance");

            // Update UI after marking attendance
            setAttendance({ date: todayDate, status: "Present" });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col items-center p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Today's Attendance</h2>

            {attendance ? (
                <p className={`text-lg font-semibold ${attendance.status === "Present" ? "text-green-500" : "text-red-500"}`}>
                    Status: {attendance.status}
                </p>
            ) : (
                <p className="text-gray-600">Not marked yet</p>
            )}

            {!attendance && (
                <button
                    onClick={markAttendance}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                >
                    Mark Present
                </button>
            )}
        </div>
    );
};

export default AttendanceForm;
