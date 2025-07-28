import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css"; // ensure glassmorphism styles are defined here
import bgImage from "./bookappointment.jpg";

const BookAppointment = () => {
  const navigate = useNavigate();

  return (
    <div className="book-landing-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="glass-card">
        <h1>Book Your Appointment</h1>
        <div className="glass-buttons">
          <button className="glass-btn" onClick={() => navigate("/CorporateBooking")}>
            <strong>Corporate Partner</strong><br />
            <span>I’m part of a company partnered with PsyCare</span>
          </button>

          <button className="glass-btn" onClick={() => navigate("/marketplacemain")}>
            <strong>Personal Care</strong><br />
            <span>I’m signing up for myself or family</span>
          </button>

          <button className="glass-btn disabled" disabled>
            <strong>School Program</strong><br />
            <span>Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;