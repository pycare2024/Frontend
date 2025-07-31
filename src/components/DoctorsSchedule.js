import React, { useState } from "react";
import './DoctorSchedule.css';

const DoctorSchedule = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [platformFilter, setPlatformFilter] = useState("all");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    const [selectedDoctorId, setSelectedDoctorId] = useState("all");

    const fetchSchedules = async () => {
        if (!startDate || !endDate) {
            setError("Please select both start and end dates");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `https://backend-xhl4.onrender.com/DoctorRoute/getValidDoctorSchedules?startDate=${startDate}&endDate=${endDate}`
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Failed to fetch schedules");

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
        schedules.filter(s => s.doctor_id?.platformType === platform)
                 .reduce((acc, s) => acc + s.Slots.length, 0);

    const getMarketplaceEventSlots = (price) =>
        schedules.filter(s => s.doctor_id?.platformType === "marketplace" && s.pricePerSlot === price)
                 .reduce((acc, s) => acc + s.Slots.length, 0);

    const downloadCSV = () => {
        const brandingHeader = [
            ["PsyCare - Expert Schedule Report"],
            ["Empowering Minds, Enhancing Lives"],
            ["Logo:", "https://psy-care.in/static/media/logo.abc123.png"],
            []
        ];

        const summary = [
            [`Date Range:,${startDate} to ${endDate}`],
            [`Total Experts:,${groupedByDoctor.length}`],
            [`Total Slots:,${getTotalSlots()}`],
            [`Available Slots:,${getAvailableSlots()}`],
            [`Marketplace Slots:,${getSlotCountByPlatform("marketplace")}`],
            [`Corporate Slots:,${getSlotCountByPlatform("corporate")}`],
            [`School Slots:,${getSlotCountByPlatform("school")}`],
            [`Mindependence Slots (₹400):,${getMarketplaceEventSlots(400)}`],
            [`Normal Slots (₹800):,${getMarketplaceEventSlots(800)}`],
            []
        ];

        const headers = [[
            "Expert Name",
            "City",
            "Role",
            "Platform",
            "Experience",
            "Slot Price (INR)",
            "Slot Start Time",
            "Slot End Time",
            "Booked Status",
            "Schedule Date"
        ]];

        const rows = groupedByDoctor.flatMap(doctor =>
            doctor.allSlots.map(slot => [
                doctor.doctor_id?.Name,
                doctor.doctor_id?.City,
                doctor.doctor_id?.Role,
                doctor.doctor_id?.platformType,
                `${doctor.doctor_id?.experienceYears} yr ${doctor.doctor_id?.experienceMonths} mo`,
                doctor.pricePerSlot,
                slot.startTime,
                slot.endTime,
                slot.isBooked ? "Yes" : "No",
                slot.date
            ])
        );

        const csvRows = [...brandingHeader, ...summary, ...headers, ...rows];
        const csvContent = csvRows.map(r => r.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `psycare_expert_schedule_${startDate}_to_${endDate}.csv`;
        a.click();
    };

    const filteredSchedules = schedules.filter(s => {
        const matchesPlatform = platformFilter === "all" || s.doctor_id?.platformType === platformFilter;
        const hasAvailable = s.Slots.some(slot => !slot.isBooked);
        const hasBooked = s.Slots.some(slot => slot.isBooked);
        const matchesAvailability =
            availabilityFilter === "all" ||
            (availabilityFilter === "available" && hasAvailable) ||
            (availabilityFilter === "booked" && hasBooked);
        const matchesDoctor = selectedDoctorId === "all" || s.doctor_id?._id === selectedDoctorId;

        return matchesPlatform && matchesAvailability && matchesDoctor;
    });

    const groupedByDoctor = Object.values(
        filteredSchedules.reduce((acc, schedule) => {
            const docId = schedule.doctor_id?._id;
            if (!acc[docId]) {
                acc[docId] = {
                    ...schedule,
                    allSlots: []
                };
            }
            acc[docId].allSlots.push(...schedule.Slots.map(slot => ({
                ...slot,
                date: schedule.Date?.substring(0, 10)
            })));
            return acc;
        }, {})
    );

    const uniqueDoctors = Array.from(
        new Map(
            schedules.map(s => [s.doctor_id?._id, { _id: s.doctor_id?._id, name: s.doctor_id?.Name }])
        ).values()
    );

    return (
        <div className="doctor-schedule-main">
            <div className="doctor-schedule-container">
                <h2 className="doctor-schedule-header">Experts Schedule View</h2>

                <div className="filters">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="doctor-schedule-input" style={{border:"1px solid #4285F4"}}/>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="doctor-schedule-input" style={{border:"1px solid #4285F4"}}/>

                    <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="doctor-schedule-select">
                        <option value="all">All Platforms</option>
                        <option value="marketplace">Marketplace</option>
                        <option value="corporate">Corporate</option>
                        <option value="school">School</option>
                    </select>

                    <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="doctor-schedule-select">
                        <option value="all">All</option>
                        <option value="available">Only Available</option>
                        <option value="booked">Only Booked</option>
                    </select>

                    <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="doctor-schedule-select">
                        <option value="all">All Experts</option>
                        {uniqueDoctors.map(doc => (
                            <option key={doc._id} value={doc._id}>{doc.name}</option>
                        ))}
                    </select>

                    <button onClick={fetchSchedules} className="fetch-button">Fetch Schedules</button>
                    {filteredSchedules.length > 0 && <button onClick={downloadCSV} className="csv-button">Download CSV</button>}
                </div>

                {loading && <p>Loading schedules...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && groupedByDoctor.length > 0 && (
                    <>
                        <div className="summary-banner">
                            📆 <strong>Date Range:</strong> {startDate} to {endDate} <br />
                            👨‍⚕️ Total Experts: {groupedByDoctor.length} &nbsp;|&nbsp;
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
                                        <th>Expert</th>
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
                                    {groupedByDoctor.map((doctor, idx) => {
                                        const bookedCount = doctor.allSlots.filter(s => s.isBooked).length;
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{doctor.doctor_id?.Name}</td>
                                                <td>{doctor.doctor_id?.City}</td>
                                                <td>{doctor.doctor_id?.Role}</td>
                                                <td>{doctor.doctor_id?.platformType}</td>
                                                <td>{doctor.doctor_id?.experienceYears} yr {doctor.doctor_id?.experienceMonths} mo</td>
                                                <td>₹{doctor.pricePerSlot}</td>
                                                <td>{doctor.allSlots.length}</td>
                                                <td>{bookedCount}</td>
                                                <td>{doctor.allSlots.length - bookedCount}</td>
                                                <td>
                                                    <ul className="slot-list">
                                                        {doctor.allSlots.map((slot, i) => (
                                                            <li key={i}>
                                                                {slot.date}: {slot.startTime} → {slot.endTime}
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

                {!loading && filteredSchedules.length === 0 && startDate && endDate && (
                    <p>No schedules found for selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorSchedule;