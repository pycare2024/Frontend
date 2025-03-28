import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from './login.jpg'; // Replace with your background image path

function Login({ onLogin }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
            setIsLoading(false);
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
        animation: "fadeIn 1s ease-in-out",
    };

    const formContainerStyle = {
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(66, 133, 244, 0.2)", // Subtle blue shadow
        padding: "40px",
        width: "400px",
        textAlign: "center",
        transform: "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        margin: "12px 0",
        borderRadius: "6px",
        border: "1px solid #d1e0ff", // Light blue border
        fontSize: "1rem",
        outline: "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        backgroundColor: "#4285F4", // Google Blue
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: isLoading ? "not-allowed" : "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        marginTop: "15px",
        transition: "background-color 0.3s ease, transform 0.2s ease",
    };

    const forgotPasswordStyle = {
        marginTop: "15px",
        color: "#4285F4",
        textDecoration: "none",
        cursor: isLoading ? "not-allowed" : "pointer",
        fontSize: "0.9rem",
        transition: "color 0.3s ease",
    };

    // Inline hover effects using React's style prop with event handlers
    const hoverEffects = `
        .form-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(66, 133, 244, 0.25);
        }
        .input-field:focus {
            border-color: #4285F4;
            box-shadow: 0 0 8px rgba(66, 133, 244, 0.3);
        }
        .login-button:hover:not(:disabled) {
            background-color: #3267d6;
            transform: translateY(-2px);
        }
        .forgot-password:hover:not(:disabled) {
            color: #3267d6;
            text-decoration: underline;
        }
    `;

    // Keyframes for animations
    const animations = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;

    return (
        <div style={pageStyle}>
            <style>{hoverEffects + animations}</style>
            <div
                style={{ ...formContainerStyle, animation: "slideIn 0.5s ease-out" }}
                className="form-container"
            >
                <h2 style={{ marginBottom: "25px", color: "#4285F4", fontWeight: "600" }}>
                    Admin Login
                </h2>
                {message && <p style={{ color: "#d93025", fontSize: "0.9rem" }}>{message}</p>}
                {isLoading && (
                    <p style={{ color: "#4285F4", marginBottom: "15px", fontStyle: "italic" }}>
                        Logging in...
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Login ID"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        style={inputStyle}
                        required
                        disabled={isLoading}
                        className="input-field"
                    />
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                ...inputStyle,
                                paddingRight: "40px",
                            }}
                            required
                            disabled={isLoading}
                            className="input-field"
                        />
                        <i
                            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                fontSize: "1.2rem",
                                color: "#4285F4",
                                pointerEvents: isLoading ? "none" : "auto",
                                transition: "color 0.3s ease",
                            }}
                            title={showPassword ? "Hide Password" : "Show Password"}
                        ></i>
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        disabled={isLoading}
                        className="login-button"
                    >
                        {isLoading ? "Processing..." : "Login"}
                    </button>
                </form>
                <div>
                    <span
                        style={forgotPasswordStyle}
                        onClick={() => !isLoading && navigate("/ForgotPassword")}
                        className="forgot-password"
                    >
                        Forgot Password?
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;