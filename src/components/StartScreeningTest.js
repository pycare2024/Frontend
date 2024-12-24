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
    const [patientId, setPatientId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPincodeInput, setShowPincodeInput] = useState(true); // To toggle pincode and location display
    const [validationErrors, setValidationErrors] = useState({});

    // Helper to validate pincode
    const fetchLocationFromPincode = async (pincode) => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            if (data[0].Status === "Success") {
                return data[0].PostOffice[0].District;
            }
            return null;
        } catch (error) {
            console.error("Error fetching location:", error);
            return null;
        }
    };

    // Handle phone number check
    const handlePhoneCheck = async () => {
        if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phoneNumber}`);
            const result = await response.json();

            if (response.ok) {
                setIsRegistered(true);
                setShowRegistrationForm(false);
                setPatientId(result.patientId);
                alert("You are already registered. Redirecting to the test...");
                navigate("/ScreenTestForm", { state: { patientId: result.patientId } });
            } else {
                setIsRegistered(false);
                setShowRegistrationForm(true);
            }
        } catch (error) {
            console.error("Error checking phone number:", error);
            alert("There was an error checking the phone number. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes for registration form
    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === "Location" && value.length === 6) {
            const location = await fetchLocationFromPincode(value);
            if (location) {
                setShowPincodeInput(false);
                setPatientDetails((prevDetails) => ({
                    ...prevDetails,
                    Location: location,
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    Location: "Invalid pincode. Please try again.",
                }));
                return;
            }
        } else if (name === "Location") {
            setShowPincodeInput(true); // Reset if pincode length is less than 6
        }

        setPatientDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // Clear specific validation errors
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    // Handle registration form validation
    const handleRegistration = async () => {
        const errors = {};

        if (!patientDetails.Name) errors.Name = "Name is required.";
        if (!patientDetails.Age || patientDetails.Age < 10 || patientDetails.Age > 120) {
            errors.Age = "Age must be between 10 and 120.";
        }
        if (!["Male", "Female", "Other"].includes(patientDetails.Gender)) {
            errors.Gender = "Gender must be Male, Female, or Other.";
        }
        if (!patientDetails.Location) errors.Location = "Location is required.";
        if (!/^\d{10}$/.test(patientDetails.Mobile)) errors.Mobile = "Please enter a valid 10-digit mobile number.";

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // Do not proceed if there are validation errors
        }

        setLoading(true);
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/patientRoute/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientDetails),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registration successful! Do you want to take the screening test?");
                setPatientId(result.patientId);
                navigate("/ScreenTestForm", { state: { patientId: result.patientId } });
            } else {
                alert(result.error || "Failed to register patient.");
            }
        } catch (error) {
            console.error("Error registering patient:", error);
            alert("There was an error during registration. Please try again later.");
        } finally {
            setLoading(false);
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
                                placeholder="Enter your phone number"
                            />
                        </label>
                        <button className="button" onClick={handlePhoneCheck} disabled={loading}>
                            {loading ? "Checking..." : "Check"}
                        </button>
                    </div>
                ) : (
                    <div className="registration-form">
                        <h2 className="form-title">Register as a New Patient</h2>
                        <div className="form-grid">
                            {Object.keys(patientDetails).map((key) => (
                                <div className="form-group" key={key}>
                                    <label className="label">{key}:</label>
                                    {key === "Gender" ? (
                                        <select
                                            className="input"
                                            name={key}
                                            value={patientDetails[key]}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : key === "Location" ? (
                                        showPincodeInput ? (
                                            <input
                                                type="text"
                                                className="input"
                                                name={key}
                                                placeholder="Enter Pincode"
                                                value={patientDetails[key]}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <>
                                                <p className="location-display">
                                                    Location: {patientDetails[key]}
                                                </p>
                                                <button
                                                    className="button change-location"
                                                    onClick={() => {
                                                        setShowPincodeInput(true);
                                                        setPatientDetails((prevDetails) => ({
                                                            ...prevDetails,
                                                            Location: "",
                                                        }));
                                                    }}
                                                >
                                                    Change Location
                                                </button>
                                            </>
                                        )
                                    ) : (
                                        <input
                                            type={key === "Age" || key === "Mobile" ? "number" : "text"}
                                            className="input"
                                            name={key}
                                            placeholder={`Enter ${key}`}
                                            value={patientDetails[key]}
                                            onChange={handleInputChange}
                                        />
                                    )}
                                    {validationErrors[key] && (
                                        <p className="error-message">{validationErrors[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="button submit" onClick={handleRegistration} disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StartScreeningTest;