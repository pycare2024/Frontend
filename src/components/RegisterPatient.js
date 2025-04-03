import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPatient.css";
import { useLocation } from "react-router-dom";

const RegisterPatient = () => {

    const location = useLocation();
    const passedPhoneNumber = location.state?.phoneNumber || "";
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        Name: "",
        Age: "",
        Gender: "",
        Location: "",
        Mobile: passedPhoneNumber,
        OTP: "",
        Problem: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showNextChoice, setShowNextChoice] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendOTP = async () => {
        try {
            const res = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${formData.Mobile}`);
            const data = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setStep(2);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to send OTP.");
        }
    };

    const verifyOTP = async () => {
        try {
            const res = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${formData.Mobile}/${formData.OTP}`);
            const data = await res.json();
            if (res.ok) {
                setOtpVerified(true);
                setStep(3);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to verify OTP.");
        }
    };

    const handleSubmit = async () => {
        const { Name, Age, Gender, Location, Mobile, Problem } = formData;
        try {
            const res = await fetch("https://backend-xhl4.onrender.com/patientRoute/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Name, Age, Gender, Location, Mobile, Problem }),
            });
            const data = await res.json();

            console.log(data.patientId);
            if (res.ok) {
                setSuccess("You're all set! What would you like to do next?");
                setShowNextChoice(true);
                localStorage.setItem("patientId", data.patientId);
                localStorage.setItem("patientName", Name);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Registration failed.");
        }
    };

    // ✅ RETURN JSX OUTSIDE of all functions
    return (
        <div className="register-container" style={{ marginTop: "5%" }}>
            <div className="step-indicator">
                <div className="progress-line">
                    <div className={`circle ${step >= 1 ? "active" : ""}`}>👤</div>
                    <div className={`line ${step >= 2 ? "filled" : ""}`}></div>
                    <div className={`circle ${step >= 2 ? "active" : ""}`}>🔒</div>
                    <div className={`line ${step >= 3 ? "filled" : ""}`}></div>
                    <div className={`circle ${step === 3 ? "active" : ""}`}>💬</div>
                </div>
                <div className="labels">
                    <span>Details</span>
                    <span>OTP</span>
                    <span>Problem</span>
                </div>
            </div>
            {step === 1 && (
                <div>
                    <h2>Welcome to PsyCare 👋</h2>
                    <p>Let’s start with a few details</p>

                    <input type="text" name="Name" placeholder="Full Name" value={formData.Name} onChange={handleChange} />
                    <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} />
                    <select name="Gender" value={formData.Gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" name="Location" placeholder="Location" value={formData.Location} onChange={handleChange} />
                    <input type="text" name="Mobile" placeholder="Mobile Number" value={formData.Mobile} onChange={handleChange} />
                    <button onClick={sendOTP}>Send OTP</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3>Enter the OTP sent to {formData.Mobile}</h3>
                    <input type="text" name="OTP" placeholder="Enter OTP" value={formData.OTP} onChange={handleChange} />
                    <button onClick={verifyOTP}>Verify OTP</button>
                </div>
            )}

            {step === 3 && otpVerified && (
                <div>
                    <h3>Tell us what you're experiencing</h3>
                    <select name="Problem" value={formData.Problem} onChange={handleChange}>
                        <option value="">Select a problem</option>
                        <option value="Anxiety">Anxiety</option>
                        <option value="Depression">Depression</option>
                        <option value="Stress">Stress</option>
                        <option value="Sleep Issues">Sleep Issues</option>
                        <option value="Relationship Issues">Relationship Issues</option>
                        <option value="Self-Esteem">Self-Esteem</option>
                        <option value="Other">Other</option>
                    </select>
                    <button onClick={handleSubmit}>Register</button>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

            {showNextChoice && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                    <button
                        onClick={() =>
                            navigate("/ScreenTestForm", {
                                state: {
                                    patientId: localStorage.getItem("patientId"),
                                    patientName: localStorage.getItem("patientName"),
                                    phoneNumber: formData.Mobile
                                },
                            })
                        }
                        style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "12px",
                            fontSize: "1rem",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Take a Screening Test
                    </button>

                    <button
                        onClick={() =>
                            navigate("/BookAppointment", {
                                state: {
                                    patientId: localStorage.getItem("patientId"),
                                    patientName: localStorage.getItem("patientName"),
                                    phoneNumber: formData.Mobile
                                },
                            })
                        }
                        style={{
                            backgroundColor: "#4285F4",
                            color: "white",
                            padding: "12px",
                            fontSize: "1rem",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Book Appointment Directly
                    </button>
                </div>
            )}
        </div>
    );
};

export default RegisterPatient;