import React, { useEffect, useState } from "react";
import "./DoctorOwnSchedule.css";

function DoctorOwnSchedule() {
  const [doctorId] = useState(localStorage.getItem("doctor_id") || "");
  const [date, setDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [slots, setSlots] = useState([]);
  const [scheduleId, setScheduleId] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [newSlots, setNewSlots] = useState([{ startTime: "", endTime: "" }]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (date) {
      const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
      setWeekDay(day);
      fetchDoctorSlots();
    }
  }, [date]);

  const fetchDoctorSlots = async () => {
    if (!doctorId || !date) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://backend-xhl4.onrender.com/DoctorScheduleRoute/doctorSchedules/${doctorId}/${date}`
      );
      const data = await res.json();

      if (res.status === 404) {
        setSlots([]);
        setScheduleId("");
        setPricePerDay("");
        setMessage("No slots found for the selected date.");
      } else {
        setSlots(data.slots || []);
        setScheduleId(data.scheduleId || "");
        setPricePerDay(data.pricePerDay || "");
        setMessage("");
      }
    } catch (err) {
      setMessage("Something went wrong while fetching slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slotId) => {
    if (!scheduleId) return alert("Schedule ID missing");
    if (!window.confirm("Are you sure you want to delete this slot?")) return;

    try {
      const res = await fetch(
        `https://backend-xhl4.onrender.com/DoctorScheduleRoute/deleteSlot/${scheduleId}/${slotId}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.scheduleDeleted) {
        // if schedule is fully deleted after last slot is removed
        setSlots([]);
        setScheduleId("");
        setPricePerDay("");
        setMessage("All slots removed. Schedule deleted.");
      } else {
        fetchDoctorSlots();
      }
    } catch (err) {
      alert("Error deleting slot: " + err.message);
    }
  };

  const handleSlotUpdate = async () => {
    if (!scheduleId || !editingSlot) return;

    try {
      const res = await fetch(
        `https://backend-xhl4.onrender.com/DoctorScheduleRoute/updateSchedule/${scheduleId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            weekDay,
            pricePerDay: Number(pricePerDay),
            slots: [editingSlot],
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Slot updated successfully.");
      setEditingSlot(null);
      fetchDoctorSlots();
    } catch (err) {
      alert("Error updating slot: " + err.message);
    }
  };

  const handleAddSlots = async () => {
    const validSlots = newSlots.filter(s => s.startTime && s.endTime);
    if (validSlots.length === 0) return alert("Please enter at least one valid slot.");
    if (!pricePerDay) return alert("Please enter a valid price per day.");

    setIsSaving(true);

    try {
      const url = scheduleId
        ? `https://backend-xhl4.onrender.com/DoctorScheduleRoute/updateSchedule/${scheduleId}`
        : `https://backend-xhl4.onrender.com/DoctorScheduleRoute/addSchedule`;

      const method = scheduleId ? "PUT" : "POST";
      const body = scheduleId
        ? { date, weekDay, pricePerSlot: Number(pricePerDay), slots: validSlots }
        : { doctor_id: doctorId, date, weekDay, pricePerSlot: Number(pricePerDay), slots: validSlots };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setNewSlots([{ startTime: "", endTime: "" }]);
      fetchDoctorSlots();
    } catch (err) {
      alert("Error adding slots: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewSlotChange = (index, field, value) => {
    const updated = [...newSlots];
    updated[index][field] = value;
    setNewSlots(updated);
  };

  const addNewSlotField = () => {
    setNewSlots([...newSlots, { startTime: "", endTime: "" }]);
  };

  const removeSlotField = (index) => {
    const updated = [...newSlots];
    updated.splice(index, 1);
    setNewSlots(updated);
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Manage My Schedule</h2>

      <label>Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]} // Today
        max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 days
          .toISOString()
          .split("T")[0]}
      />

      <div className="price-container">
        <label>Price Per Day (₹):</label>
        <input
          type="number"
          min="1"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          placeholder="Enter price for this day's schedule"
        />

        {message && <p className="message">{message}</p>}
      </div>

      {!loading && slots.length > 0 && (
        <div className="slot-list">
          <h4>Available Slots:</h4>
          {slots.map((slot) => (
            <div className="slot-card" key={slot._id}>
              <p>⏰ {slot.startTime} - {slot.endTime}</p>
              <button onClick={() => setEditingSlot(slot)}>✏️ Modify</button>
              <button onClick={() => handleDelete(slot._id)}>❌ Delete</button>
            </div>
          ))}
        </div>
      )}

      {editingSlot && (
        <div className="edit-slot">
          <h4>Edit Slot</h4>
          <input
            type="time"
            value={editingSlot.startTime}
            onChange={(e) => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
          />
          <input
            type="time"
            value={editingSlot.endTime}
            onChange={(e) => setEditingSlot({ ...editingSlot, endTime: e.target.value })}
          />
          <br />
          <button className="save-button" onClick={handleSlotUpdate}>✅ Save Changes</button>
        </div>
      )}

      <div className="add-slot">
        <h4>Add New Slot(s):</h4>
        {newSlots.map((slot, idx) => (
          <div className="time-input-group" key={idx}>
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) => handleNewSlotChange(idx, "startTime", e.target.value)}
            />
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) => handleNewSlotChange(idx, "endTime", e.target.value)}
            />
            {newSlots.length > 1 && (
              <button onClick={() => removeSlotField(idx)}>❌</button>
            )}
          </div>
        ))}
        <button className="add-button" onClick={addNewSlotField}>➕ Add Another Slot</button>
        <br />
        <button className="save-button" onClick={handleAddSlots} disabled={isSaving}>
          ✅ Save All Slots
        </button>
      </div>
    </div>
  );
}

export default DoctorOwnSchedule;