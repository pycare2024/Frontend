import React, { useEffect, useState } from "react";

const AppointmentsTab = ({ doctorId }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both from and to dates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/doctor-appointments-range?doctorId=${doctorId}&from=${fromDate}&to=${toDate}`);
      const data = await res.json();
      if (res.ok) {
        setAppointments(data);
      } else {
        setError(data.message || "Failed to fetch appointments");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
      <h3 style={{ color: "#333" }}>Appointment Stats</h3>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          onClick={fetchAppointments}
          style={{ backgroundColor: "#4285F4", color: "white", padding: "10px 16px", border: "none", borderRadius: "6px" }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div>
          <p><strong>Total Appointments:</strong> {appointments.length}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {appointments.map((appt) => (
              <div key={appt._id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "#fff", width: "300px" }}>
                <p><strong>Patient:</strong> {appt.patientName}</p>
                <p><strong>Date:</strong> {new Date(appt.DateOfAppointment).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appt.AppStartTime}</p>
                <p><strong>Status:</strong> {appt.payment_status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;
