import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import operatorBg from "./operatorLogin.jpg"; // Ensure the image is in the correct path

const OperatorLogin = ({ onLogin }) => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [operatorId, setOperatorId] = useState(null);
    const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/OperatorRoute/operator-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ loginId, password })
            });

            const data = await response.json();

            if (response.ok) {
                setOperatorId(data.operatorId);
                setMessage(data.message);
                setStep(2); // Move to OTP verification step
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Server error. Please try again.");
            console.error("Login Error:", error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/OperatorRoute/verify-operator-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ operatorId, otp })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful! Redirecting...");

                localStorage.setItem("operator", JSON.stringify(data.operator));
                onLogin(data.operator);
                navigate("/"); // Redirect
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error verifying OTP.");
            console.error("OTP Verification Error:", error);
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <div style={styles.card}>
                    <h2 style={styles.heading}>Operator Login</h2>

                    {message && <p style={styles.message}>{message}</p>}

                    {step === 1 && (
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Login ID"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                            <button onClick={handleLogin} style={styles.button}>Login</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div style={styles.inputContainer}>
                            <p style={styles.infoText}>OTP sent to your WhatsApp</p>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={styles.input}
                            />
                            <button onClick={handleVerifyOtp} style={styles.button}>Verify OTP</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 🎨 Styles
const styles = {
    background: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${operatorBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor:"rgba(255, 255, 255, 0.69)",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        width:"100%",
        maxWidth: "380px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
    },
    heading: {
        marginBottom: "15px",
        color: "#4285F4",
        fontWeight: "600",
    },
    message: {
        fontSize: "14px",
        color: "#d9534f",
        marginBottom: "10px",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backdropFilter: "blur(2px)",
    },
    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        outline: "none",
    },
    button: {
        padding: "12px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "10px",
        transition: "0.3s",
    },
    infoText: {
        fontSize: "14px",
        color: "#555",
    },
};

export default OperatorLogin;