import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaSearch } from "react-icons/fa";

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
                setFilteredPatients(data); // Initialize filtered list with all patients
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        const filtered = patients.filter(patient => 
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
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto", height: "100%"}}>
            <h1 style={{ textAlign: "center", color: "#FF8096", marginBottom: "20px", marginTop: "10%" }}>Patients List</h1>
            
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
            
            <div className="row" style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignContent: "center" }}>
                {filteredPatients.map((patient) => (
                    <div key={patient._id} className="col-md-4" style={{ flex: "1 1 30%", maxWidth: "30%" }}>
                        <div
                            className="card"
                            style={{
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                transition: "transform 0.3s ease",
                                backgroundColor: "#f8f9fa",
                            }}
                        >
                            <div
                                className="card-body"
                                style={{
                                    padding: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <FaUser style={{ fontSize: "3rem", color: "#FF8096", marginBottom: "15px" }} />
                                <h4 style={{ marginBottom: "10px", color: "#333" }}>{patient.Name}</h4>
                                <p style={{ color: "black", marginBottom: "15px" }}>
                                    {patient.Gender}, {patient.Age} years
                                </p>
                                <button
                                    onClick={() => handleRedirect(patient._id)}
                                    className="btn btn-info"
                                    style={{
                                        backgroundColor: "#FF8096",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "10px 15px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                    }}
                                >
                                    <FaEye style={{ marginRight: "5px" }} /> View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Patients;