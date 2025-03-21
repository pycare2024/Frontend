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
                console.log(data.doctor.doctor_id)
                console.log(data.doctor.id)
                localStorage.setItem("doctor_id", data.doctor.doctor_id);
                localStorage.setItem("Id", data.doctor.id);
                navigate("/Home", { state: { doctor: data.doctor } });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    const pageStyle = {
        backgroundImage: `url(${doctorLoginImage})`,
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
    };

    const formContainerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        width: "350px",
        textAlign: "center",
        marginLeft: "70%",
        marginBottom: "13%",
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
        backgroundColor: "#FF8096",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        marginTop: "10px",
        transition: "transform 0.3s ease",
    };

    const buttonHoverStyle = {
        transform: "scale(1.05)",
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
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <input
                            type={showP ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 40px 10px 10px", // Adjusted padding for the icon
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                fontSize: "1rem",
                            }}
                            required
                        />
                        <i
                            className={`fa-solid ${showP ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowP(!showP)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                fontSize: "1.2rem",
                                color: "grey",
                            }}
                            title={showP ? "Hide Password" : "Show Password"}
                        ></i>
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.transform = buttonHoverStyle.transform)}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        Login
                    </button>
                </form>
                <div>
                    <span
                        style={forgotPasswordStyle}
                        onClick={() => navigate("/ForgotPwDoctor")}
                    >
                        Forgot Password?
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DoctorLogin;