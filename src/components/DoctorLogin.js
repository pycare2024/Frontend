import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorLoginImage from './doctorlogin.jpg'; // Import your background image

function DoctorLogin({ onLogin }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showP, setShowP] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/doctorlogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginId, password }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                onLogin(data.doctor);
                navigate("/Home", { state: { doctor: data.doctor } });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    const pageStyle = {
        backgroundImage: `url(${doctorLoginImage})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire page
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh", // Full viewport height
        display: "flex",
        justifyContent: "center", // Center form horizontally
        alignItems: "center", // Center form vertically
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
    };

    const formContainerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent white background
        borderRadius: "15px",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        width: "400px",
        textAlign: "center",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        marginTop: "10px",
        transition: "background-color 0.3s ease",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
    };

    const forgotPasswordStyle = {
        marginTop: "10px",
        color: "#007bff",
        textDecoration: "underline",
        cursor: "pointer",
        fontSize: "0.9rem",
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h2 style={{ marginBottom: "20px" }}>Doctor Login</h2>
                {message && <p style={{ color: "red" }}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Login ID"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type={showP ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <div style={{ textAlign: "left", marginBottom: "10px" }}>
                        <input
                            type="checkbox"
                            id="showP"
                            checked={showP}
                            onChange={() => setShowP(!showP)}
                            style={{ marginRight: "5px" }}
                        />
                        <label htmlFor="showP">Show Password</label>
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                    >
                        Login
                    </button>
                </form>
                <div>
                    <span
                        style={forgotPasswordStyle}
                        onClick={() => navigate("/ForgotPassword")}
                    >
                        Forgot Password?
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DoctorLogin;