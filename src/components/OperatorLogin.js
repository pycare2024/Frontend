import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OperatorLogin = ({onLogin}) => {
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
                onLogin(data.operator);  // Call the function passed from App.js
                navigate("/"); // Redirect immediately
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error verifying OTP.");
            console.error("OTP Verification Error:", error);
        }
    };

    return (
        <div className="login-container" style={{ marginTop: "10%", marginBottom: "10%" }}>
            <h2>Operator Login</h2>
            {message && <p>{message}</p>}

            {step === 1 && (
                <div>
                    <input
                        type="text"
                        placeholder="Login ID"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <p>OTP sent to your WhatsApp</p>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default OperatorLogin;