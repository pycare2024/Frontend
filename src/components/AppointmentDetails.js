import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./AppointmentDetails.css";

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [modalData, setModalData] = useState(null);
  const [patient, setPatient] = useState({});
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch patient details");
        setPatient(data.patient);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        let url = `https://backend-xhl4.onrender.com/AppointmentRoute/appointments/${id}`;
        if (selectedDate) url += `?date=${selectedDate}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error("No appointments found");
        setAppointments(data.appointments || []);
      } catch (err) {
        setError(err.message);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
    fetchAppointments();
  }, [id, selectedDate]);

  const fetchDoctorDetails = async (doctor_id) => {
    try {
      const response = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/${doctor_id}`);
      const data = await response.json();
      if (!response.ok) throw new Error("Doctor fetch failed");
      setDoctor(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = async (appointment) => {
    setModalData(appointment);
    await fetchDoctorDetails(appointment.doctor_id);
  };

  const handleDownloadPDF = (appointment) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("PsyCare Prescription", 20, 20);
    doc.setFont("helvetica", "normal");

    const details = [
      ["Appointment ID", appointment._id],
      ["Date", new Date(appointment.DateOfAppointment).toLocaleDateString()],
      ["Time", appointment.AppStartTime + " - " + appointment.AppEndTime],
      ["Status", appointment.appointment_status],
      ["Notes", appointment.notes || "No notes"],
      ["Patient", patient.Name || "Unknown"],
      ["Doctor", doctor?.Name || "Loading..."]
    ];

    doc.autoTable({ startY: 30, head: [["Field", "Details"]], body: details });
    doc.save(`Prescription_${appointment._id}.pdf`);
  };

  return (
    <div className="appointment-bg">
      <div className="appointment-glass">
        <h1 className="appointment-title">Patient Appointments</h1>

        <input
          type="date"
          className="appointment-date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="appointment-patient-info">
          <p><strong>Patient ID:</strong> {patient._id || "Loading..."}</p>
          <p><strong>Patient Name:</strong> {patient.Name || "Loading..."}</p>
        </div>

        {loading ? (
          <p className="appointment-status">Loading...</p>
        ) : error ? (
          <p className="appointment-error">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="appointment-status">No appointments found.</p>
        ) : (
          <div className="table-responsive">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app._id}>
                    <td>{new Date(app.DateOfAppointment).toLocaleDateString()}</td>
                    <td>{app.AppStartTime} - {app.AppEndTime}</td>
                    <td>{app.appointment_status}</td>
                    <td>{app.notes || "N/A"}</td>
                    <td>
                      <button className="btn" onClick={() => handleView(app)}>View</button>
                      <button className="btn" onClick={() => handleDownloadPDF(app)}>Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button className="btn back-btn" onClick={() => navigate(-1)}>← Go Back</button>

        {modalData && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Appointment Info</h2>
              <p><strong>ID:</strong> {modalData._id}</p>
              <p><strong>Doctor:</strong> {doctor?.Name || "Loading..."}</p>
              <p><strong>Date:</strong> {new Date(modalData.DateOfAppointment).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {modalData.AppStartTime} - {modalData.AppEndTime}</p>
              <p><strong>Status:</strong> {modalData.appointment_status}</p>
              <p><strong>Notes:</strong> {modalData.notes || "No notes"}</p>
              <button className="btn" onClick={() => handleDownloadPDF(modalData)}>Download</button>
              <button className="btn close-btn" onClick={() => setModalData(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentDetails;