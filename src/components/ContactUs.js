import React from "react";

function ContactUs() {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: "20px",
                backgroundColor: "#f0f4f8",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    marginTop:"auto",
                    maxWidth: "700px",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                }}
            >
                <h1 style={{ textAlign: "center", color: "#FF4B75", marginBottom: "20px", fontSize: "2rem" }}>
                    Contact Us
                </h1>
                <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#555", marginBottom: "30px" }}>
                    We'd love to hear from you! Reach out to us through the details below.
                </p>

                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ marginBottom: "8px", color: "#FF8096", fontSize: "1.2rem" }}>Office Address</h3>
                    <p style={{ color: "#555", lineHeight: "1.6", fontSize: "1rem" }}>
                        Noida
                    </p>
                </div>

                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ marginBottom: "8px", color: "#FF8096", fontSize: "1.2rem" }}>Contact Number</h3>
                    <p style={{ color: "#555", fontSize: "1rem" }}>+91 98182 96388</p>
                </div>

                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ marginBottom: "8px", color: "#FF8096", fontSize: "1.2rem" }}>Email Address</h3>
                    <p style={{ color: "#555", fontSize: "1rem" }}>ceo@psy-care.in</p>
                </div>

                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ marginBottom: "8px", color: "#FF8096", fontSize: "1.2rem" }}>Follow Us</h3>
                    <p style={{ color: "#555", fontSize: "1rem", marginBottom: "10px" }}>
                        Stay connected with us on our social media channels:
                    </p>
                    <ul
                        style={{
                            listStyleType: "none",
                            padding: "0",
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            margin: "0",
                        }}
                    >
                        <li>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#4267B2", textDecoration: "none", fontSize: "1.2rem" }}
                            >
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#1DA1F2", textDecoration: "none", fontSize: "1.2rem" }}
                            >
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#0077b5", textDecoration: "none", fontSize: "1.2rem" }}
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#E4405F", textDecoration: "none", fontSize: "1.2rem" }}
                            >
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        textAlign: "center",
                        color: "#aaa",
                        fontSize: "0.9rem",
                        borderTop: "1px solid #eee",
                        paddingTop: "20px",
                        marginTop: "30px",
                    }}
                >
                    © 2024 Psycare. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default ContactUs;