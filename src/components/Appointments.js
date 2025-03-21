import React, { useState, useEffect } from "react";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeMeeting, setActiveMeeting] = useState(null); // Track active Jitsi meeting

    const doctor_id = localStorage.getItem("doctor_id");
    const id = localStorage.getItem("Id");

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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg" style={{ marginTop: "6%", height: "100vh" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Appointments</h1>

            {/* Doctor ID Info */}
            {doctor_id ? (
                <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md text-center">
                    <p><span className="font-semibold">Doctor ID:</span> {id}</p>
                    <p><span className="font-semibold">Database ID:</span> {doctor_id}</p>
                </div>
            ) : (
                <p className="text-red-600 font-semibold text-center">
                    ⚠ Error: Doctor ID not found. Please log in again.
                </p>
            )}

            {/* Date Picker */}
            <div className="mb-4 flex justify-center">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Appointments Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <p className="text-center text-gray-600">Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-800 text-black">
                                <th className="border p-3">Patient</th>
                                <th className="border p-3">Phone</th>
                                <th className="border p-3">Date</th>
                                <th className="border p-3">Payment</th>
                                <th className="border p-3">Meeting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id} className="text-center border-b hover:bg-gray-100">
                                    <td className="border p-3">{appointment.patientName}</td>
                                    <td className="border p-3">{appointment.patientPhoneNumber}</td>
                                    <td className="border p-3">{new Date(appointment.DateOfAppointment).toLocaleDateString()}</td>
                                    <td className="border p-3">
                                        <span className={`px-3 py-1 text-white text-sm rounded-md ${
                                            appointment.payment_status === "Paid"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}>
                                            {appointment.payment_status}
                                        </span>
                                    </td>
                                    <td className="border p-3">
                                        {appointment.meeting_link ? (
                                            <button
                                                onClick={() => setActiveMeeting(appointment.meeting_link)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800"
                                            >
                                                Join Meeting
                                            </button>
                                        ) : (
                                            <span className="text-gray-500">Not Available</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600">No Appointments Found</p>
                )}
            </div>

            {/* Jitsi Meeting Embedded */}
            {activeMeeting && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">Live Consultation</h3>
                    <iframe
                        src={activeMeeting}
                        width="100%"
                        height="500px"
                        allow="camera; microphone; fullscreen"
                        className="mt-4 border rounded-lg"
                    ></iframe>
                    <button
                        onClick={() => setActiveMeeting(null)}
                        className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Close Meeting
                    </button>
                </div>
            )}
        </div>
    );
};

export default Appointments;