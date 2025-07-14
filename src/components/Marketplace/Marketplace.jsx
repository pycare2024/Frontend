import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./Marketplace.css";

function Marketplace() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({ gender: "", role: "", language: "", bookingType: "" });
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [availableSchedules, setAvailableSchedules] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedExpertise, setSelectedExpertise] = useState([]);
    const [studentBookingFlags, setStudentBookingFlags] = useState({});
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // format: YYYY-MM-DD
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctorsWithSlots(selectedDate);
    }, [selectedDate]);

    const getBookingLabel = (val) => {
        switch (val) {
            case "student": return "Consults Students";
            case "adult": return "Adults Only";
            default: return "All Types";
        }
    };

    const fetchDoctorsWithSlots = async (date) => {
        try {
            setIsLoading(true);
            const res = await axios.get(
                `https://backend-xhl4.onrender.com/AppointmentRoute/marketplacedoctorsWithSlots?date=${date}`
            );
            const doctors = res.data || [];
            const shuffleArray = (array) => {
                return [...array].sort(() => Math.random() - 0.5);
            };

            setDoctors(shuffleArray(doctors));
            setFilteredDoctors(shuffleArray(doctors));
        } catch (err) {
            console.error("❌ Error fetching doctors with slots:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getExperienceLabel = (val) => {
        switch (val) {
            case "0-2": return "0–2 years";
            case "3-5": return "3–5 years";
            case "6-10": return "6–10 years";
            case "10+": return "10+ years";
            default: return "All Levels";
        }
    };

    const handleStudentCheckboxToggle = (doctorId) => {
        setStudentBookingFlags(prev => ({
            ...prev,
            [doctorId]: !prev[doctorId]
        }));
    };

    const applyFilters = () => {
        let filtered = [...doctors];

        if (filters.gender) filtered = filtered.filter(doc => doc.Gender === filters.gender);
        if (filters.role) filtered = filtered.filter(doc => doc.Role === filters.role);
        if (filters.language) filtered = filtered.filter(doc => doc.languagesSpoken.includes(filters.language));

        // Filter by area of expertise (all selected must be present)
        if (selectedExpertise.length > 0) {
            filtered = filtered.filter(doc =>
                selectedExpertise.every(expertise => doc.areaOfExpertise.includes(expertise))
            );
        }

        if (filters.bookingType === "student") {
            filtered = filtered.filter(doc => doc.consultsStudents === true);
        }
        if (filters.bookingType === "adult") {
            filtered = filtered.filter(doc => doc.consultsStudents === false || doc.consultsStudents === undefined);
        }

        if (filters.experience) {
            const [minExp, maxExp] = filters.experience === "10+" ? [10, Infinity] : filters.experience.split("-").map(Number);
            filtered = filtered.filter(doc => doc.experienceYears >= minExp && doc.experienceYears <= maxExp);
        }

        setFilteredDoctors(filtered);
    };

    const clearFilters = () => {
        setFilters({
            gender: "",
            role: "",
            language: "",
            bookingType: "",
            experience: "",
        });
        setSelectedExpertise([]);
        setSelectedDate(() => {
            const today = new Date();
            return today.toISOString().split("T")[0];
        });
        setFilteredDoctors([...doctors]);
    };

    const fetchSlots = async (doctorId) => {
        try {
            const res = await axios.get(`https://backend-xhl4.onrender.com/AppointmentRoute/marketplace/getAvailableSlots/${doctorId}`);
            setAvailableSchedules(res.data.availableSchedules || []);
            setSelectedDoctorId(doctorId);
            setSelectedDateIndex(null); // Reset on new doctor
        } catch (err) {
            console.error("Error fetching slots:", err);
        }
    };

    const expertiseGroupedOptions = [
        {
            label: "Age Group",
            options: [
                { value: "Child Psychology ( 6-12 years)", label: "Child (6–12 yrs)", color: "#f39c12" },
                { value: "Adolescent / Teen Psychology (13–18 yrs)", label: "Teen (13–18 yrs)", color: "#f39c12" },
                { value: "Young Adults (18–25 yrs)", label: "Young Adults", color: "#f39c12" },
                { value: "Adults (25–45 yrs)", label: "Adults", color: "#f39c12" },
                { value: "Geriatric Psychology (45+ yrs)", label: "Geriatric", color: "#f39c12" }
            ]
        },
        {
            label: "Area of Expertise",
            options: [
                { value: "Couples & Relationship Therapy", label: "Couples Therapy", color: "#e74c3c" },
                { value: "Family Therapy", label: "Family Therapy", color: "#e74c3c" },
                { value: "LGBTQIA+ Affirmative Therapy", label: "LGBTQIA+ Therapy", color: "#e74c3c" },
                { value: "Parental Counselling", label: "Parental Counselling", color: "#e74c3c" },
                { value: "Student Academic Stress Support", label: "Academic Stress", color: "#e74c3c" },
                { value: "Corporate / Employee Wellness, Anxiety Disorders", label: "Corporate Wellness", color: "#e74c3c" },
                { value: "Depression", label: "Depression", color: "#e74c3c" },
                { value: "Obsessive Compulsive Disorder (OCD)", label: "OCD", color: "#e74c3c" },
                { value: "Panic Disorders", label: "Panic Disorders", color: "#e74c3c" },
                { value: "Phobias", label: "Phobias", color: "#e74c3c" },
                { value: "Post-Traumatic Stress Disorder (PTSD)", label: "PTSD", color: "#e74c3c" },
                { value: "Attention Deficit Hyperactivity Disorder (ADHD)", label: "ADHD", color: "#e74c3c" },
                { value: "Autism Spectrum Disorders (ASD)", label: "ASD", color: "#e74c3c" },
                { value: "Eating Disorders", label: "Eating Disorders", color: "#e74c3c" },
                { value: "Grief & Loss", label: "Grief & Loss", color: "#e74c3c" },
                { value: "Sleep Disorders", label: "Sleep Disorders", color: "#e74c3c" }
            ]
        },
        {
            label: "Certifications / Modalities",
            options: [
                { value: "Cognitive Behavioural Therapy (CBT)", label: "CBT", color: "#3498db" },
                { value: "Rational Emotive Behaviour Therapy (REBT)", label: "REBT", color: "#3498db" },
                { value: "Dialectical Behaviour Therapy (DBT)", label: "DBT", color: "#3498db" },
                { value: "Mindfulness-Based Interventions", label: "Mindfulness", color: "#3498db" },
                { value: "Trauma-Informed Therapy", label: "Trauma-Informed", color: "#3498db" },
                { value: "Narrative Therapy", label: "Narrative Therapy", color: "#3498db" },
                { value: "Art-Based Therapy", label: "Art Therapy", color: "#3498db" },
                { value: "Play Therapy", label: "Play Therapy", color: "#3498db" },
                { value: "Behaviour Modification", label: "Behaviour Modification", color: "#3498db" },
                { value: "Hypnotherapy", label: "Hypnotherapy", color: "#3498db" },
                { value: "Career Counselling & Guidance", label: "Career Counselling", color: "#3498db" },
                { value: "Psychometric Testing & Interpretation", label: "Psychometric Testing", color: "#3498db" }
            ]
        }
    ];

    return (
        <div className="marketplace-wrapper">
            <div className="marketplace-glass">
                <div className="marketplace-header">
                    <h1>Meet Our Experts</h1>
                    <p>Choose your own therapist and begin your healing journey today.</p>
                </div>

                {/* Filters */}
                <div className="marketplace-filters-modern">
                    {/* Date Filter */}
                    <div className="filter-block">
                        <label className="filter-label">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="filter-input-date"
                        />
                    </div>

                    {/* Booking Type */}
                    <div className="filter-block">
                        <label className="filter-label">Booking Type</label>
                        <Select
                            value={{ label: getBookingLabel(filters.bookingType), value: filters.bookingType }}
                            options={[
                                { value: "", label: "All Types" },
                                { value: "student", label: "Consults Students" },
                                { value: "adult", label: "Adults Only" },
                            ]}
                            onChange={(e) => setFilters({ ...filters, bookingType: e.value })}
                            className="filter-select"
                        />
                    </div>

                    {/* Gender */}
                    <div className="filter-block">
                        <label className="filter-label">Gender</label>
                        <Select
                            value={{ label: filters.gender || "All Genders", value: filters.gender }}
                            options={[
                                { value: "", label: "All Genders" },
                                { value: "Male", label: "Male" },
                                { value: "Female", label: "Female" },
                                { value: "Other", label: "Other" },
                            ]}
                            onChange={(e) => setFilters({ ...filters, gender: e.value })}
                            className="filter-select"
                        />
                    </div>

                    {/* Role */}
                    <div className="filter-block">
                        <label className="filter-label">Role</label>
                        <Select
                            value={{ label: filters.role || "All Roles", value: filters.role }}
                            options={[
                                { value: "", label: "All Roles" },
                                { value: "Therapist", label: "Therapist" },
                                { value: "Consultant", label: "Consultant" },
                                { value: "Psychiatrist", label: "Psychiatrist" },
                            ]}
                            onChange={(e) => setFilters({ ...filters, role: e.value })}
                            className="filter-select"
                        />
                    </div>

                    {/* Language */}
                    <div className="filter-block">
                        <label className="filter-label">Language</label>
                        <Select
                            value={{ label: filters.language || "All Languages", value: filters.language }}
                            options={[
                                { value: "", label: "All Languages" },
                                { value: "English", label: "English" },
                                { value: "Hindi", label: "Hindi" },
                                { value: "Tamil", label: "Tamil" },
                                { value: "Bengali", label: "Bengali" },
                                { value: "Telugu", label: "Telugu" },
                                { value: "Marathi", label: "Marathi" },
                                { value: "Gujarati", label: "Gujarati" },
                                { value: "Kannada", label: "Kannada" },
                                { value: "Malayalam", label: "Malayalam" },
                            ]}
                            onChange={(e) => setFilters({ ...filters, language: e.value })}
                            className="filter-select"
                        />
                    </div>

                    {/* Experience */}
                    <div className="filter-block">
                        <label className="filter-label">Experience</label>
                        <Select
                            value={{ label: getExperienceLabel(filters.experience), value: filters.experience }}
                            options={[
                                { value: "", label: "All Levels" },
                                { value: "0-2", label: "0–2 years" },
                                { value: "3-5", label: "3–5 years" },
                                { value: "6-10", label: "6–10 years" },
                                { value: "10+", label: "10+ years" },
                            ]}
                            onChange={(e) => setFilters({ ...filters, experience: e.value })}
                            className="filter-select"
                        />
                    </div>

                    {/* Expertise */}
                    <div className="filter-block-full">
                        <label className="filter-label">Filter by Expertise</label>
                        <Select
                            isMulti
                            value={expertiseGroupedOptions
                                .flatMap(group => group.options)
                                .filter(option => selectedExpertise.includes(option.value))}
                            onChange={(selected) => setSelectedExpertise(selected ? selected.map(s => s.value) : [])}
                            options={expertiseGroupedOptions}
                            className="expertise-multiselect"
                            placeholder="Select areas of expertise"
                            getOptionLabel={(e) => (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: e.color,
                                        borderRadius: "50%",
                                    }}></span>
                                    {e.label}
                                </div>
                            )}
                        />
                        <div className="expertise-hint">Tip: You can select multiple areas to refine your results.</div>
                    </div>

                    <div className="filter-actions">
                        <button className="apply-filters-button" onClick={applyFilters}>
                            Apply Filters
                        </button>
                        <button className="clear-filters-button" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Doctor Cards */}
                <div className="doctor-grid">
                    {isLoading ? (
                        <p className="loading-message">Finding the best experts for you. Please wait...</p>
                    ) : filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc) => (
                            <div className="doctor-card" key={doc._id}>
                                <img
                                    className="doctor-photo"
                                    src={doc.photo || "/default-doc.png"}
                                    alt={doc.Name}
                                />
                                <h2>{doc.Name}</h2>
                                <p className="role" style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>{doc.Role}</p>
                                <p className="gender" style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Gender: {doc.Gender}</p>
                                <p className="city" style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>City: {doc.City}</p>
                                <p className="qualification" style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Qualifications: {doc.Qualification.join(", ")}</p>
                                <p className="experience" style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Experience: {doc.experienceYears} year(s) {doc.experienceMonths || 0} months</p>
                                <p className="languages" style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Languages: {doc.languagesSpoken.join(", ")}</p>
                                {doc.consultsStudents && (
                                    <div className="student-checkbox" style={{ margin: "10px 0" }}>
                                        <label style={{ color: "black", fontWeight: "bold", fontSize: "14px" }}>
                                            <input
                                                type="checkbox"
                                                checked={studentBookingFlags[doc._id] || false}
                                                onChange={() => handleStudentCheckboxToggle(doc._id)}
                                                style={{ marginRight: "8px" }}
                                            />
                                            Book as Student (₹400)
                                        </label>
                                    </div>
                                )}
                                {/* <p className="expertise" style={{color:"black", fontSize:"15px", fontWeight:"bold"}}>Expertise: {doc.areaOfExpertise.join(", ")}</p> */}
                                <button
                                    className="book-button"
                                    onClick={() =>
                                        navigate(`/marketplace/${doc._id}`, {
                                            state: {
                                                isStudentBooking: studentBookingFlags[doc._id] || false
                                            }
                                        })
                                    }
                                >
                                    Book Now
                                </button>

                                {/* If this doctor is selected, show their slot calendar */}
                                {selectedDoctorId === doc._id && availableSchedules.length > 0 && (
                                    <div className="slots-section">
                                        <div className="date-selector">
                                            {availableSchedules.map((schedule, index) => (
                                                <button
                                                    key={schedule.schedule_id}
                                                    className={`date-button ${selectedDateIndex === index ? "active" : ""}`}
                                                    onClick={() => setSelectedDateIndex(index)}
                                                >
                                                    {new Date(schedule.date).toLocaleDateString("en-IN", {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short"
                                                    })}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Show slots for selected date */}
                                        {selectedDateIndex !== null && (
                                            <div className="slots-grid">
                                                {availableSchedules[selectedDateIndex].slots.map((slot, idx) => (
                                                    <button key={idx} className="slot-button">
                                                        {slot.startTime} - {slot.endTime}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No doctors match the selected filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Marketplace;