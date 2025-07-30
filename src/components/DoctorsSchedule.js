import React, { useState } from "react";
import './DoctorSchedule.css';

const DoctorSchedule = () => {
    const [date, setDate] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [platformFilter, setPlatformFilter] = useState("all");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");

    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);
        fetchSchedules(selectedDate);
    };

    const fetchSchedules = async (selectedDate) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(
                `https://backend-xhl4.onrender.com/DoctorRoute/getValidDoctorSchedules?date=${selectedDate}`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch schedules");
            }

            setSchedules(data.schedules || []);
        } catch (err) {
            setError(err.message);
            setSchedules([]);
        } finally {
            setLoading(false);
        }
    };

    const getTotalSlots = () =>
        schedules.reduce((acc, s) => acc + s.Slots.length, 0);

    const getAvailableSlots = () =>
        schedules.reduce((acc, s) => acc + s.Slots.filter(slot => !slot.isBooked).length, 0);

    const getSlotCountByPlatform = (platform) =>
        schedules
            .filter(s => s.doctor_id?.platformType === platform)
            .reduce((acc, s) => acc + s.Slots.length, 0);

    const getMarketplaceEventSlots = (price) =>
        schedules
            .filter(s => s.doctor_id?.platformType === "marketplace" && s.pricePerSlot === price)
            .reduce((acc, s) => acc + s.Slots.length, 0);

    const filteredSchedules = schedules.filter(s => {
        const matchesPlatform = platformFilter === "all" || s.doctor_id?.platformType === platformFilter;
        const hasAvailable = s.Slots.some(slot => !slot.isBooked);
        const hasBooked = s.Slots.some(slot => slot.isBooked);

        const matchesAvailability =
            availabilityFilter === "all" ||
            (availabilityFilter === "available" && hasAvailable) ||
            (availabilityFilter === "booked" && hasBooked);

        return matchesPlatform && matchesAvailability;
    });

    return (
        <div className="doctor-schedule-main">
            <div className="doctor-schedule-container">
                <h2 className="doctor-schedule-header">Doctor Schedules</h2>

                <div className="filters">
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="doctor-schedule-input"
                        style={{border:"1px solid #4285F4"}}
                    />

                    <select
                        value={platformFilter}
                        onChange={(e) => setPlatformFilter(e.target.value)}
                        className="doctor-schedule-select"
                    >
                        <option value="all">All Platforms</option>
                        <option value="marketplace">Marketplace</option>
                        <option value="corporate">Corporate</option>
                        <option value="school">School</option>
                    </select>

                    <select
                        value={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="doctor-schedule-select"
                    >
                        <option value="all">All</option>
                        <option value="available">Only Available</option>
                        <option value="booked">Only Booked</option>
                    </select>
                </div>

                {loading && <p>Loading schedules...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && filteredSchedules.length > 0 && (
                    <>
                        <div className="summary-banner">
                            🧾 <strong>Summary for {date}</strong> ({filteredSchedules[0]?.WeekDay})<br />
                            👨‍⚕️ Total Doctors: {filteredSchedules.length} &nbsp;|&nbsp;
                            🕑 Total Slots: {getTotalSlots()} &nbsp;|&nbsp;
                            ✅ Available Slots: {getAvailableSlots()} <br /><br />

                            📊 <u>Platform-wise Slot Distribution</u><br />
                            🏥 Marketplace: {getSlotCountByPlatform("marketplace")} &nbsp;
                            🏫 School: {getSlotCountByPlatform("school")} &nbsp;
                            🏢 Corporate: {getSlotCountByPlatform("corporate")} <br /><br />

                            🧠 <u>Marketplace Breakdown</u><br />
                            🎯 Mindependence (₹400): {getMarketplaceEventSlots(400)} &nbsp;
                            💰 Normal (₹800): {getMarketplaceEventSlots(800)}
                        </div>

                        <div className="schedule-table-wrapper">
                            <table className="schedule-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Doctor</th>
                                        <th>City</th>
                                        <th>Role</th>
                                        <th>Platform</th>
                                        <th>Experience</th>
                                        <th>Price</th>
                                        <th>Total Slots</th>
                                        <th>Booked</th>
                                        <th>Available</th>
                                        <th>Slots</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSchedules.map((schedule, idx) => {
                                        const bookedCount = schedule.Slots.filter(s => s.isBooked).length;
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{schedule.doctor_id?.Name}</td>
                                                <td>{schedule.doctor_id?.City}</td>
                                                <td>{schedule.doctor_id?.Role}</td>
                                                <td>{schedule.doctor_id?.platformType}</td>
                                                <td>{schedule.doctor_id?.experienceYears} yr {schedule.doctor_id?.experienceMonths} mo</td>
                                                <td>₹{schedule.pricePerSlot}</td>
                                                <td>{schedule.Slots.length}</td>
                                                <td>{bookedCount}</td>
                                                <td>{schedule.Slots.length - bookedCount}</td>
                                                <td>
                                                    <ul className="slot-list">
                                                        {schedule.Slots.map((slot, i) => (
                                                            <li key={i}>
                                                                {slot.startTime} → {slot.endTime}
                                                                {slot.isBooked && <span className="booked">(Booked)</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {filteredSchedules.length === 0 && !loading && date && (
                    <p>No schedules found for this filter/date.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorSchedule;