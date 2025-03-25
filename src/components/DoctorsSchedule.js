import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorSchedule = () => {
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [weekDay, setWeekDay] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([{ startTime: "", endTime: "" }]); // Multiple slots
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAddingSchedule, setIsAddingSchedule] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();

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
        setDoctorId(event.target.value);
    };

    const handleSlotChange = (index, field, value) => {
        const updatedSlots = slots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
        );
        setSlots(updatedSlots);
    };

    const addSlot = () => {
        setSlots([...slots, { startTime: "", endTime: "" }]);
    };

    const removeSlot = (index) => {
        if (slots.length > 1) {
            setSlots(slots.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const scheduleData = {
            doctor_id: doctorId,
            date: date,
            weekDay: weekDay,
            slots: slots, // Sending slots array
        };

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorScheduleRoute/addSchedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(scheduleData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setDoctorId("");
                setDate("");
                setWeekDay("");
                setSlots([{ startTime: "", endTime: "" }]); // Reset slots
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

    return (
        <div style={{ marginTop: "5%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <div style={{ textAlign: "center", width: "100%", maxWidth: "600px", padding: "20px" }}>
                {!isAddingSchedule && (
                    <>
                        <button onClick={() => setIsAddingSchedule(true)} style={buttonStyle("#007bff", "#0056b3")}>Add a Schedule</button>
                        <button onClick={() => navigate("/ModifyDoctorSchedule")} style={buttonStyle("#28a745", "#218838")}>Modify/Delete Schedule</button>
                    </>
                )}

                {isAddingSchedule && (
                    <div style={cardStyle}>
                        <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>Doctor Schedule Management</h2>

                        {loading && <p>Loading doctors...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <form onSubmit={handleSubmit}>
                            <label style={labelStyle}>Doctor:</label>
                            <select value={doctorId} onChange={handleDoctorChange} required style={inputStyle}>
                                <option value="">Select Doctor</option>
                                {doctors.length === 0 && <option disabled>No doctors available</option>}
                                {doctors.map((doc) => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.Name ? doc.Name : "Unknown Doctor"}
                                    </option>
                                ))}
                            </select>

                            <label style={labelStyle}>Date:</label>
                            <input type="date" value={date} onChange={handleDateChange} min={new Date().toISOString().split("T")[0]} required style={inputStyle} />

                            <label style={labelStyle}>Weekday:</label>
                            <input type="text" value={weekDay} readOnly style={{ ...inputStyle, backgroundColor: "#f7f7f7" }} />

                            <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Slots:</h3>
                            {slots.map((slot, index) => (
                                <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input type="time" value={slot.startTime} onChange={(e) => handleSlotChange(index, "startTime", e.target.value)} required style={inputStyle} />
                                    <input type="time" value={slot.endTime} onChange={(e) => handleSlotChange(index, "endTime", e.target.value)} required style={inputStyle} />
                                    <button type="button" onClick={() => removeSlot(index)} style={smallButtonStyle}>❌</button>
                                </div>
                            ))}

                            <button type="button" onClick={addSlot} style={buttonStyle("#17a2b8", "#117a8b")}>➕ Add Slot</button>

                            <button type="submit" style={buttonStyle("#007bff", "#0056b3")} disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Schedule"}
                            </button>
                        </form>

                        <button onClick={() => setIsAddingSchedule(false)} style={buttonStyle("#6c757d", "#5a6268")}>Go Back</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styling
const buttonStyle = (bg, hover) => ({
    padding: "12px 24px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: bg,
    color: "white",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
    boxShadow: `0 4px 6px rgba(${bg === "#007bff" ? "0, 123, 255" : "40, 167, 69"}, 0.2)`,
});
const smallButtonStyle = { backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", padding: "5px 10px" };
const inputStyle = { width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" };
const labelStyle = { display: "block", fontSize: "16px", fontWeight: "600", marginBottom: "8px" };
const cardStyle = { backgroundColor: "white", borderRadius: "10px", padding: "30px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)" };

export default DoctorSchedule;