import React, { useState, useEffect } from "react";

const ModifyDoctorSchedule = () => {
    const [doctorId, setDoctorId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [slotsAvailable, setSlotsAvailable] = useState("");

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

        setSchedules([]);
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/doctorSchedules/${doctorId}/${date}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message);
            }
            
            setSchedules([data.data]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleModifyClick = (schedule) => {
        setEditingSchedule(schedule);
        setSlotsAvailable(schedule.SlotsAvailable);
    };

    const handleSlotsChange = (event) => {
        let value = parseInt(event.target.value, 10);

        if (isNaN(value) || value < 0) {
            value = 0;
        } else if (value > 12) {
            alert("Slots cannot be more than 12.");
            value = 12;
        }

        setSlotsAvailable(value);
    };

    const handleUpdateSchedule = async () => {
        if (!editingSchedule) return;

        const confirmed = window.confirm("Do you want to update the schedule?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/updateSchedule/${editingSchedule._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date,
                    slotsAvailable,
                    weekDay: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            alert("Schedule updated successfully.");
            setEditingSchedule(null);
            fetchSchedules();
        } catch (error) {
            alert("Error updating schedule: " + error.message);
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        const confirmed = window.confirm("Are you sure you want to delete this schedule?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorScheduleRoute/deleteSchedule/${scheduleId}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            alert("Schedule deleted successfully.");
            fetchSchedules();
        } catch (error) {
            alert("Error deleting schedule: " + error.message);
        }
    };

    return (
        <div style={{ marginTop: "5%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <div style={{ textAlign: "center", width: "100%", maxWidth: "600px", padding: "20px" }}>
                <h2>Select Doctor and Date</h2>
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
                    {schedules.length === 0 && !loading && !error && <p>No schedules found.</p>}
                    {schedules.map((schedule, index) => (
                        <div key={index} style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "10px" }}>
                            <p><strong>Date:</strong> {new Date(schedule.Date).toLocaleDateString("en-GB")}</p>
                            <p><strong>Slots Available:</strong> {schedule.SlotsAvailable}</p>
                            <button onClick={() => handleModifyClick(schedule)} style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Modify</button>
                            <button onClick={() => handleDeleteSchedule(schedule._id)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                        </div>
                    ))}
                </div>
                {editingSchedule && (
                    <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "10px" }}>
                        <h3>Modify Schedule</h3>
                        <p><strong>Date:</strong> {date}</p>
                        <input
                            type="number"
                            value={slotsAvailable}
                            onChange={handleSlotsChange}
                            placeholder="Slots Available"
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                        <p><strong>Weekday:</strong> {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                        <button onClick={handleUpdateSchedule} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Update Schedule</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModifyDoctorSchedule;