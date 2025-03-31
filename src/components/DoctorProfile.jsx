import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppointmentsTab from "../components/AppointmentTab";
import AccountsTab from "../components/AccountsTab";
import bg from "./DoctorDetails.jpg";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/${id}`);
        const data = await res.json();
        if (res.ok) {
          setDoctor(data);
        } else {
          console.error("Doctor not found");
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (!doctor) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading doctor profile...</p>;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      marginTop:"5%"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1000px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
      }}>
        <h1 style={{ color: "#4285F4", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
          Dr. {doctor.Name}'s Profile
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "1rem",
          columnGap: "2rem",
          marginBottom: "2rem",
          fontSize: "1rem",
          color: "#333",
        }}>
          <p><strong>Doctor ID:</strong> {doctor.id}</p>
          <p><strong>Mobile:</strong> {doctor.Mobile}</p>
          <p><strong>Age:</strong> {doctor.Age}</p>
          <p><strong>Gender:</strong> {doctor.Gender}</p>
          <p><strong>City:</strong> {doctor.City}</p>
          <p><strong>Qualification:</strong> {doctor.Qualification}</p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={() => setActiveTab("appointments")}
            style={{
              marginRight: "1rem",
              padding: "10px 24px",
              backgroundColor: activeTab === "appointments" ? "#4285F4" : "#e0e0e0",
              color: activeTab === "appointments" ? "#fff" : "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s"
            }}
          >
            View Appointments
          </button>

          <button
            onClick={() => setActiveTab("accounts")}
            style={{
              padding: "10px 24px",
              backgroundColor: activeTab === "accounts" ? "#4285F4" : "#e0e0e0",
              color: activeTab === "accounts" ? "#fff" : "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s"
            }}
          >
            View Accounts
          </button>
        </div>

        <div style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
        }}>
          {activeTab === "appointments" && <AppointmentsTab doctorId={doctor._id} />}
          {activeTab === "accounts" && <AccountsTab doctorId={doctor._id} doctorName={doctor.Name} />}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;