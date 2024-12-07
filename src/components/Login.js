import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from './login.jpg'; // Replace with your background image path

function Login({ onLogin }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when login starts

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/AdminRoute/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginId, password }),
            });

            const data = await response.json();

            if (data.success) {
                onLogin(data.admin);
                navigate("/Home", { state: { admin: data.admin } });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const pageStyle = {
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
    };

    const formContainerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        width: "350px",
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
        backgroundColor: "#FF8096",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: isLoading ? "not-allowed" : "pointer",
        fontSize: "1rem",
        marginTop: "10px",
    };

    const forgotPasswordStyle = {
        marginTop: "10px",
        color: "#FF8096",
        textDecoration: "underline",
        cursor: "pointer",
        fontSize: "0.9rem",
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>
                {message && <p style={{ color: "red" }}>{message}</p>}
                {isLoading && <p style={{ color: "#FF8096", marginBottom: "10px" }}>Logging in...</p>} {/* Loading message */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Login ID"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        style={inputStyle}
                        required
                        disabled={isLoading} // Disable input during loading
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                        disabled={isLoading} // Disable input during loading
                    />
                    <div style={{ textAlign: "left", marginBottom: "10px" }}>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            style={{ marginRight: "5px" }}
                            disabled={isLoading} // Disable checkbox during loading
                        />
                        <label htmlFor="showPassword">Show Password</label>
                    </div>
                    <button type="submit" style={buttonStyle} disabled={isLoading}>
                        {isLoading ? "Processing..." : "Login"} {/* Change button text during loading */}
                    </button>
                </form>
                <div>
                    <span
                        style={forgotPasswordStyle}
                        onClick={() => !isLoading && navigate("/ForgotPassword")}
                    >
                        Forgot Password?
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;