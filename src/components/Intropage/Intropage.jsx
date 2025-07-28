import React from "react";
import { useNavigate } from "react-router-dom";
import "./Intropage.css";
import corporateImg from "../Intropage/corporate.jpg";
import marketplaceImg from "../Intropage/marketplace.jpg";
import studentImg from "../Intropage/student.jpg";

function Intropage() {
  const navigate = useNavigate();

  return (
    <div className="intro-wrapper">
      <div className="intro-glass">
        <h1 className="intro-heading">Welcome to PsyCare</h1>
        <p className="intro-subheading">
          Tailored mental health support for Corporates, Individuals & Students.
        </p>

        <div className="workflow-container">
          <div className="workflow-card">
            <img src={corporateImg} alt="Corporate Mental Health" />
            <h2>Corporate Wellness</h2>
            <p>
              We partner with companies to provide therapy access for employees and families. Corporate codes enable direct access and no payments.
            </p>
            <button onClick={() => navigate("/CorporateBooking")} className="workflow-btn">
              Explore Corporate
            </button>
          </div>

          <div className="workflow-card">
            <img src={marketplaceImg} alt="Marketplace" />
            <h2>Therapy Marketplace</h2>
            <p>
              Discover therapists, psychologists, and psychiatrists. Book sessions directly from our curated pool of licensed professionals.
            </p>
            <button onClick={() => navigate("/marketplacemain")} className="workflow-btn">
              Browse Therapists
            </button>
          </div>

          <div className="workflow-card">
            <img src={studentImg} alt="Student Support" />
            <h2>Student Support</h2>
            <p>
              Through school partnerships, we provide confidential counseling services and group therapy tailored to young minds.
            </p>
            <button className="workflow-btn" disabled>
              Coming soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intropage;