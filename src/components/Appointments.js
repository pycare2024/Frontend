import React, { useState, useEffect } from "react";
import "./Appointment.css";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);

    const doctor_id = localStorage.getItem("doctor_id");

    useEffect(() => {
        if (doctor_id) {
            fetchAppointments();
        }
    }, [selectedDate, doctor_id]);

    const fetchAppointments = async () => {
        if (!doctor_id) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://backend-xhl4.onrender.com/AppointmentRoute/doctor-appointments?doctor_id=${doctor_id}${selectedDate ? `&date=${selectedDate}` : ""}`
            );
            const data = await response.json();
            setAppointments(data.appointments || []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    const startSession = async (appointmentId) => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/startSession/${appointmentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (response.ok) {
                fetchAppointments();
            } else {
                alert(data.message || "Failed to start session.");
            }
        } catch (error) {
            console.error("Error starting session:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const markCompleted = async (appointmentId) => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/markCompleted/${appointmentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {
                alert("Marked as completed");
                fetchAppointments();
            } else {
                alert(data.message || "Failed to mark as completed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    const markNoShow = async (appointmentId) => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/markNoShow/${appointmentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {
                alert("Marked as no-show");
                fetchAppointments();
            } else {
                alert(data.message || "Failed to mark as no-show");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="appointments-wrapper">
            <h1 className="appointments-heading">Doctor's Appointments</h1>

            {/* Date Picker */}
            <div className="date-picker">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* Appointments Table */}
            <div className="table-container">
                {loading ? (
                    <p className="text-center text-gray-600 p-4 animate-pulse">Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th className="text-center">Payment</th>
                                <th className="text-center">Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.patientPhoneNumber}</td>
                                    <td>{new Date(appointment.DateOfAppointment).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <span className={`status ${appointment.payment_status === "Paid" ? "paid" : "unpaid"}`}>
                                            {appointment.payment_status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {appointment.appointment_status === "completed" ? (
                                            <span className="status-tag completed">✅ Completed</span>
                                        ) : appointment.appointment_status === "no_show" ? (
                                            <span className="status-tag no-show">❌ No-Show</span>
                                        ) : appointment.session_started ? (
                                            <div className="flex flex-col gap-2 items-center">
                                                <button
                                                    onClick={() => window.open(appointment.meeting_link, "_blank")}
                                                    className="button join"
                                                >
                                                    Join Meeting
                                                </button>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => markCompleted(appointment._id)}
                                                        className="button complete"
                                                    >
                                                        Mark Completed
                                                    </button>
                                                    <button
                                                        onClick={() => markNoShow(appointment._id)}
                                                        className="button no-show"
                                                    >
                                                        Mark No-Show
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => startSession(appointment._id)}
                                                className="button start"
                                            >
                                                Start Session
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600 p-6 text-lg font-semibold">No Appointments Found</p>
                )}
            </div>
        </div>
    );
};

export default Appointments;