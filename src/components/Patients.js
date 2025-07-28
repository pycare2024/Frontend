// File: Patients.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaSearch } from "react-icons/fa";
import "./Patients.css";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("https://backend-xhl4.onrender.com/PatientRoute");
                if (!response.ok) {
                    throw new Error("Failed to fetch patients");
                }
                const data = await response.json();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        const filtered = patients.filter((patient) =>
            patient.Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [searchQuery, patients]);

    const handleRedirect = (id) => {
        navigate(`/PatientInfo/${id}`);
    };

    return (
        <div className="patients-main-container">
            <div className="patients-container">
            <h1 className="page-title">Clients List</h1>

            <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search patients by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading && <p className="info-text loading">Loading...</p>}
            {error && <p className="info-text error">Error: {error}</p>}

            <div className="patients-list">
                {filteredPatients.map((patient) => (
                    <div key={patient._id} className="patient-card">
                        <div className="patient-content">
                            <FaUser className="patient-icon" />
                            <div className="patient-info">
                                <h4>{patient.Name}</h4>
                                <p>{patient.Gender}, {patient.Age} years</p>
                            </div>
                            <button
                                className="view-button"
                                onClick={() => handleRedirect(patient._id)}
                            >
                                <FaEye className="eye-icon" /> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div></div>
    );
}

export default Patients;