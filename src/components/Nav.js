import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Nav.css";

function Nav({ isLoggedIn, isDocLoggedIn, isOperatorLoggedIn, onLogout, navBackground = "#ffffff" }) {

    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const navStyle = {
        backgroundColor: navBackground,
        padding: "6px 20px",
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
        fontSize: "0.5rem",
        transition: "all 0.3s ease",
    };

    const activeLinkStyle = {
        color: "#4285F4",
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
            <div className="nav-bar-wrapper">
                <div className="nav-left">
                    <Link to="/Home" style={brandStyle}>PsyCare</Link>
                </div>

                {/* Desktop Links */}
                <div className="nav-right">
                    <div className="navHome">
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
                            <Link
                                to="/"
                                style={{
                                    display: "inline-block",
                                    color: "#333",
                                    textDecoration: "none",
                                    marginRight: "-7px"
                                }}
                            >
                                HOME
                            </Link>
                        )}
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (

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
                                            to="/About"
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
                                            to="/About"
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
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
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
                                            to="/OperatorLogin"
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
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
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
                                            to="/IndividualTherapy"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Individual Therapy
                                        </Link>
                                        <Link
                                            to="/CorporateWellness"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Corporate Wellness
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
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
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
                            <div className="auth-buttons">
                                <Link to="/BookAppointment" className="auth-btn signup-btn">Book Appointment</Link>
                            </div>
                        )}

                    </div>

                    {
                        isOperatorLoggedIn && (
                            <>
                                <div
                                    name="navPatients"
                                    style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                    onMouseEnter={() => setOpenDropdown("patients")}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    Patients
                                    {openDropdown === "patients" && (
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
                                                minWidth: "200px",
                                                display: "flex",  // ✅ Stack items vertically
                                                flexDirection: "column",  // ✅ Arrange in column
                                                gap: "5px",  // ✅ Add spacing between items
                                                cursor: "pointer"
                                            }}
                                        >
                                            <Link
                                                to="/Patients"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    fontWeight: "normal",
                                                    padding: "8px 12px",
                                                    borderRadius: "4px",
                                                    transition: "background 0.2s",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                            >
                                                Patients List
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div
                                    name="navDoctors"
                                    style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                    onMouseEnter={() => setOpenDropdown("doctors")}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    Doctors
                                    {openDropdown === "doctors" && (
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
                                                minWidth: "220px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Link
                                                to="/Doctors"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    fontWeight: "normal",
                                                    padding: "8px 12px",
                                                    borderRadius: "4px",
                                                    transition: "background 0.2s",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                            >
                                                Doctors List
                                            </Link>
                                            <Link
                                                to="/DoctorSchedule"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    fontWeight: "normal",
                                                    padding: "8px 12px",
                                                    borderRadius: "4px",
                                                    transition: "background 0.2s",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                            >
                                                Doctor's Schedule
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={onLogout}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "normal",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        transition: "background 0.2s",
                                        border: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                    {
                        isDocLoggedIn && (
                            <>
                                <Link
                                    to="/Patients"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "normal",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Patients
                                </Link>
                                <Link
                                    to="/Appointments"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "normal",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Appointments
                                </Link>
                                <button
                                    onClick={onLogout}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "normal",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        transition: "background 0.2s",
                                        border: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    {isLoggedIn && (
                        <>
                            <div
                                name="navAccounts"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                onMouseEnter={() => setOpenDropdown("accounts")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Accounts
                                {openDropdown === "accounts" && (
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
                                            minWidth: "220px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Link
                                            to="/CompanyAccountsTab"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Company Accounts
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Doctors Menu */}
                            <div
                                name="navDoctors"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                onMouseEnter={() => setOpenDropdown("doctors")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Doctors
                                {openDropdown === "doctors" && (
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
                                            minWidth: "220px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Link
                                            to="/Doctors"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Doctors List
                                        </Link>
                                        <Link
                                            to="/DoctorSchedule"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Doctor's Schedule
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Patients Menu */}
                            <div
                                name="navPatients"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                onMouseEnter={() => setOpenDropdown("patients")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Patients
                                {openDropdown === "patients" && (
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
                                            minWidth: "200px",
                                            display: "flex",  // ✅ Stack items vertically
                                            flexDirection: "column",  // ✅ Arrange in column
                                            gap: "5px",  // ✅ Add spacing between items
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Link
                                            to="/Patients"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Patients List
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Screening Test Menu */}
                            <div
                                name="navScreeningTest"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                onMouseEnter={() => setOpenDropdown("screeningTest")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                ScreeningTest
                                {openDropdown === "screeningTest" && (
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
                                            minWidth: "200px",
                                            display: "flex",  // ✅ Stack items vertically
                                            flexDirection: "column",  // ✅ Arrange in column
                                            gap: "5px",  // ✅ Add spacing between items
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Link
                                            to="/ScreeningTest"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Add Screening Test
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Operator Menu */}
                            <div
                                name="navOperator"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                                onMouseEnter={() => setOpenDropdown("operator")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Operator
                                {openDropdown === "operator" && (
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
                                            minWidth: "200px",
                                            display: "flex",  // ✅ Stack items vertically
                                            flexDirection: "column",  // ✅ Arrange in column
                                            gap: "5px",  // ✅ Add spacing between items
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Link
                                            to="/AddOperator"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Add Operator
                                        </Link>
                                        <Link
                                            to="/OperatorDetails"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                fontWeight: "normal",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                transition: "background 0.2s",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            Operator Details
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={onLogout}
                                style={{
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
                {isOperatorLoggedIn && (
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
                            to="/DoctorSchedule"
                            style={
                                location.pathname === "/DoctorSchedule" ? activeLinkStyle : linkStyle
                            }
                        >
                            Doctor's schedule
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
                {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
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
                        <Link
                            to="/OperatorLogin"
                            style={
                                location.pathname === "/OperatorLogin"
                                    ? activeLinkStyle
                                    : linkStyle
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Operator
                        </Link>
                    </>
                )}
                {(isLoggedIn || isDocLoggedIn || isOperatorLoggedIn) && (
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