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
    const [selectedProblems, setSelectedProblems] = useState([]);

    const navigate = useNavigate();

    const handleProblemChange = (problemKey) => {
        setSelectedProblems((prev) =>
            prev.includes(problemKey)
                ? prev.filter((p) => p !== problemKey)
                : [...prev, problemKey]
        );
    };

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
        const { Name, Age, Gender, Location, Mobile } = formData;
        try {
            const res = await fetch("https://backend-xhl4.onrender.com/patientRoute/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name,
                    Age,
                    Gender,
                    Location,
                    Mobile,
                    Problem: selectedProblems, // ✅ pass array here
                    userType: "retail",   
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("You're all set! What would you like to do next?");
                setShowNextChoice(true);
                localStorage.setItem("patientId", data.patientId);
                localStorage.setItem("patientName", Name);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
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

            {step === 3 && (
                <div className="step-section">
                    <h3>Tell us what you're experiencing</h3>
                    <div className="problem-checkbox-group">
                        {[
                            { key: "anxiety", label: "Anxiety", symptoms: "Worry, nervousness, racing thoughts" },
                            { key: "depression", label: "Depression", symptoms: "Sadness, lack of interest, low energy" },
                            { key: "ocd", label: "OCD", symptoms: "Repetitive thoughts or behaviors" },
                            { key: "ptsd", label: "PTSD", symptoms: "Flashbacks, nightmares, hypervigilance" },
                            { key: "sleep", label: "Sleep Issues", symptoms: "Trouble falling/staying asleep" },
                        ].map((problem) => (
                            <label key={problem.key} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={problem.key}
                                    checked={selectedProblems.includes(problem.key)}
                                    onChange={() => handleProblemChange(problem.key)}
                                />
                                <span><strong>{problem.label}</strong><br /><small>{problem.symptoms}</small></span>
                            </label>
                        ))}
                    </div>
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
                                    phoneNumber: formData.Mobile,
                                    patientGender: formData.Gender,
                                    problems: selectedProblems // ✅ pass selected problems
                                }
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