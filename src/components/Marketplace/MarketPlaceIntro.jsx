import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaStar, FaCheckCircle } from "react-icons/fa";
import "./MarketplaceIntro.css";

function MarketPlaceIntro() {
    const navigate = useNavigate();

    return (
        <div className="marketplace-intro-wrapper">
            <motion.div
                className="marketplace-intro-glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    Welcome to PsyCare 🧠
                </motion.h1>

                <p>
                    At <strong>PsyCare</strong>, your mental well-being is our top priority. Whether you're battling anxiety,
                    stress, depression, or just seeking clarity — we're here to help with empathy, innovation, and affordability.
                </p>

                <motion.div className="highlight-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <FaGraduationCap size={24} color="#0964f8" /> <strong>New:</strong> We've introduced <strong>Student ID Verification</strong> to unlock exclusive therapy rates for students. Just upload your ID before booking.
                </motion.div>

                <h2>How It Works</h2>
                <div className="progress-container">
                    {["Explore Experts", "Apply Filters", "View Profiles", "Book a Session"].map((step, idx) => (
                        <motion.div className="progress-step" key={idx} whileHover={{ scale: 1.05 }}>
                            <div className="step-number">{idx + 1}</div>
                            <p>{step}</p>
                        </motion.div>
                    ))}
                </div>

                <h2>Why Choose PsyCare?</h2>
                <p>
                    We're one of India's most affordable and trusted mental health platforms. See for yourself:
                </p>

                <div className="price-comparison">
                    <motion.div className="price-box highlighted1" whileHover={{ scale: 1.03 }}>
                        <h3 style={{ color: "#0964f8" }}>Others</h3>
                        <p>₹1000 - ₹2000(+ 18% GST)/session</p>
                    </motion.div>
                    <motion.div className="price-box highlighted" whileHover={{ scale: 1.03 }}>
                        <h3 style={{ color: "#0964f8" }}>PsyCare</h3>
                        <p>
                            <strong>₹400 (+ 18% GST)/session</strong><br />
                            (Valid for first 100 clients per day during <em>MindIndependence</em> event: <strong>1–31 Aug</strong>)
                        </p>
                        <p>
                            <strong>₹800 (+ 18% GST)/session</strong><br />
                            (Standard pricing from <strong>1 Sep</strong> onwards)
                        </p>
                    </motion.div>
                </div>

                <h2>Our Expert Panel</h2>
                <ul className="expert-highlights">
                    <li><FaCheckCircle /> Certified Clinical Psychologists</li>
                    <li><FaCheckCircle /> Senior Psychiatrists & Therapists</li>
                    <li><FaCheckCircle /> LGBTQIA+ Affirmative Professionals</li>
                    <li><FaCheckCircle /> Trauma-Informed Care Providers</li>
                    <li><FaCheckCircle /> Experts in CBT, DBT, Mindfulness & more</li>
                </ul>

                <h2>Student Verification</h2>
                <p>
                    As a verified student, you unlock <strong>discounted therapy sessions</strong>. Just upload your valid student ID during booking.
                    Your ID is securely stored and verified by our team. It’s simple, safe, and takes under 30 seconds!
                </p>

                <div className="student-info">
                    <FaUsers size={22} color="#0964f8" />
                    <span>Already trusted by 10,000+ students across India</span>
                </div>

                <h2>Let’s Begin Your Healing Journey</h2>
                <motion.button
                    className="explore-button"
                    whileHover={{ scale: 1.08 }}
                    onClick={() => navigate("/marketplace")}
                >
                    🌿 Choose Your Expert
                </motion.button>
            </motion.div>
        </div>
    );
}

export default MarketPlaceIntro;