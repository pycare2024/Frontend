import React, { useState } from "react";
import aboutImage from './about.jpg'; // Replace with the path to your image
import "./FAQ.css"; // Add CSS for FAQ functionality

function About() {
    const [faqVisible, setFaqVisible] = useState(false);

    const pageStyle = {
        backgroundImage: `url(${aboutImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        margin: 0,
        position: "relative",
        overflow: "hidden",
    };

    const overlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    };

    const contentWrapperStyle = {
        position: "relative",
        zIndex: 2,
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        lineHeight: "1.5",
    };

    const headingStyle = {
        fontSize: "3rem",
        marginBottom: "20px",
        textTransform: "uppercase",
        fontWeight: "bold",
    };

    const sectionStyle = {
        marginTop: "30px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        color: "#333",
        textAlign: "left",
    };

    const subHeadingStyle = {
        fontSize: "1.8rem",
        marginBottom: "15px",
        color: "#444",
        borderBottom: "2px solid #444",
        paddingBottom: "5px",
    };

    const paragraphStyle = {
        fontSize: "1.2rem",
        lineHeight: "1.6",
    };

    const toggleFAQ = () => setFaqVisible(!faqVisible);

    return (
        <div style={pageStyle}>
            <div style={overlayStyle}></div>
            <div style={contentWrapperStyle}>
                <h1 style={headingStyle}>About Us</h1>

                <div style={sectionStyle}>
                    <h2 style={subHeadingStyle}>Our Mission</h2>
                    <p style={paragraphStyle}>
                        "To reduce the global impact of mental health disorders by providing 
                        accessible support, raising awareness, and fostering a connected community."
                    </p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={subHeadingStyle}>Our Vision</h2>
                    <p style={paragraphStyle}>
                        "To cultivate a world where mental well-being is a universal right, free from stigma, 
                        and mental health resources are accessible to all."
                    </p>
                </div>
            </div>

            {/* Draggable FAQ Button */}
            <button
                className="draggable-faq-button"
                onClick={toggleFAQ}
                style={{ zIndex: 10 }}
            >
                FAQ's
            </button>

            {/* FAQ Modal */}
            {faqVisible && (
                <div className="faq-modal-overlay" onClick={toggleFAQ}>
                    <div
                        className="faq-modal"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <h2>FAQ's</h2>
                        <button className="close-faq" onClick={toggleFAQ}>
                            ✖
                        </button>
                        <div className="faq-content">
                            <ul>
                                <li>
                                    <strong>Who are we?</strong>
                                    <p>
                                        "We're a social startup working to make mental healthcare accessible to everyone, regardless of their socioeconomic status."
                                    </p>
                                </li>
                                <li>
                                    <strong>What is our raison d’etre?</strong>
                                    <p>
                                        "We intend to make mental health a right for every individual, take away the stigma associated with it, and bring the means to it within geographic and economical reach of everyone."
                                    </p>
                                </li>
                                <li>
                                    <strong>How do we plan to achieve our objective?</strong>
                                    <p>
                                        "Anxiety, depression, and substance abuse account for 80% of psychological disorders. Our team of expert psychiatrists provides medication-based solutions to restore balance and alleviate symptoms."
                                    </p>
                                </li>
                                <li>
                                    <strong>Who are we for?</strong>
                                    <p>Your health, our priority. Reach out to us anytime!</p>
                                </li>
                                <li>
                                    <strong>How do we help?</strong>
                                    <p>
                                        "Your health, our priority. A simple 'Hi' on WhatsApp at [WhatsApp Number] is all it takes. We'll guide you through a quick self-assessment and connect you with our expert doctors."
                                    </p>
                                </li>
                                <li>
                                    <strong>Is it an NGO or a Social Enterprise?</strong>
                                    <p>
                                        "We're a social startup working to make mental healthcare accessible to everyone."
                                    </p>
                                </li>
                                <li>
                                    <strong>What kind of mental conditions do we help with?</strong>
                                    <p>
                                        "We prioritize the most common disorders, which account for 80% of cases: anxiety, depression, and substance abuse."
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default About;