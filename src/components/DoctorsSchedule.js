import React, { useState, useEffect } from "react";

const DoctorSchedule = () => {
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [slotsAvailable, setSlotsAvailable] = useState("");
    const [weekDay, setWeekDay] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(""); 
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState("");         
    const [isAddingSchedule, setIsAddingSchedule] = useState(false); 
    const [isModifyingSchedule, setIsModifyingSchedule] = useState(false); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState(""); // For modification/deletion

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

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);

        const day = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" });
        setWeekDay(day);
    };

    const handleDoctorChange = (event) => {
        const selectedDoctorId = event.target.value;
        setDoctorId(selectedDoctorId);

        const doctor = doctors.find((doc) => doc._id === selectedDoctorId);
        setSelectedDoctorId(doctor ? doctor._id : ""); 
    };

    const handleModifyScheduleChange = (event) => {
        setSelectedScheduleId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const scheduleData = {
            doctor_id: doctorId,
            date: date,
            slotsAvailable: slotsAvailable,
            weekDay: weekDay,
        };

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorScheduleRoute/addSchedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(scheduleData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); 
                setDoctorId("");
                setDate("");
                setSlotsAvailable("");
                setWeekDay("");
                setIsAddingSchedule(false); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error submitting schedule:", error);
            alert("An error occurred while submitting the schedule.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSchedule = async () => {
        if (!selectedScheduleId) {
            alert("Please select a schedule to delete");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/deleteSchedule/${selectedScheduleId}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setSelectedScheduleId("");
                setIsModifyingSchedule(false);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error deleting schedule:", error);
            alert("An error occurred while deleting the schedule.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ marginTop:"5%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <div style={{ textAlign: "center", width: "100%", maxWidth: "600px", padding: "20px" }}>
                {!isAddingSchedule && !isModifyingSchedule && (
                    <>
                        <button
                            onClick={() => setIsAddingSchedule(true)}
                            style={{
                                padding: "12px 24px",
                                margin: "10px",
                                fontSize: "16px",
                                cursor: "pointer",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 123, 255, 0.2)",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                        >
                            Add a Schedule
                        </button>
                        <button
                            onClick={() => setIsModifyingSchedule(true)}
                            style={{
                                padding: "12px 24px",
                                margin: "10px",
                                fontSize: "16px",
                                cursor: "pointer",
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(40, 167, 69, 0.2)",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
                        >
                            Modify/Delete Schedule
                        </button>
                    </>
                )}

                {isModifyingSchedule && (
                    <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "30px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)" }}>
                        <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>Modify/Delete Schedule</h2>

                        {loading && <p>Loading doctors...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <label style={{ display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Doctor:</label>
                        <select
                            value={doctorId}
                            onChange={handleDoctorChange}
                            required
                            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px" }}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.length === 0 && <option disabled>No doctors available</option>}
                            {doctors.map((doc) => (
                                <option key={doc._id} value={doc._id}>
                                    {doc.Name ? doc.Name : "Unknown Doctor"}
                                </option>
                            ))}
                        </select>

                        {doctorId && (
                            <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: "600" }}>
                                <strong>Selected Doctor ID:</strong> {doctorId}
                            </div>
                        )}

                        <label style={{ display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Schedule to Modify/Delete:</label>
                        <select
                            value={selectedScheduleId}
                            onChange={handleModifyScheduleChange}
                            required
                            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px" }}
                        >
                            <option value="">Select Schedule</option>
                            {/* Fetch and display the schedules from the backend, for now a dummy example */}
                            <option value="1">Schedule 1</option>
                            <option value="2">Schedule 2</option>
                            {/* Add the dynamic options here */}
                        </select>

                        <div style={{ marginTop: "20px" }}>
                            <button onClick={handleDeleteSchedule} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "8px", marginTop: "10px" }}>
                                Delete Schedule
                            </button>
                            <button onClick={() => setIsModifyingSchedule(false)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#f8f9fa", color: "#333", border: "1px solid #ccc", borderRadius: "8px", marginTop: "10px" }}>
                                Go Back
                            </button>
                        </div>
                    </div>
                )}

                {isAddingSchedule && (
                    <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "30px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)" }}>
                        <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>Doctor Schedule Management</h2>

                        {loading && <p>Loading doctors...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <form onSubmit={handleSubmit}>
                            <label style={{ display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Doctor:</label>
                            <select
                                value={doctorId}
                                onChange={handleDoctorChange}
                                required
                                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px" }}
                            >
                                <option value="">Select Doctor</option>
                                {doctors.length === 0 && <option disabled>No doctors available</option>}
                                {doctors.map((doc) => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.Name ? doc.Name : "Unknown Doctor"}
                                    </option>
                                ))}
                            </select>

                            {doctorId && (
                                <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: "600" }}>
                                    <strong>Doctor ID:</strong> {doctorId}
                                </div>
                            )}

                            <label style={{ display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Date:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                min={new Date().toISOString().split("T")[0]}
                                required
                                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px" }}
                            />

                            <label style={{ display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Slots Available:</label>
                            <input
                                type="number"
                                value={slotsAvailable}
                                onChange={(e) => setSlotsAvailable(Math.min(e.target.value, 12))}
                                min="1"
                                max="12"
                                required
                                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px" }}
                            />

                            <label style={{ display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Weekday:</label>
                            <input
                                type="text"
                                value={weekDay}
                                readOnly
                                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px", backgroundColor: "#f7f7f7" }}
                            />

                            <button
                                type="submit"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    fontSize: "16px",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease",
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save Schedule"}
                            </button>
                        </form>

                        <div style={{ marginTop: "20px" }}>
                            <button
                                onClick={() => setIsAddingSchedule(false)}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    backgroundColor: "#f8f9fa",
                                    color: "#333",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    marginTop: "10px",
                                }}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorSchedule;