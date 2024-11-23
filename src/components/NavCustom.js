import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaAngleDown } from "react-icons/fa"; // Import the arrow icon
import logo from "./logo.jpeg"; // Ensure this path is correct

function Nav({ isLoggedIn, isDocLoggedIn, onLogout, navBackground = "#fef4e8" }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navStyle = {
        backgroundColor: "#ffffff", // Light cream background
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "relative",
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
        transition: "color 0.3s",
        display: "flex", // Make the link and icon appear on the same line
        alignItems: "center", // Align items vertically
    };

    const activeLinkStyle = {
        color: "pink", // Highlight active link with pink
        textDecoration: "underline",
    };

    const menuIconStyle = {
        fontSize: "1.5rem",
        color: "pink",
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
                        Home <FaAngleDown style={{ marginLeft: "5px" }} />
                    </Link>
                    <Link
                        to="/About"
                        style={location.pathname === "/About" ? activeLinkStyle : linkStyle}
                    >
                        About Us <FaAngleDown style={{ marginLeft: "5px" }} />
                    </Link>
                    {isDocLoggedIn && (
                        <>
                            <Link
                                to="/Patients"
                                style={
                                    location.pathname === "/Patients" ? activeLinkStyle : linkStyle
                                }
                            >
                                Patients <FaAngleDown style={{ marginLeft: "5px" }} />
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
                                Doctors <FaAngleDown style={{ marginLeft: "5px" }} />
                            </Link>
                            <Link
                                to="/Patients"
                                style={
                                    location.pathname === "/Patients" ? activeLinkStyle : linkStyle
                                }
                            >
                                Patients <FaAngleDown style={{ marginLeft: "5px" }} />
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
                                I am Doctor <FaAngleDown style={{ marginLeft: "5px" }} />
                            </Link>
                            <Link
                                to="/Login"
                                style={location.pathname === "/Login" ? activeLinkStyle : linkStyle}
                            >
                                Admin <FaAngleDown style={{ marginLeft: "5px" }} />
                            </Link>
                            <Link
                                to="#"
                                style={location.pathname === "#" ? activeLinkStyle : linkStyle}
                            >
                                Contact Us <FaAngleDown style={{ marginLeft: "5px" }} />
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
                        Home <FaAngleDown style={{ marginLeft: "5px" }} />
                    </Link>
                    <Link
                        to="/About"
                        style={location.pathname === "/About" ? activeLinkStyle : mobileLinkStyle}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About Us <FaAngleDown style={{ marginLeft: "5px" }} />
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
                                Admin <FaAngleDown style={{ marginLeft: "5px" }} />
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
                                I am Doctor <FaAngleDown style={{ marginLeft: "5px" }} />
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