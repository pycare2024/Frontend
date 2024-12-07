import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaRegEye, FaTimesCircle, FaCheckCircle, FaEye } from 'react-icons/fa';

function PatientInfo() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        DOV: "",
        diagnosis: "",
        prescription: "",
        notes: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch patient info");
                }
                const data = await response.json();
                setPatient(data.patient);
                setRecords(data.records);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientInfo();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleViewPrescription = (id) => {
        navigate(`/Prescription/${id}`);
    };

    const verifyPrescription = async (recordId, doctorId) => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/verifyPrescription/${recordId}`, {
                method: "PATCH",
            });
            const result = await response.json();
    
            if (response.ok) {
                setRecords(records.map(record =>
                    record._id === recordId ? { ...record, signed: result.signed } : record
                ));
                setSuccessMessage("Prescription has been successfully verified!");
            } else {
                // If the message indicates the doctor is not allowed to verify
                if (result.message.includes("belongs to another doctor")) {
                    alert(result.message); // Show an alert pop-up
                } else {
                    setError(result.message || "Failed to verify prescription");
                }
            }
    
            setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
        } catch (error) {
            setError("Failed to verify prescription");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/${id}/addRecord`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, patient_id: id }),
            });
            if (!response.ok) {
                throw new Error("Failed to add patient record");
            }
            const newRecord = await response.json();
            setRecords([...records, newRecord]);
            setShowForm(false);
            setSuccessMessage("Record added successfully!");
            setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p style={{ textAlign: "center", color: "#007bff" }}>Loading...</p>;
    if (error) return <p style={{ textAlign: "center", color: "#ff4d4f" }}>Error: {error}</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto", fontFamily: 'Arial, sans-serif' }}>
            {successMessage && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    fontWeight: "bold",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <FaCheckCircle />
                    {successMessage}
                </div>
            )}

            <h1 style={{ textAlign: "center", color: "#FF8096", marginBottom: "20px", fontSize: "2em", fontWeight: "bold" ,marginTop:"10%"}}>Patient Information</h1>
            {patient ? (
                <div>
                    <table className="table table-striped table-bordered" style={{
                        marginBottom: "30px", width: "100%", borderCollapse: "collapse", fontSize: "1.1em"
                    }}>
                        <tbody>
                            {['Name', 'Age', 'Gender', 'Location', 'Mobile', 'Problem'].map((field, index) => (
                                <tr key={index} style={{ backgroundColor: "#f8f9fa" }}>
                                    <th style={{ width: "30%", padding: "12px" }}>{field}</th>
                                    <td style={{ padding: "12px" }}>{patient[field]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        onClick={() => navigate(`/PatientInfo/${id}/screeningTests`)}
                        style={styles.buttonPrimary}
                    >
                        <FaRegEye style={{ marginRight: '8px' }} /> View Screening Test Details
                    </button>

                    <h2 style={{ color: "#FF8096", marginBottom: "20px", marginTop: "30px", textAlign: "center", fontSize: "30px",textDecoration:"bold" }}>Patient Records</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        style={styles.buttonSuccess}
                    >
                        <FaPlusCircle style={{ marginRight: '8px' }} /> Add Record
                    </button>

                    {records.length > 0 ? (
                        <table className="table table-hover table-bordered" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
                            <thead className="table-primary">
                                <tr>
                                    <th style={{ width: "20%" }}>Date of Visit</th>
                                    <th>Diagnosis</th>
                                    <th>Prescription</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record) => (
                                    <tr key={record._id}>
                                        <td>{new Date(record.DOV).toLocaleDateString()}</td>
                                        <td>{record.diagnosis}</td>
                                        <td>
                                            <button
                                                onClick={() => handleViewPrescription(record._id)}
                                                style={styles.viewButton}
                                            >
                                                <FaEye /> View
                                            </button>
                                            {record.signed ? (
                                                <span style={{ color: "green", marginTop: "20px" }}>Prescription Verified</span>
                                            ) : (
                                                <button
                                                    onClick={() => verifyPrescription(record._id)}
                                                    style={styles.verifyButton}
                                                >
                                                    <FaCheckCircle /> Verify
                                                </button>
                                            )}
                                        </td>
                                        <td>{record.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ color: "#6c757d" }}>No visit records found.</p>
                    )}

                    {showForm && (
                        <div style={styles.formContainer}>
                            <h3>Add New Record</h3>
                            <form onSubmit={handleSubmit}>
                                {['DOV', 'diagnosis', 'prescription', 'notes'].map((field, index) => (
                                    <div key={index} style={styles.inputGroup}>
                                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                        {field === 'notes' ? (
                                            <textarea
                                                name={field}
                                                onChange={handleInputChange}
                                                required
                                                style={styles.textarea}
                                            />
                                        ) : (
                                            <input
                                                type={field === 'DOV' ? 'date' : 'text'}
                                                name={field}
                                                onChange={handleInputChange}
                                                required
                                                style={styles.input}
                                            />
                                        )}
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" style={styles.buttonPrimary}>
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        style={styles.buttonDanger}
                                    >
                                        <FaTimesCircle style={{ marginRight: '8px' }} /> Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <p style={{ color: "#6c757d" }}>No patient found.</p>
            )}
        </div>
    );
}

const styles = {
    buttonPrimary: {
        padding: "10px 20px",
        backgroundColor: "#FF8096",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
    },
    buttonSuccess: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: "20px",
        display: 'flex',
        alignItems: 'center',
    },
    viewButton: {
        padding: "5px 15px",
        backgroundColor: "#17a2b8",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        marginRight: "10px", // Added margin to create space between buttons
    },
    verifyButton: {
        padding: "5px 15px",
        backgroundColor: "#ffc107",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        marginTop: "10px"
    },
    buttonDanger: {
        padding: "10px 20px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
    },
    formContainer: {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginTop: "20px",
        backgroundColor: "#f8f9fa",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ddd",
    },
    textarea: {
        width: "100%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        height: "80px",
    },
};

export default PatientInfo;