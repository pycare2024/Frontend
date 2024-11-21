import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Nav({ isLoggedIn, isDocLoggedIn, onLogout, navBackground = "#17a2b8" }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navStyle = {
        backgroundColor: navBackground, // Dynamic background
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "relative",  // Ensure mobile menu is positioned correctly
    };

    const brandStyle = {
        fontWeight: "bold",
        fontSize: "1.5rem",
        color: "#fff",
        textDecoration: "none",
    };

    const linkStyle = {
        color: "#fff",
        margin: "0 10px",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "color 0.3s",
    };

    const activeLinkStyle = {
        color: "#ffc107", // Highlight active link
        textDecoration: "underline",
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
        paddingTop: "10px",
    };

    const menuIconStyle = {
        fontSize: "1.5rem",
        color: "#fff",
        cursor: "pointer",
    };

    return (
        <nav style={navStyle}>
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" style={brandStyle}>
                    We are here to Help!
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
                                to="/Login"
                                style={location.pathname === "/Login" ? activeLinkStyle : linkStyle}
                            >
                                Admin
                            </Link>
                            <Link
                                to="/DoctorLogin"
                                style={
                                    location.pathname === "/DoctorLogin"
                                    ? activeLinkStyle
                                    : linkStyle
                                }
                            >
                                I am Doctor
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="d-md-none">
                    <FaBars
                        style={menuIconStyle}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu visibility
                    />
                </div>
            </div>

            {/* Mobile Links */}
            <div style={mobileMenuStyle}>
                <Link
                    to="/Home"
                    style={location.pathname === "/Home" ? activeLinkStyle : linkStyle}
                    onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                >
                    Home
                </Link>
                <Link
                    to="/About"
                    style={location.pathname === "/About" ? activeLinkStyle : linkStyle}
                    onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
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
                            onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                        >
                            Patients
                        </Link>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false); // Close the menu
                                onLogout();
                            }}
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
                            onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                        >
                            Doctors
                        </Link>
                        <Link
                            to="/Patients"
                            style={
                                location.pathname === "/Patients" ? activeLinkStyle : linkStyle
                            }
                            onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                        >
                            Patients
                        </Link>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false); // Close the menu
                                onLogout();
                            }}
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
                            to="/Login"
                            style={location.pathname === "/Login" ? activeLinkStyle : linkStyle}
                            onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                        >
                            Admin
                        </Link>
                        <Link
                            to="/DoctorLogin"
                            style={
                                location.pathname === "/DoctorLogin"
                                    ? activeLinkStyle
                                    : linkStyle
                            }
                            onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                        >
                            I am Doctor
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;