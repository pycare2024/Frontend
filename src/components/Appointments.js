import React, { useState, useEffect } from "react";
import "./Appointment.css";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionNotes, setSessionNotes] = useState({});
    const [sessionRecommendations, setSessionRecommendations] = useState({});
    const [followUpMap, setFollowUpMap] = useState({});

    const doctor_id = localStorage.getItem("doctor_id");

    useEffect(() => {
        if (doctor_id) fetchAppointments();
    }, [selectedDate, doctor_id]);

    const fetchAppointments = async () => {
        if (!doctor_id) return;
        setLoading(true);
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/doctor-appointments?doctor_id=${doctor_id}${selectedDate ? `&date=${selectedDate}` : ""}`);
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
            if (response.ok) fetchAppointments();
            else alert("Failed to start session.");
        } catch (error) {
            console.error("Start session error:", error);
        }
    };

    const markCompleted = async (appointmentId) => {
        if (!sessionNotes[appointmentId]?.trim()) {
            alert("Please enter Notes before marking session as completed.");
            return;
        }

        const followUpRecommended = followUpMap[appointmentId] || false;

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/markCompleted/${appointmentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    notes: sessionNotes[appointmentId],
                    recommendations: sessionRecommendations[appointmentId] || "",
                    followUpRecommended: followUpRecommended
                })
            });
            const data = await response.json();
            if (response.ok) {
                alert("Marked as completed");
                fetchAppointments();
            } else alert(data.message || "Failed to mark as completed");
        } catch (error) {
            console.error("Error:", error);
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
            } else alert(data.message || "Failed to mark as no-show");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/cancelAndRefund/${appointmentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {
                alert("Appointment cancelled and refund initiated.");
                fetchAppointments();
            } else alert(data.message || "Cancellation failed.");
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
    };

    const handleVoiceInput = (field, id) => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (field === "notes") {
                setSessionNotes(prev => ({ ...prev, [id]: (prev[id] || "") + " " + transcript }));
            } else {
                setSessionRecommendations(prev => ({ ...prev, [id]: (prev[id] || "") + " " + transcript }));
            }
        };
        recognition.start();
    };

    return (
        <div className="appointments-wrapper">
            <h1 className="appointments-heading">Doctor's Appointments</h1>
            <div className="date-picker">
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
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
                                <th>Start time - End time</th>
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
                                    <td>{appointment.AppStartTime}-{appointment.AppEndTime}</td>

                                    <td className="text-center">
                                        <span className={`status ${appointment.payment_status === "Paid" ? "paid" : "unpaid"}`}>
                                            {appointment.payment_status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {appointment.appointment_status === "cancelled" ? (
                                            <span className="status-tag cancelled">❌ Cancelled</span>
                                        ) : appointment.appointment_status === "completed" ? (
                                            <span className="status-tag completed">✅ Completed</span>
                                        ) : appointment.appointment_status === "no_show" ? (
                                            <span className="status-tag no-show">❌ No-Show</span>
                                        ) : appointment.session_started ? (
                                            <div className="flex flex-col gap-2 items-center">
                                                <button onClick={() => window.open(appointment.meeting_link, "_blank")} className="button join">
                                                    Join Meeting
                                                </button>
                                                <div className="session-fields">
                                                    <div className="field">
                                                        <label>Notes <span className="required">*</span></label>
                                                        <div className="voice-input">
                                                            <textarea
                                                                value={sessionNotes[appointment._id] || ""}
                                                                onChange={(e) => setSessionNotes({ ...sessionNotes, [appointment._id]: e.target.value })}
                                                            />
                                                            <button className="mic-button" onClick={() => handleVoiceInput("notes", appointment._id)}>🎙️</button>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label>Recommendations</label>
                                                        <div className="voice-input">
                                                            <textarea
                                                                value={sessionRecommendations[appointment._id] || ""}
                                                                onChange={(e) => setSessionRecommendations({ ...sessionRecommendations, [appointment._id]: e.target.value })}
                                                            />
                                                            <button className="mic-button" onClick={() => handleVoiceInput("recommendations", appointment._id)}>🎙️</button>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={followUpMap[appointment._id] || false}
                                                                onChange={(e) =>
                                                                    setFollowUpMap((prev) => ({
                                                                        ...prev,
                                                                        [appointment._id]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            Recommend Follow-Up
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => markCompleted(appointment._id)} className="button complete">
                                                        Mark Completed
                                                    </button>
                                                    <button onClick={() => markNoShow(appointment._id)} className="button no-show">
                                                        Mark No-Show
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-2 items-center">
                                                <button onClick={() => startSession(appointment._id)} className="button start">
                                                    Start Session
                                                </button>
                                                <button onClick={() => cancelAppointment(appointment._id)} className="button cancel">
                                                    Cancel Appointment
                                                </button>
                                            </div>
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
