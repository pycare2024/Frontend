import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaRegEye, FaTimesCircle, FaCheckCircle, FaEye } from 'react-icons/fa';
import "./PatientInfo.css";

function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ DOV: "", diagnosis: "", prescription: "", notes: "" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/${id}`);
        if (!response.ok) throw new Error("Failed to fetch patient info");
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

  const handleViewPrescription = (id) => navigate(`/Prescription/${id}`);

  const verifyPrescription = async (recordId) => {
    try {
      const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/verifyPrescription/${recordId}`, { method: "PATCH" });
      const result = await response.json();
      if (response.ok) {
        setRecords(records.map(record => record._id === recordId ? { ...record, signed: result.signed } : record));
        setSuccessMessage("Prescription has been successfully verified!");
      } else {
        if (result.message.includes("belongs to another doctor")) {
          alert(result.message);
        } else {
          setError(result.message || "Failed to verify prescription");
        }
      }
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to verify prescription");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/${id}/addRecord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, patient_id: id })
      });
      if (!response.ok) throw new Error("Failed to add patient record");
      const newRecord = await response.json();
      setRecords([...records, newRecord]);
      setShowForm(false);
      setSuccessMessage("Record added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center", color: "#007bff" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#ff4d4f" }}>Error: {error}</p>;

  return (
    <div className="patient-info-container">
      {successMessage && (
        <div className="success-toast">
          <FaCheckCircle />
          {successMessage}
        </div>
      )}

      <h1 className="text-center" style={{ color: "#4285F4", marginBottom: "30px", fontSize: "2.5rem",fontWeight:"bold" }}>Patient Information</h1>
      {patient ? (
        <>
          <div className="patient-info-card">
            <table>
              <tbody>
                {['Name', 'Age', 'Gender', 'Location', 'Mobile', 'Problem'].map((field, index) => (
                  <tr key={index}>
                    <th>{field}</th>
                    <td>{patient[field]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button onClick={() => navigate(`/PatientInfo/${id}/screeningTests`)} className="btn btn-primary">
              <FaRegEye /> View Screening Test Details
            </button>
            <button onClick={() => navigate(`/PatientInfo/${id}/AppointmentDetails`)} className="btn btn-primary">
              <FaRegEye /> Show Appointment Details
            </button>
          </div>

          <h2 style={{ color: "#4285F4", marginTop: "120px", textAlign: "center",fontSize: "2rem",fontWeight:"bold" }}>Patient Records</h2>
          <button onClick={() => setShowForm(true)} className="btn btn-success" style={{ marginBottom: "20px" }}>
            <FaPlusCircle /> Add Record
          </button>

          {records.length > 0 ? (
            <table className="records-table">
              <thead>
                <tr>
                  <th>Date of Visit</th>
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
                      <button onClick={() => handleViewPrescription(record._id)} className="btn btn-primary">
                        <FaEye /> View
                      </button>
                      {record.signed ? (
                        <span style={{ color: "green", marginLeft: "10px" }}>Verified</span>
                      ) : (
                        <button onClick={() => verifyPrescription(record._id)} className="btn btn-warning" style={{ marginLeft: "10px" }}>
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
            <div className="record-form">
              <h3>Add New Record</h3>
              <form onSubmit={handleSubmit}>
                {['DOV', 'diagnosis', 'prescription', 'notes'].map((field, index) => (
                  <div key={index}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    {field === 'notes' ? (
                      <textarea name={field} onChange={handleInputChange} required />
                    ) : (
                      <input type={field === 'DOV' ? 'date' : 'text'} name={field} onChange={handleInputChange} required />
                    )}
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-danger">
                    <FaTimesCircle /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <p style={{ color: "#6c757d" }}>No patient found.</p>
      )}
    </div>
  );
}

export default PatientInfo;