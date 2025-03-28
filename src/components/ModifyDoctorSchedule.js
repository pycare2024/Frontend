import React, { useState, useEffect } from "react";

const ModifyDoctorSchedule = () => {
    const [doctorId, setDoctorId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editingSlot, setEditingSlot] = useState(null);
    const [scheduleId, setScheduleId] = useState("");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute");
            if (!response.ok) throw new Error("Failed to fetch doctors");
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDoctorChange = (event) => {
        const selectedDoctorId = event.target.value;
        setDoctorId(selectedDoctorId);
        const doctor = doctors.find((doc) => doc._id === selectedDoctorId);
        setDoctorName(doctor ? doctor.Name : "");
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const fetchSchedules = async () => {
        if (!doctorId || !date) {
            alert("Please select both doctor and date.");
            return;
        }
    
        setSchedules([]); // Reset schedules before fetching
        setError("");
        setLoading(true);
    
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/doctorSchedules/${doctorId}/${date}`);
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch schedules");
            }
    
            if (data && data.scheduleId) {
                setScheduleId(data.scheduleId); // Store the schedule ID
            } else {
                setScheduleId(""); // Ensure it doesn't hold an invalid value
            }
    
            // Handle case where schedule exists but no slots are available
            if (data.slots.length === 0) {
                setError("Schedule exists, but no slots available."); // Display message
            } else {
                setError(""); // Clear error if slots are available
            }
    
            setSchedules(data.slots || []); // Ensure it's always an array
        } catch (error) {
            console.error("Error fetching schedules:", error);
            setError(error.message);
            setSchedules([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleEditSlot = (slot) => {
        if (slot.isBooked) {
            alert("Cannot edit this slot, it is already booked.");
            return;
        }
        setEditingSlot({ ...slot });
    };

    const handleUpdateSlot = async () => {
        if (!editingSlot || !scheduleId) {
            alert("Schedule ID not found. Please try again.");
            return;
        }

        const confirmed = window.confirm("Do you want to update this slot?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/updateSchedule/${scheduleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                    slots: [
                        {
                            _id: editingSlot._id,
                            startTime: editingSlot.startTime,
                            endTime: editingSlot.endTime
                        }
                    ]
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            alert("Slot updated successfully.");
            setEditingSlot(null);
            fetchSchedules();
        } catch (error) {
            alert("Error updating slot: " + error.message);
        }
    };

    const handleDeleteSlot = async (slotId) => {
        if (!scheduleId) {
            alert("Schedule ID not found. Please try again.");
            return;
        }

        const confirmed = window.confirm("Are you sure you want to delete this slot?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/deleteSlot/${scheduleId}/${slotId}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            alert("Slot deleted successfully.");
            fetchSchedules();
        } catch (error) {
            alert("Error deleting slot: " + error.message);
        }
    };

    return (
        <div style={{ marginTop: "5%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <div style={{ textAlign: "center", width: "100%", maxWidth: "600px", padding: "20px" }}>
                <h2 style={{color:"#4285F4", fontWeight:"bold"}}>Select Doctor and Date</h2>
                <select value={doctorId} onChange={handleDoctorChange} style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.Name}</option>
                    ))}
                </select>
                {doctorId && <p>Selected Doctor: {doctorName} (ID: {doctorId})</p>}
                <input type="date" value={date} onChange={handleDateChange} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
                <button onClick={fetchSchedules} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Show Schedules</button>
                {loading && <p>Loading schedules...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div style={{ marginTop: "20px" }}>
                    {schedules && schedules.length === 0 && !loading && !error && <p>No schedules found.</p>}
                    {schedules?.map((slot, index) => (
                        <div key={index} style={{
                            padding: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            backgroundColor: slot.isBooked ? "#ffcccc" : "#ccffcc",
                        }}>
                            <p><strong>Start Time:</strong> {slot.startTime}</p>
                            <p><strong>End Time:</strong> {slot.endTime}</p>
                            <p><strong>Status:</strong> {slot.isBooked ? "Booked" : "Available"}</p>
                            <button
                                onClick={() => handleEditSlot(slot)}
                                disabled={slot.isBooked}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: slot.isBooked ? "#ccc" : "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: slot.isBooked ? "not-allowed" : "pointer",
                                    marginRight: "10px",
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteSlot(slot._id)}
                                disabled={slot.isBooked}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: slot.isBooked ? "#ccc" : "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: slot.isBooked ? "not-allowed" : "pointer",
                                }}
                            >
                                Delete
                            </button>

                            {editingSlot && (
                                <div>
                                    <h3>Edit Slot</h3>
                                    <label>Start Time:</label>
                                    <input
                                        type="time"
                                        value={editingSlot.startTime}
                                        onChange={(e) => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
                                    />

                                    <label>End Time:</label>
                                    <input
                                        type="time"
                                        value={editingSlot.endTime}
                                        onChange={(e) => setEditingSlot({ ...editingSlot, endTime: e.target.value })}
                                    />

                                    <button onClick={handleUpdateSlot}>Update Slot</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModifyDoctorSchedule;