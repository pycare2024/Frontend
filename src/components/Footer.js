import React from "react";

function Footer() {
    const footerStyle = {
        backgroundColor: "#ffffff", // White background
        color: "black", // Black text for contrast
        padding: "50px 20px", // Increased padding for more height
        position: "relative",
        bottom: 0,
        width: "100%",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "bold",
        minHeight: "150px", // Minimum height to ensure consistent size
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        overflow: "hidden", // Ensures the pink bar stays inside the footer
    };

    const pinkBarStyle = {
        position: "absolute", // Absolutely position the pink bar
        top: 0, // Align to the top of the footer
        left: 0, // Align to the left edge
        right: 0, // Align to the right edge
        backgroundColor: "#FF8096", // Pink color for the top bar
        height: "20px", // Height of the pink bar
    };

    const contentContainerStyle = {
        display: "flex",
        justifyContent: "space-between", // Align content: left-aligned text and right-aligned icons
        alignItems: "center", // Vertically align items
        margin: "0 auto",
        maxWidth: "1200px", // Limit the width of the content
    };

    const leftTextStyle = {
        textAlign: "left", // Align text to the left
    };

    const iconContainerStyle = {
        textAlign: "right", // Align icons to the right
    };

    const iconStyle = {
        fontSize: "1.5rem", // Size of the icons
        color: "#333", // Default color for icons
        margin: "0 10px", // Spacing between icons
        transition: "color 0.3s ease", // Smooth hover effect
        cursor: "pointer", // Pointer cursor on hover
    };

    const iconHoverStyle = {
        color: "#FF8096", // Change color on hover
    };

    return (
        <footer style={footerStyle}>
            {/* Pink Division at the Top */}
            <div style={pinkBarStyle}></div>
            {/* Footer Content */}
            <div style={contentContainerStyle}>
                {/* Left-Aligned Text */}
                <div style={leftTextStyle}>
                    <p style={{ fontSize: "14px", margin: "0" }}>
                        © 2024 PsyCare
                    </p>
                    <p style={{ fontSize: "14px", margin: "5px 0" }}>
                        Designed with ❤️ by 
                        <a
                            href="https://yourcompany.com"
                            style={{
                                color: "#f39c12",
                                textDecoration: "none",
                                fontWeight: "bold",
                                marginLeft: "5px",
                                transition: "color 0.3s ease",
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => (e.target.style.color = "#e67e22")} // Hover effect
                            onMouseLeave={(e) => (e.target.style.color = "#f39c12")} // Reset color
                        >
                            PsyCare Team
                        </a>
                    </p>
                </div>
                {/* Right-Aligned Icons */}
                <div style={iconContainerStyle}>
                    <a href="https://twitter.com" target="https://x.com/Psycare2024" rel="noopener noreferrer">
                        <i
                            className="fa-brands fa-twitter"
                            style={iconStyle}
                            onMouseEnter={(e) => (e.target.style.color = iconHoverStyle.color)}
                            onMouseLeave={(e) => (e.target.style.color = iconStyle.color)}
                        ></i>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i
                            className="fa-brands fa-facebook"
                            style={iconStyle}
                            onMouseEnter={(e) => (e.target.style.color = iconHoverStyle.color)}
                            onMouseLeave={(e) => (e.target.style.color = iconStyle.color)}
                        ></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i
                            className="fa-brands fa-instagram"
                            style={iconStyle}
                            onMouseEnter={(e) => (e.target.style.color = iconHoverStyle.color)}
                            onMouseLeave={(e) => (e.target.style.color = iconStyle.color)}
                        ></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;