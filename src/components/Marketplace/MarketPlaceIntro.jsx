import React from "react";
import { useNavigate } from "react-router-dom";
import "./MarketplaceIntro.css";

function MarketPlaceIntro() {
    const navigate = useNavigate();

    return (
        <div className="marketplace-intro-wrapper">
            <div className="marketplace-intro-glass">
                <h1>Welcome to PsyCare</h1>
                <p>
                    Your journey to better mental health begins here. At <strong>PsyCare</strong>, we believe in personalized,
                    accessible, and compassionate care. Whether you're facing stress, anxiety, relationship struggles, or
                    seeking personal growth — we’re here for you.
                </p>

                <h2>How It Works</h2>
                <div className="progress-container">
                    <div className="progress-step">
                        <div className="step-number">1</div>
                        <p>Explore Experts</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-number">2</div>
                        <p>Apply Filters</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-number">3</div>
                        <p>View Profiles</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-number">4</div>
                        <p>Book a Session</p>
                    </div>
                </div>

                <h2>Why Choose PsyCare?</h2>
                <p>We’re one of India’s most affordable and reliable mental health platforms.</p>
                <div className="price-comparison">
                    <div className="price-box highlighted1">
                        <h3>Others</h3>
                        <p>₹1000 - ₹2000/session</p>
                    </div>
                    <div className="price-box highlighted">
                        <h3>PsyCare</h3>
                        <p><strong>From ₹400/session<br/>(For Students)</strong></p>
                        <p><strong>From ₹800/session<br/>(For Others)</strong></p>
                    </div>
                </div>

                <h2>Meet Our Experts</h2>
                <p>
                    Our diverse team includes passionate young minds and seasoned professionals across therapy disciplines.
                </p>
                <ul className="expert-highlights">
                    <li>✔ Certified Clinical Psychologists</li>
                    <li>✔ Experienced Counsellors & Therapists</li>
                    <li>✔ Senior Psychiatrists</li>
                    <li>✔ LGBTQIA+ Affirmative & Trauma-Informed Professionals</li>
                    <li>✔ Trained in CBT, DBT, Mindfulness & more</li>
                </ul>

                <h2>Start Your Journey</h2>
                <p>
                    Select your ideal therapist and begin your healing process today.
                </p>
                <button className="explore-button" onClick={() => navigate("/marketplace")}>
                    Choose Your Expert
                </button>
            </div>
        </div>
    );
}

export default MarketPlaceIntro;