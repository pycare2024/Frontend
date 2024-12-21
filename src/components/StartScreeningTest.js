import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreeningTest.css";

function StartScreeningTest() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [patientDetails, setPatientDetails] = useState({
        Name: "",
        Age: "",
        Gender: "",
        Location: "",
        Mobile: "",
        Problem: "",
    });

    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const navigate = useNavigate();

    // Handle phone number check
    const handlePhoneCheck = async () => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phoneNumber}`);
            const result = await response.json();

            if (response.ok) {
                setIsRegistered(true);
                setShowRegistrationForm(false);
            } else {
                setIsRegistered(false);
                setShowRegistrationForm(true);
            }
        } catch (error) {
            console.error("Error checking phone number:", error);
        }
    };

    // Handle input changes for registration form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle patient registration
    const handleRegistration = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/patientRoute/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientDetails),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registration successful! Do you want to take the screening test?");
                navigate("/start-screening-test");
            } else {
                alert(result.error || "Failed to register patient.");
            }
        } catch (error) {
            console.error("Error registering patient:", error);
        }
    };

    return (
        <div className="start-screening-test-container">
            <div className="card">
                <h1 className="title">Patient Registration</h1>
                {!showRegistrationForm ? (
                    <div className="phone-check">
                        <label className="label">
                            Enter Phone Number:
                            <input
                                type="text"
                                className="input"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </label>
                        <button className="button" onClick={handlePhoneCheck}>
                            Check
                        </button>
                        {isRegistered && (
                            <p className="message success">You are already registered.</p>
                        )}
                        {!isRegistered && phoneNumber && (
                            <p className="message error">Patient not registered. Please register.</p>
                        )}
                    </div>
                ) : isRegistered ? (
                    <div className="registered">
                        <p className="message success">
                            You are already registered. Do you want to take the screening test?
                        </p>
                        <button className="button" onClick={() => navigate("/start-screening-test")}>
                            Yes
                        </button>
                    </div>
                ) : (
                    <div className="registration-form">
                        <h2 className="form-title">Register as a New Patient</h2>
                        <div className="form-grid">
                            {Object.keys(patientDetails).map((key) => (
                                <div className="form-group" key={key}>
                                    <label className="label">{key}:</label>
                                    <input
                                        type={key === "Age" || key === "Mobile" ? "number" : "text"}
                                        className="input"
                                        name={key}
                                        placeholder={`Enter ${key}`}
                                        value={patientDetails[key]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="button submit" onClick={handleRegistration}>
                            Register
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StartScreeningTest;