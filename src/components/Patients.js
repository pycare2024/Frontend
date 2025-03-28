import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaSearch } from "react-icons/fa";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoverState, setHoverState] = useState({}); // Stores hover states for each card
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

    if (loading) return <p style={{ textAlign: "center", fontSize: "20px", color: "#007bff" }}>Loading...</p>;
    if (error) return <p style={{ textAlign: "center", color: "#ff4d4f" }}>Error: {error}</p>;

    const handleRedirect = (id) => {
        navigate(`/PatientInfo/${id}`);
    };

    return (
        <div style={{ padding: "20px", margin: "auto", height: "100%",backgroundColor:"white" }}>
            <h1 style={{ textAlign: "center", color: "#4285F4", marginBottom: "20px", marginTop: "10%",fontWeight:"bold" }}>Patients List</h1>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <FaSearch style={{ position: "relative", left: "30px", color: "#888" }} />
                <input
                    type="text"
                    placeholder="Search patients by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "80%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                        textIndent: "20px"
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {filteredPatients.map((patient) => {
                    const isHovered = hoverState[patient._id] || false; // Default to false

                    return (
                        <div
                            key={patient._id}
                            className="card"
                            style={{
                                width: "100%",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: isHovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "0 4px 8px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease",
                                backgroundColor: isHovered ? "white" : "#f8f9fa",
                                padding: isHovered ? "20px" : "15px",
                            }}
                            onMouseEnter={() => setHoverState((prev) => ({ ...prev, [patient._id]: true }))}
                            onMouseLeave={() => setHoverState((prev) => ({ ...prev, [patient._id]: false }))}
                        >
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    transform: isHovered ? "translateY(2px)" : "translateY(0)",
                                    borderRadius: isHovered ? "10px" : "8px",
                                    zIndex: isHovered ? 10 : 1,
                                    fontSize: isHovered ? "20px" : "16px",
                                    color: isHovered ? "#FF8096" : "black",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Icon */}
                                <FaUser
                                    style={{
                                        fontSize: "3rem",
                                        color: "#4285F4",
                                        marginRight: "20px",
                                    }}
                                />

                                {/* Patient Info */}
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ marginBottom: "5px", color: "#333" }}>{patient.Name}</h4>
                                    <p style={{ color: "black", marginBottom: "10px" }}>
                                        {patient.Gender}, {patient.Age} years
                                    </p>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => handleRedirect(patient._id)}
                                    className="btn btn-info"
                                    style={{
                                        backgroundColor: "#4285F4",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "10px 15px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <FaEye style={{ marginRight: "5px" }} /> View Details
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Patients;