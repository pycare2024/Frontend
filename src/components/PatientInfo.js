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
  const [showGAFModal, setShowGAFModal] = useState(false);
  const [gafScore, setGafScore] = useState("");
  const [description, setDescription] = useState("");

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

  const getGAFDescription = (score) => {
    if (score >= 91) return "Superior functioning in a wide range of activities, life’s problems never seem to get out of hand, is sought out by others because of his or her many positive qualities. No symptoms.";
    if (score >= 81) return "Absent or minimal symptoms (e.g., mild anxiety before an exam), good functioning in all areas, interested and involved in a wide range of activities. socially effective, generally satisfied with life, no more than everyday problems or concerns (e.g. an occasional argument with family members).";
    if (score >= 71) return "If symptoms are present, they are transient and expectable reactions to psychosocial stressors (e.g., difficulty concentrating after family argument); no more than slight impairment in social, occupational or school functioning (e.g., temporarily failing behind in schoolwork).";
    if (score >= 61) return "Some mild symptoms (e.g. depressed mood and mild insomnia) OR some difficulty in social, occupational, or school functioning (e.g., occasional truancy, or theft within the household), but generally functioning pretty well, has some meaningful interpersonal relationships.";
    if (score >= 51) return "Moderate symptoms (e.g., flat affect and circumstantial speech, occasional panic attacks) OR moderate difficulty in social, occupational, or school functioning (e.g.. few friends, conflicts with peers or co-workers).";
    if (score >= 41) return "Serious symptoms (e.g.. suicidal ideation, severe obsessional rituals, frequent shoplifting) OR any serious impairment in social, occupational, or school functioning (e.g., no friends, unable to keep a job).";
    if (score >= 31) return "Some impairment in reality testing or communication (e.g., speech is at times illogical, obscure, or irrelevant) OR major impairment in several areas, such as work or school, family relations, judgment, thinking, or mood (e.g., depressed man avoids friends, neglects family, and is unable to work; child frequently beats up younger children, is defiant at home, and is failing at school).";
    if (score >= 21) return "Behavior is considerably influenced by delusions or hallucinations OR serious impairment in communication or judgment (e.g., sometimes incoherent, acts grossly inappropriately, suicidal preoccupation) OR inability to function in almost all areas (e.g., stays in bed all day; no job, home, or friends).";
    if (score >= 11) return "Some danger of hurting self or others (e.g., suicide attempts without clear expectation of death; frequently violent; manic excitement) OR occasionally fails to maintain minimal personal hygiene (e.g., smears feces) OR gross impairment in communication (e.g., largely incoherent or mute).";
    if (score >= 1) return "Persistent danger of severely hurting self or others (e.g., recurrent violence) OR persistent inability to maintain minimal personal hygieneOR serious suicidal act with clear expectation of death.";
    return "Inadequate information.";
  };

  const gafDescriptions = [
    { range: "91-100", text: "Superior functioning in a wide range of activities, life’s problems never seem to get out of hand, is sought out by others because of his or her many positive qualities. No symptoms." },
    { range: "81-90", text: "Absent or minimal symptoms (e.g., mild anxiety before an exam), good functioning in all areas, interested and involved in a wide range of activities. socially effective, generally satisfied with life, no more than everyday problems or concerns (e.g. an occasional argument with family members)." },
    { range: "71-80", text: "If symptoms are present, they are transient and expectable reactions to psychosocial stressors (e.g., difficulty concentrating after family argument); no more than slight impairment in social, occupational or school functioning (e.g., temporarily failing behind in schoolwork)." },
    { range: "61-70", text: "Some mild symptoms (e.g. depressed mood and mild insomnia) OR some difficulty in social, occupational, or school functioning (e.g., occasional truancy, or theft within the household), but generally functioning pretty well, has some meaningful interpersonal relationships." },
    { range: "51-60", text: "Moderate symptoms (e.g., flat affect and circumstantial speech, occasional panic attacks) OR moderate difficulty in social, occupational, or school functioning (e.g.. few friends, conflicts with peers or co-workers)." },
    { range: "41-50", text: "Serious symptoms (e.g.. suicidal ideation, severe obsessional rituals, frequent shoplifting) OR any serious impairment in social, occupational, or school functioning (e.g., no friends, unable to keep a job)." },
    { range: "31-40", text: "Some impairment in reality testing or communication (e.g., speech is at times illogical, obscure, or irrelevant) OR major impairment in several areas, such as work or school, family relations, judgment, thinking, or mood (e.g., depressed man avoids friends, neglects family, and is unable to work; child frequently beats up younger children, is defiant at home, and is failing at school)." },
    { range: "21-30", text: "Behavior is considerably influenced by delusions or hallucinations OR serious impairment in communication or judgment (e.g., sometimes incoherent, acts grossly inappropriately, suicidal preoccupation) OR inability to function in almost all areas (e.g., stays in bed all day; no job, home, or friends)." },
    { range: "11-20", text: "Some danger of hurting self or others (e.g., suicide attempts without clear expectation of death; frequently violent; manic excitement) OR occasionally fails to maintain minimal personal hygiene (e.g., smears feces) OR gross impairment in communication (e.g., largely incoherent or mute)." },
    { range: "1-10", text: "Persistent danger of severely hurting self or others (e.g., recurrent violence) OR persistent inability to maintain minimal personal hygieneOR serious suicidal act with clear expectation of death." },
  ];

  const handleSubmitGAF = async () => {
    const payload = {
      patientId: patient._id,
      patientName: patient.Name,
      gafScore,
      description,
      date: new Date(),
    };

    await fetch('https://backend-xhl4.onrender.com/FeedbackRoute/submit-gaf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setShowGAFModal(false);
    alert("✅ GAF Feedback Submitted Successfully");
  };

  const openGAFModal = () => {
    setGafScore("");
    setDescription("");
    setShowGAFModal(true);
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

      <h1 className="text-center" style={{ color: "#4285F4", marginBottom: "30px", fontSize: "2.5rem"}}>Client Information</h1>
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
            <button
              className="btn btn-primary"
              onClick={openGAFModal}
            >
              Give GAF Feedback
            </button>
          </div>

          {/* <h2 style={{ color: "#4285F4", marginTop: "120px", textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>Patient Records</h2>
          <button onClick={() => setShowForm(true)} className="btn btn-success" style={{ marginBottom: "20px" }}>
            <FaPlusCircle /> Add Record
          </button> */}

          {showGAFModal && (
            <div className="gaf-modal-overlay">
              <div className="gaf-modal-container">
                <h2>Global Assessment of Functioning</h2>

                <label>Patient Name:</label>
                <input value={patient.Name} readOnly />

                <label className="mt-3">Patient ID:</label>
                <input value={patient._id} readOnly />

                <label className="mt-3">GAF Score (0–100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gafScore}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setGafScore(val);
                    setDescription(getGAFDescription(val));
                  }}
                />

                <label className="mt-6">Descriptions Reference:</label>
                <div className="description-reference">
                  {gafDescriptions.map(({ range, text }) => (
                    <div key={range}>
                      <strong>{range}:</strong> <span>{text}</span>
                    </div>
                  ))}
                </div>

                <label className="mt-6">Current Description:</label>
                <div className="current-description">
                  {description || "Enter a GAF score to see the description."}
                </div>

                <div className="button-row">
                  <button onClick={() => setShowGAFModal(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handleSubmitGAF} className="submit-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {records.length > 0 ? (
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
          )} */}
        </>
      ) : (
        <p style={{ color: "#6c757d" }}>No patient found.</p>
      )}
    </div>
  );
}

export default PatientInfo;