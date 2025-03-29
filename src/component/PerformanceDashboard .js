import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/style.css"; // Import the CSS file

const PerformanceDashboard = () => {
    const [performance, setPerformance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("accessToken"); // JWT token stored in localStorage

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/manage/targets/my-performance/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPerformance(response.data);
            } catch (err) {
                setError(err.response?.data?.detail || "Failed to fetch performance data");
            } finally {
                setLoading(false);
            }
        };

        fetchPerformance();
    }, []);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!performance) return <p className="loading">No data available</p>;

    const { employee, attendance_last_10_days, current_month } = performance;

    return (
        <div className="dashboard-container">
            {/* Personal Information */}
            <div className="card">
                <h2>Personal Details</h2>
                <div className="scroll-container">
                    <p><strong>Name:</strong> {employee.username}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone:</strong> {employee.phone_number}</p>
                    <p><strong>DOB:</strong> {employee.dob}</p>
                    <p><strong>Role:</strong> {employee.role}</p>
                </div>
            </div>

            {/* Attendance History */}
            <div className="card">
                <h2>Attendance (Last 10 Days)</h2>
                <div className="scroll-container">
                    {attendance_last_10_days.map((entry, index) => (
                        <span key={index} className={`status ${entry.status === "Present" ? "present" : "absent"}`}>
                            {entry.status}
                        </span>
                    ))}
                </div>
            </div>

            {/* Target Completion */}
            <div className="card mb-5">
                <h2>Target Completion</h2>
                <div className="scroll-container">
                    <p><strong>Month:</strong> {current_month.month}/{current_month.year}</p>
                    <p><strong>Target Clients:</strong> {current_month.target_clients}</p>
                    <p><strong>Approved Clients:</strong> {current_month.approved_clients}</p>
                    <p className={`completion ${parseFloat(current_month.completion) > 50 ? "high" : "low"}`}>
                        Completion: {current_month.completion}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PerformanceDashboard;
