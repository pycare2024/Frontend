import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ForgotPwDoctor() {
    const [loginId, setLoginId] = useState("");
    const [Mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/verifyCredentials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginId, Mobile, dob }), // Match backend field names
            });

            const data = await response.json();

            if (data.success) {
                // If credentials match, allow password reset
                const resetPasswordResponse = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/resetPassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ loginId, newPassword }),
                });

                const resetPasswordData = await resetPasswordResponse.json();
                setMessage(resetPasswordData.message);

                if (resetPasswordData.success) {
                    toast.success("Password reset successfully! Redirecting to login...", {
                        position: 'top-center',
                    });

                    setTimeout(() => {
                        navigate("/DoctorLogin");
                    }, 2000);
                } else {
                    toast.error("Failed to reset password. Please try again.", {
                        position: 'top-center',
                    });
                }
            } else {
                setMessage(data.message || "Invalid credentials, please check and try again.");
                toast.error(data.message || "Invalid credentials, please check and try again.", {
                    position: 'top-center',
                });
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.", {
                position: 'top-center',
            });
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Forgot Password</h2>
                {message && <p style={styles.message}>{message}</p>}
                
                <div style={styles.inputGroup}>
                    <label htmlFor="loginId" style={styles.label}>Login ID:</label>
                    <input
                        type="text"
                        id="loginId"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="Mobile" style={styles.label}>Mobile Number:</label>
                    <input
                        type="text"
                        id="Mobile"
                        value={Mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="dob" style={styles.label}>Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="newPassword" style={styles.label}>New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.submitButton}>
                    Reset Password
                </button>
            </form>

            {/* Toast Container to display notifications */}
            <ToastContainer />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fd)",
    },
    form: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "600",
    },
    inputGroup: {
        marginBottom: "20px",
        textAlign: "left",
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "5px",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "12px 20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.3s",
    },
    message: {
        color: "#d9534f",
        fontSize: "14px",
        marginBottom: "15px",
    },
    submitButton: {
        width: "100%",
        padding: "12px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default ForgotPwDoctor;