import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "./logo.jpeg"; // Ensure this path is correct

function Nav({ isLoggedIn, isDocLoggedIn, onLogout, navBackground = "#fef4e8" }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navStyle = {
        backgroundColor: "#ffffff", // Light cream background
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "fixed", // Make the navbar fixed
        top: 0, // Position it at the top of the page
        left: 0,
        width: "100%", // Ensure it spans the full width of the viewport
        zIndex: 1000, // High z-index to keep it above other content
    };

    const brandStyle = {
        fontWeight: "bold",
        fontSize: "2rem",
        color: "#FF8096",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };

    const logoStyle = {
        width: "60px",
        height: "40px",
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    };

    const linkStyle = {
        color: "#333", // Darker text for better contrast
        margin: "0 10px",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "bold", // Bold text
        transition: "color 0.3s",
    };

    const activeLinkStyle = {
        color: "#FF8096", // Highlight active link with pink
        fontWeight: "bold",
        textDecoration:"none",
    };

    const menuIconStyle = {
        fontSize: "1.5rem",
        color: "#FF8096",
        cursor: "pointer",
    };

    const mobileMenuStyle = {
        display: isMobileMenuOpen ? "block" : "none", // Show or hide the mobile menu
        background: navBackground,
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        zIndex: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px",
    };

    const mobileLinkStyle = {
        ...linkStyle,
        display: "block",
        padding: "10px 0",
    };

    return (
        <nav style={navStyle}>
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" style={brandStyle}>
                    We are here to Help!
                    <img src={logo} alt="Logo" style={logoStyle} />
                </Link>

                {/* Desktop Links */}
                <div className="d-none d-md-flex">
                    <Link
                        to="/Home"
                        style={location.pathname === "/Home" ? activeLinkStyle : linkStyle}
                    >
                        Home
                    </Link>
                    <Link
                        to="/About"
                        style={location.pathname === "/About" ? activeLinkStyle : linkStyle}
                    >
                        About Us
                    </Link>
                    {isDocLoggedIn && (
                        <>
                            <Link
                                to="/Patients"
                                style={
                                    location.pathname === "/Patients" ? activeLinkStyle : linkStyle
                                }
                            >
                                Patients
                            </Link>
                            <button
                                onClick={onLogout}
                                style={{
                                    ...linkStyle,
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Link
                                to="/Doctors"
                                style={
                                    location.pathname === "/Doctors" ? activeLinkStyle : linkStyle
                                }
                            >
                                Doctors
                            </Link>
                            <Link
                                to="/Patients"
                                style={
                                    location.pathname === "/Patients" ? activeLinkStyle : linkStyle
                                }
                            >
                                Patients
                            </Link>
                            <button
                                onClick={onLogout}
                                style={{
                                    ...linkStyle,
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && !isDocLoggedIn && (
                        <>
                            <Link
                                to="/DoctorLogin"
                                style={
                                    location.pathname === "/DoctorLogin"
                                        ? activeLinkStyle
                                        : linkStyle
                                }
                            >
                                I am a Doctor
                            </Link>
                            <Link
                                to="/Login"
                                style={location.pathname === "/Login" ? activeLinkStyle : linkStyle}
                            >
                                Admin
                            </Link>
                            <Link
                                to="#"
                                style={location.pathname === "#" ? activeLinkStyle : linkStyle}
                            >
                                Contact Us
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="d-md-none">
                    <FaBars
                        style={menuIconStyle}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div style={mobileMenuStyle}>
                    <Link
                        to="/Home"
                        style={location.pathname === "/Home" ? activeLinkStyle : mobileLinkStyle}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/About"
                        style={location.pathname === "/About" ? activeLinkStyle : mobileLinkStyle}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About Us
                    </Link>
                    {!isLoggedIn && !isDocLoggedIn && (
                        <>
                            <Link
                                to="/Login"
                                style={
                                    location.pathname === "/Login" ? activeLinkStyle : mobileLinkStyle
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Admin
                            </Link>
                            <Link
                                to="/DoctorLogin"
                                style={
                                    location.pathname === "/DoctorLogin"
                                        ? activeLinkStyle
                                        : mobileLinkStyle
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                I am Doctor
                            </Link>
                        </>
                    )}
                    {(isLoggedIn || isDocLoggedIn) && (
                        <button
                            onClick={() => {
                                onLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            style={{
                                ...mobileLinkStyle,
                                background: "none",
                                border: "none",
                                textAlign: "left",
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Nav;