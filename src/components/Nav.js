import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Nav.css";

function Nav({ isLoggedIn, isDocLoggedIn, onLogout, navBackground = "#ffffff" }) {

    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const navStyle = {
        backgroundColor: navBackground,
        padding: "15px 20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        transition: "all 0.3s ease",
    };

    const brandStyle = {
        fontWeight: "700",
        fontSize: "2.2rem",
        color: "#4285F4",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginLeft: "5%",
        transition: "transform 0.3s ease",
    };

    const linkStyle = {
        color: "#333",
        margin: "0 15px",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
    };

    const activeLinkStyle = {
        color: "#4285F4",
        fontWeight: "700",
        textDecoration: "none",
    };

    const menuIconStyle = {
        fontSize: "1.8rem",
        color: "#4285F4",
        cursor: "pointer",
        transition: "transform 0.3s ease",
    };

    return (
        <nav style={navStyle}>
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/Home" style={brandStyle}>
                    PsyCare
                    {/* <img src={logo} alt="Logo" style={logoStyle} /> */}
                </Link>

                {/* Desktop Links */}
                <div className="d-none d-md-flex align-items-center">
                    <div className="navHome">
                        {!isLoggedIn && !isDocLoggedIn && (
                            <div
                                name="navAbout"
                                style={{ position: "relative", display: "inline-block" }}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                ABOUT US
                                {showDropdown && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            backgroundColor: "white",
                                            padding: "10px",
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                            zIndex: 10,
                                            borderRadius: "4px",
                                            minWidth: "160px",
                                        }}
                                    >
                                        <Link
                                            to="/team"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            About PsyCare
                                        </Link>
                                        <Link
                                            to="/mission"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Our Team
                                        </Link>
                                        <Link
                                            to="/Contactus"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Contact Us
                                        </Link>
                                        <Link
                                            to="/FAQ"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            FAQS
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isLoggedIn && !isDocLoggedIn && (
                            <div
                                name="navPartners"
                                style={{ position: "relative", display: "inline-block" }}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                PARTNERS
                                {showDropdown && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            backgroundColor: "white",
                                            padding: "10px",
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                            zIndex: 10,
                                            borderRadius: "4px",
                                            minWidth: "160px",
                                        }}
                                    >
                                        <Link
                                            to="/DoctorLogin"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Doctor
                                        </Link>
                                        <Link
                                            to="/Login"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Admin
                                        </Link>
                                        <Link
                                            to="/careers"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Operator
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isLoggedIn && !isDocLoggedIn && (
                            <div
                                name="navPartners"
                                style={{ position: "relative", display: "inline-block" }}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                SERVICES
                                {showDropdown && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            backgroundColor: "white",
                                            padding: "10px",
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                            zIndex: 10,
                                            borderRadius: "4px",
                                            minWidth: "160px",
                                        }}
                                    >
                                        <Link
                                            to="/team"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Doctor
                                        </Link>
                                        <Link
                                            to="/mission"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Admin
                                        </Link>
                                        <Link
                                            to="/careers"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Operator
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isLoggedIn && !isDocLoggedIn && (
                            <div
                                name="navPartners"
                                style={{ position: "relative", display: "inline-block" }}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                RESOURCES
                                {showDropdown && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            backgroundColor: "white",
                                            padding: "10px",
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                            zIndex: 10,
                                            borderRadius: "4px",
                                            minWidth: "160px",
                                        }}
                                    >
                                        <Link
                                            to="/team"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Article
                                        </Link>
                                        <Link
                                            to="/mission"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Videos
                                        </Link>
                                        <Link
                                            to="/Blog/Blog"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Blog
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isLoggedIn && !isDocLoggedIn && (
                            <div className="auth-buttons">
                            <Link to="/signup" className="auth-btn signup-btn">Book Appointment</Link>
                            </div>
                        )}
                        
                    </div>

                    {
                    isDocLoggedIn && (
                        <>
                            <Link
                                to="/Patients"
                                style={
                                    location.pathname === "/Patients" ? activeLinkStyle : linkStyle
                                }
                            >
                                Patients
                            </Link>
                            <Link
                                to="/Appointments"
                                style={
                                    location.pathname === "/Appointments" ? activeLinkStyle : linkStyle
                                }
                            >
                                Appointments
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
                            <Link
                                to="/DoctorSchedule"
                                style={
                                    location.pathname === "/DoctorSchedule" ? activeLinkStyle : linkStyle
                                }
                            >
                                Doctor's schedule
                            </Link>
                            <Link
                                to="/ScreeningTest"
                                style={
                                    location.pathname === "/ScreeningTest" ? activeLinkStyle : linkStyle
                                }
                            >
                                Add Screening test
                            </Link>
                            <Link
                                to="/AddOperator"
                                style={
                                    location.pathname === "/AddOperator" ? activeLinkStyle : linkStyle
                                }
                            >
                                Add Operator
                            </Link>
                            <Link
                                to="/OperatorDetails"
                                style={
                                    location.pathname === "/OperatorDetails" ? activeLinkStyle : linkStyle
                                }
                            >
                                Operator Details
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
                    {/* Moved auth-buttons inside desktop nav */}
                    
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
            <div className={`mobileMenu ${isMobileMenuOpen ? "open" : ""}`}>
                <Link
                    to="/Home"
                    style={location.pathname === "/Home" ? activeLinkStyle : linkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Home
                </Link>
                <Link
                    to="/About"
                    style={location.pathname === "/About" ? activeLinkStyle : linkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
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
                        <Link
                            to="/DoctorSchedule"
                            style={
                                location.pathname === "/DoctorSchedule" ? activeLinkStyle : linkStyle
                            }
                        >
                            Doctor's schedule
                        </Link>
                    </>
                )}
                {!isLoggedIn && !isDocLoggedIn && (
                    <>
                        <Link
                            to="/Login"
                            style={location.pathname === "/Login" ? activeLinkStyle : linkStyle}
                            onClick={() => setIsMobileMenuOpen(false)}
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
                            ...linkStyle,
                            background: "none",
                            border: "none",
                            textAlign: "left",
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Nav;