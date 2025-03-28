import React, { useState, useEffect } from "react";

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

            if (response.ok) {
                fetchAppointments();
            } else {
                console.error("Failed to start session");
            }
        } catch (error) {
            console.error("Error starting session:", error);
        }
    };

    return (
        <div className="max-w-6xl p-8 bg-white shadow-xl rounded-lg min-h-screen" style={{marginTop:"5%",height:"100vh"}}>
            <h1 style={{color:"#4285F4" , fontWeight:"bold", textAlign:"center"}}>Doctor's Appointments</h1>

            {/* Date Picker */}
            <div>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 text-gray-700 text-lg"
                    style={{textAlign:"center"}}
                />
            </div>

            {/* Appointments Table */}
            <div className="overflow-x-auto bg-gray-100 shadow-md rounded-lg">
                {loading ? (
                    <p className="text-center text-gray-600 p-4 animate-pulse">Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    <table className="w-full border-collapse rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white text-lg">
                                <th className="p-4 text-left">Patient</th>
                                <th className="p-4 text-left">Phone</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-center">Payment</th>
                                <th className="p-4 text-center">Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr
                                    key={appointment._id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"} hover:bg-gray-300 transition-all`}
                                >
                                    <td className="p-4 font-medium text-gray-800">{appointment.patientName}</td>
                                    <td className="p-4 text-gray-700">{appointment.patientPhoneNumber}</td>
                                    <td className="p-4 text-gray-700">{new Date(appointment.DateOfAppointment).toLocaleDateString()}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 text-white text-sm font-semibold rounded-md ${
                                            appointment.payment_status === "Paid" ? "bg-green-500" : "bg-red-500"
                                        }`}>
                                            {appointment.payment_status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {appointment.session_started ? (
                                            <button
                                                onClick={() => window.open(appointment.meeting_link, "_blank")}
                                                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                                            >
                                                Join Meeting
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => startSession(appointment._id)}
                                                className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
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