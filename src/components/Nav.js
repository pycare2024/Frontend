import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Nav.css";
import logo from "./PsyCare.png";

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
                    <Link to="/Home" style={brandStyle}>
                        <img src={logo} alt="PsyCare Logo" style={{ height: "50px", marginRight: "10px", border: "1px solid #4285F4", borderRadius: "10px" }} />
                        PsyCare
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="nav-right d-none d-md-flex">
                    <div className="navHome">
                        {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
                            <Link
                                to="/"
                                style={{
                                    display: "inline-block",
                                    color: "#333",
                                    textDecoration: "none",
                                    marginRight: "-7px",
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
                                            to="/About#team"
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
                                        <Link
                                            to="/StartScreeningTest"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Psychometric Assessment
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
                                            to="/Articles"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Articles
                                        </Link>
                                        {/* <Link
                                            to="/mission"
                                            style={{
                                                display: "block",
                                                padding: "5px 10px",
                                                color: "#333",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Videos
                                        </Link> */}
                                        <Link
                                            to="/ABC"
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
                                <Link to="/BookAppointment" className="auth-btn signup-btn">
                                    Book Appointment
                                </Link>
                            </div>
                        )}


                    </div>

                    {
                        isOperatorLoggedIn && (
                            <>
                                <div
                                    name="navPatients"
                                    style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                                cursor: "pointer",
                                                fontWeight: "normal"
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
                                    style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                                fontWeight: "normal"
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
                                        marginRight: "45px",
                                        fontWeight: "normal"
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
                                        marginRight: "45px"
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
                                name="navCorporates"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
                                onMouseEnter={() => setOpenDropdown("corporates")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Corporates
                                {openDropdown === "corporates" && (
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
                                            fontWeight: "normal"
                                        }}
                                    >
                                        <Link
                                            to="/RegisterCorporate"
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
                                            Register Corporate
                                        </Link>
                                        <Link
                                            to="/RechargeCredits"
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
                                            Recharge credits
                                        </Link>
                                        <Link
                                            to="/CorporateScreeningSummary"
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
                                            Corporate screening summary report
                                        </Link>
                                        <Link
                                            to="/DemographicInsights"
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
                                            Demographic insights report
                                        </Link>
                                        <Link
                                            to="/ClinicalImpactReport"
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
                                            Clinical impact report
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div
                                name="navAccounts"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                            fontWeight: "normal"
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
                            <div
                                name="navUtility"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
                                onMouseEnter={() => setOpenDropdown("utility")}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Utility
                                {openDropdown === "utility" && (
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
                                            fontWeight: "normal"
                                        }}
                                    >
                                        <Link
                                            to="/EmailPanel"
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
                                            Send Bulk Email
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Doctors Menu */}
                            <div
                                name="navDoctors"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                            fontWeight: "normal"
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
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                            cursor: "pointer",
                                            fontWeight: "normal"
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
                                        <Link
                                            to="/AdminFeedbackSender"
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
                                            Send Feedback Forms
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Screening Test Menu */}
                            <div
                                name="navScreeningTest"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                            cursor: "pointer",
                                            fontWeight: "normal"
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
                                style={{ position: "relative", display: "inline-block", cursor: "pointer", marginLeft: "15px" }}
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
                                            cursor: "pointer",
                                            fontWeight: "normal"
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
                                    marginRight: "45px",
                                    fontWeight: "normal"
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {/* Moved auth-buttons inside desktop nav */}

                </div>

                {/* Mobile Menu Icon */}
                <div className="mobile-toggle">
                    <FaBars onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobileMenu ${isMobileMenuOpen ? "open" : ""}`}>
                {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
                    <>
                        <div className="dropdown">
                            <span className="dropdown-label">HOME ▾</span>
                            <div className="dropdown-content">
                                <Link to="/">Home</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">ABOUT US ▾</span>
                            <div className="dropdown-content">
                                <Link to="/About">About PsyCare</Link>
                                <Link to="/About#team">Our Team</Link>
                                <Link to="/Contactus">Contact Us</Link>
                                <Link to="/FAQ">FAQs</Link>
                            </div>
                        </div>

                        <div className="dropdown">
                            <span className="dropdown-label">PARTNERS ▾</span>
                            <div className="dropdown-content">
                                <Link to="/DoctorLogin">Doctor</Link>
                                <Link to="/Login">Admin</Link>
                                <Link to="/OperatorLogin">Operator</Link>
                            </div>
                        </div>

                        <div className="dropdown">
                            <span className="dropdown-label">SERVICES ▾</span>
                            <div className="dropdown-content">
                                <Link to="/Individual Therapy">Individual Therapy</Link>
                                <Link to="/Corporate Wellness">Corporate Wellness</Link>
                                <Link to="/StartScreeningTest">Psychometric Assessment</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">RESOURCES ▾</span>
                            <div className="dropdown-content">
                                <Link to="/Articles">Articles</Link>
                                <Link to="/ABC">Blog</Link>
                            </div>
                        </div>
                    </>
                )}

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
                        <div className="dropdown">
                            <span className="dropdown-label">Patients ▾</span>
                            <div className="dropdown-content">
                                <Link to="/Patients">Patients list</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Appointments ▾</span>
                            <div className="dropdown-content">
                                <Link to="/Appointments">Appointments list</Link>
                            </div>
                        </div>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/" style={{ fontWeight: "bold", color: "#4285F4", padding: "10px", marginLeft: "20px" }}>Home</Link>
                        {/* ✅ Corporates dropdown */}
                        <div className="dropdown">
                            <span className="dropdown-label">Corporates ▾</span>
                            <div className="dropdown-content">
                                <Link to="/RegisterCorporates">Register Corporates</Link>
                                <Link to="/RechargeCredits">Recharge Credits</Link>
                                <Link to="/CorporateScreeningSummary">Corporate screening summary report</Link>
                                <Link to="/DemographicInsights">Demographic insights report</Link>
                                <Link to="/ClinicalImpactReport">Clinical impact report</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Accounts ▾</span>
                            <div className="dropdown-content">
                                <Link to="/CompanyAccountsTab">Company Accounts</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Utility ▾</span>
                            <div className="dropdown-content">
                                <Link to="/EmailPanel">Send bulk email</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Doctor ▾</span>
                            <div className="dropdown-content">
                                <Link to="/Doctors">Doctor list</Link>
                                <Link to="/DoctorSchedule">Doctor Schedule</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Patients ▾</span>
                            <div className="dropdown-content">
                                <Link to="/Patients">Patients list</Link>
                                <Link to="/AdminFeedbackSender">Send Feedback Forms</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Screening Test ▾</span>
                            <div className="dropdown-content">
                                <Link to="/ScreeningTest">Add Screening Test</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-label">Operator ▾</span>
                            <div className="dropdown-content">
                                <Link to="/AddOperator">Add Operator</Link>
                                <Link to="/OperatorDetails">Operator Details</Link>
                            </div>
                        </div>
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
                            fontWeight: "bold",
                            color: "#4285F4",
                            fontSize: "1rem"
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