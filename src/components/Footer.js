import React from "react";

function Footer() {
    const footerStyle = {
        backgroundColor: "#2c3e50", // Darker, more professional color
        color: "#ecf0f1", // Light text for contrast
        textAlign: "center",
        padding: "30px 20px", // Increased padding for a cleaner layout
        position: "relative",
        bottom: 0,
        width: "100%",
        fontFamily: "'Poppins', sans-serif",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow to lift the footer
    };

    const linkStyle = {
        color: "#f39c12", // A more vibrant, gold-like color for the link
        textDecoration: "none",
        fontWeight: "bold",
        marginLeft: "5px",
        transition: "color 0.3s ease",
    };

    const linkHoverStyle = {
        color: "#e67e22", // Slightly darker shade on hover
    };

    return (
        <footer style={footerStyle}>
            <p style={{ fontSize: "14px", margin: "0" }}>
                © 2024 PsyCare. All rights reserved.
            </p>
            <p style={{ fontSize: "14px", margin: "5px 0" }}>
                Address: 123 PsyCare Avenue, Wellbeing City, MH 456789
            </p>
            <p style={{ fontSize: "14px", margin: "5px 0" }}>
                Designed with ❤️ by 
                <a
                    href="https://yourcompany.com"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} // Hover effect
                    onMouseLeave={(e) => e.target.style.color = linkStyle.color} // Reset to original color
                >
                    PsyCare Team
                </a>
            </p>
        </footer>
    );
}

export default Footer;