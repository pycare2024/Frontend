import React, { useState } from "react";
import "./Landing.css";
import { CalendarDays, Video } from "lucide-react";
import surabhi from "./drghosh.jpeg";
import shatakshi from "./Shatakshi.jpg";
import saachi from "./saachi.png";
import shilpa from "./shilpa.jpeg";

const experts = [
  { label: "Therapist", icon: "💬" },
  { label: "Psychiatrist", icon: "🩺" },
];

const expertDetails = [
  {
    name: "Dr. Surabhi Ghosh",
    experience: "7+ years",
    price: "₹1700",
    duration: "50 mins",
    expertise: ["Anxiety disorders", "Depressive disorders"],
    speaks: ["English", "Hindi"],
    slot: "Today, 02:00 PM",
    image: surabhi,
  },
  {
    name: "Shatakshi Goyal",
    experience: "3+ years",
    price: "₹1700",
    duration: "50 mins",
    expertise: ["Anxiety disorders", "Depressive disorders"],
    speaks: ["English", "Hindi"],
    slot: "Today, 12:30 PM",
    image: shatakshi,
  },
  {
    name: "Saachi Arora",
    experience: "5+ years",
    price: "₹2000",
    duration: "60 mins",
    expertise: ["Relationship issues", "Work stress"],
    speaks: ["English"],
    slot: "Today, 03:45 PM",
    image: saachi,
  },
  {
    name: "Shilpa Soni",
    experience: "3+ years",
    price: "₹2000",
    duration: "60 mins",
    expertise: ["Relationship issues", "Work stress","Anxiety"],
    speaks: ["English","Hindi","Punjabi"],
    slot: "Today, 03:45 PM",
    image: shilpa,
  },
];

const Landing = () => {
  const [selected, setSelected] = useState("Therapist");

  return (
    <div className="expert-container">
      <div className="head">
        <div className="heading">
          <h2 className="expert-heading">Meet Our Experts</h2>
          <div className="underline"></div>
        </div>
        <div className="expert-buttons">
          {experts.map((expert) => (
            <button
              key={expert.label}
              className={`expert-btn ${selected === expert.label ? "selected" : ""}`}
              onClick={() => setSelected(expert.label)}
            >
              <span className="icon">{expert.icon}</span>
              {expert.label}
            </button>
          ))}
        </div>
      </div>
      <div className="body">
        <div className="expert-cards-container">
          {expertDetails.map((exp, index) => (
            <div className="expert-card" key={index}>
              <div className="expert-card-header">
                <img src={exp.image} alt={exp.name} className="expert-image"/>
              </div>
              <div className="expert-card-body">
                <h3 className="expert-name">{exp.name}</h3>
                <p className="expert-experience">{exp.experience} of experience</p>
                <div className="expert-tags">
                  {exp.expertise.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
                <p className="expert-speaks">
                  Speaks: <span>{exp.speaks.join(", ")}</span>
                </p>
              </div>
              <div className="expert-card-footer">
                {/* <button className="book-btn">Book Now</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;