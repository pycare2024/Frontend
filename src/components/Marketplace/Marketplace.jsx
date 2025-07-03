import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./Marketplace.css";

function Marketplace() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [filters, setFilters] = useState({ gender: "", role: "", language: "" });
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [availableSchedules, setAvailableSchedules] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedExpertise, setSelectedExpertise] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredDoctors(doctors); // Show all by default
    }, [doctors]);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get("https://backend-xhl4.onrender.com/DoctorRoute/marketplacedoctors");
            setDoctors(res.data || []);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        }
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

        setFilteredDoctors(filtered);
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

    const expertiseOptions = [
        { value: "Child Psychology ( 6-12 years)", label: "Child Psychology (6–12 yrs)" },
        { value: "Adolescent / Teen Psychology (13–18 yrs)", label: "Teen Psychology (13–18 yrs)" },
        { value: "Young Adults (18–25 yrs)", label: "Young Adults (18–25 yrs)" },
        { value: "Adults (25–45 yrs)", label: "Adults (25–45 yrs)" },
        { value: "Geriatric Psychology (45+ yrs)", label: "Geriatric Psychology (45+ yrs)" },
        { value: "Couples & Relationship Therapy", label: "Couples Therapy" },
        { value: "Family Therapy", label: "Family Therapy" },
        { value: "LGBTQIA+ Affirmative Therapy", label: "LGBTQIA+ Therapy" },
        { value: "Parental Counselling", label: "Parental Counselling" },
        { value: "Student Academic Stress Support", label: "Academic Stress" },
        { value: "Corporate / Employee Wellness, Anxiety Disorders", label: "Corporate Wellness" },
        { value: "Depression", label: "Depression" },
        { value: "Obsessive Compulsive Disorder (OCD)", label: "OCD" },
        { value: "Panic Disorders", label: "Panic Disorders" },
        { value: "Phobias", label: "Phobias" },
        { value: "Post-Traumatic Stress Disorder (PTSD)", label: "PTSD" },
        { value: "Attention Deficit Hyperactivity Disorder (ADHD)", label: "ADHD" },
        { value: "Autism Spectrum Disorders (ASD)", label: "ASD" },
        { value: "Eating Disorders", label: "Eating Disorders" },
        { value: "Grief & Loss", label: "Grief & Loss" },
        { value: "Sleep Disorders", label: "Sleep Disorders" },
        { value: "Cognitive Behavioural Therapy (CBT)", label: "CBT" },
        { value: "Rational Emotive Behaviour Therapy (REBT)", label: "REBT" },
        { value: "Dialectical Behaviour Therapy (DBT)", label: "DBT" },
        { value: "Mindfulness-Based Interventions", label: "Mindfulness" },
        { value: "Trauma-Informed Therapy", label: "Trauma-Informed" },
        { value: "Narrative Therapy", label: "Narrative Therapy" },
        { value: "Art-Based Therapy", label: "Art Therapy" },
        { value: "Play Therapy", label: "Play Therapy" },
        { value: "Behaviour Modification", label: "Behaviour Modification" },
        { value: "Hypnotherapy", label: "Hypnotherapy" },
        { value: "Career Counselling & Guidance", label: "Career Counselling" },
        { value: "Psychometric Testing & Interpretation", label: "Psychometric Testing" },
    ];

    return (
        <div className="marketplace-wrapper">
            <div className="marketplace-glass">
                <div className="marketplace-header">
                    <h1>Meet Our Experts</h1>
                    <p>Choose your own doctor and begin your healing journey today.</p>
                </div>

                {/* Filters */}
                <div className="marketplace-filters">
                    <select onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <select onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
                        <option value="">All Roles</option>
                        <option value="Therapist">Therapist</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                    </select>

                    <select onChange={(e) => setFilters({ ...filters, language: e.target.value })}>
                        <option value="">All Languages</option>
                        {Array.from(new Set(doctors.flatMap(doc => doc.languagesSpoken))).map((lang, idx) => (
                            <option key={idx} value={lang}>{lang}</option>
                        ))}
                    </select>

                    <Select
                        isMulti
                        options={expertiseOptions}
                        placeholder="Filter by Expertise"
                        className="expertise-filter"
                        onChange={(selected) => setSelectedExpertise(selected.map(s => s.value))}
                    />

                    <button className="apply-filters-button" onClick={applyFilters}>
                        Apply Filters
                    </button>
                </div>

                {/* Doctor Cards */}
                <div className="doctor-grid">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc) => (
                            <div className="doctor-card" key={doc._id}>
                                <img
                                    className="doctor-photo"
                                    src={doc.photo || "/default-doc.png"}
                                    alt={doc.Name}
                                />
                                <h2>{doc.Name}</h2>
                                <p className="role" style={{color:"white"}}>{doc.Role}</p>
                                <p className="gender" style={{color:"white"}}>Gender: {doc.Gender}</p>
                                <p className="city" style={{color:"white"}}>City: {doc.City}</p>
                                <p className="qualification" style={{color:"white"}}>Qualifications: {doc.Qualification.join(", ")}</p>
                                <p className="experience" style={{color:"white"}}>Experience: {doc.experienceYears} yrs {doc.experienceMonths || 0} mos</p>
                                <p className="languages" style={{color:"white"}}>Languages: {doc.languagesSpoken.join(", ")}</p>
                                <p className="expertise" style={{color:"white"}}>Expertise: {doc.areaOfExpertise.join(", ")}</p>
                                <button className="book-button" onClick={() => navigate(`/marketplace/${doc._id}`)}>
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