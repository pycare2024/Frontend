import React, { useEffect, useState } from "react";
import "./Doctors.css"; // Import CSS for styling
import { FaUserPlus, FaTrash } from "react-icons/fa"; // Icons for better visual appeal
import "./doctorform.css";  //Importing css for add doctor page

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false); // Controls OTP input visibility
    const [otp, setOtp] = useState(""); // Stores the entered OTP
    const [newDoctor, setNewDoctor] = useState({
        id: "",
        Name: "",
        Age: "",
        Pincode: "",
        City: "",
        Qualification: "",
        loginId: "",
        password: "",
        Gender: "",
        Mobile: "",
        dob: ""
    });
    const [fieldErrors, setFieldErrors] = useState({});

    const qualifications = ["MBBS", "MD", "DO", "PhD", "DDS", "DMD", "MCh", "BAMS", "BHMS", "BPT"];

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute");
            if (!response.ok) throw new Error("Failed to fetch doctors");
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCityFromPincode = async (pincode) => {
        if (pincode.length === 6) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = await response.json();
                if (data[0]?.Status === "Success") {
                    setNewDoctor((prev) => ({ ...prev, City: data[0].PostOffice[0].District }));
                }
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        }
    };

    const generateDoctorId = () => {
        const cityPart = newDoctor.City.slice(0, 4).toUpperCase();
        const datePart = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const mobilePart = newDoctor.Mobile.slice(-5);
        return `${cityPart}${datePart}${mobilePart}`;
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = ["id", "Name", "Age", "Pincode", "City", "Qualification", "loginId", "password", "Gender", "Mobile"];

        requiredFields.forEach((field) => {
            if (!newDoctor[field]) {
                errors[field] = true;
            }
        });

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSendOTP = async () => {
        if (!newDoctor.Mobile || newDoctor.Mobile.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${newDoctor.Mobile}`);
            const data = await response.json();
            if (response.ok) {
                alert("OTP sent successfully! Please enter the OTP to proceed.");
                setShowOTPInput(true);  // Show OTP input field
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP.");
        }
    };

    const handleSendCredentials = async (doctor) => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/CredentialsRoute/send-credentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: doctor.Name,
                    mobile: doctor.Mobile,
                    loginId: doctor.id, // ID is used as loginId
                    password: doctor.password
                }),
            });
    
            // const data = await response.json();
    
            if (response.ok) {
                alert("Credentials sent to doctor via WhatsApp!");
            } else {
                alert("Failed to send credentials via WhatsApp.");
            }
        } catch (error) {
            console.error("Error sending credentials:", error);
            alert("Error sending WhatsApp message.");
        }
    };

    const handleAddDoctor = async () => {
        console.log("Add Doctor button clicked");
    
        if (!validateForm()) {
            console.log("Form validation failed", fieldErrors);
            return;
        }
    
        const doctorId = generateDoctorId();
        const doctorWithId = { ...newDoctor, id: doctorId, loginId: doctorId }; // Set loginId same as id
    
        console.log("Doctor Data:", doctorWithId);
    
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(doctorWithId)
            });
    
            console.log("Response status:", response.status);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error(errorData.message || "Failed to add doctor");
            }
    
            console.log("Doctor added successfully! ✅");
    
            // ✅ Display login credentials after successful registration
            alert(`Doctor registered successfully!\nLogin ID: ${doctorId}\nPassword: ${newDoctor.password}`);
            await handleSendCredentials(doctorWithId);
    
            setShowAddForm(false);
            setNewDoctor({
                id: "",
                Name: "",
                Age: "",
                Pincode: "",
                City: "",
                Qualification: "",
                password: "", // Keep password as it is
                Gender: "",
                Mobile: "",
                dob: ""
            });
            setFieldErrors({});
            fetchDoctors();
        } catch (error) {
            console.error("Fetch error:", error.message);
            setError(error.message);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${newDoctor.Mobile}/${otp}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Incorrect OTP. Please try again.");
                return;
            }

            alert("OTP verified successfully!");
            setShowOTPInput(false); // Hide OTP input
            handleAddDoctor(); // ✅ Register doctor after successful OTP verification

        } catch (error) {
            console.error("OTP verification failed:", error);
            alert("Error verifying OTP.");
        }
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setNewDoctor({
            id: "",
            Name: "",
            Age: "",
            Address: "",
            Qualification: "",
            loginId: "",
            password: "",
            Gender: "",
            Mobile: ""
        });
        setFieldErrors({});
    };

    const handleDeleteDoctor = async (id) => {
        if (!window.confirm("Are you sure you want to remove this doctor?")) return;

        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/delete/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                fetchDoctors(); // Refresh list
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Failed to delete doctor. Please try again.");
            console.error("Delete error:", error);
        }
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--; // Adjust if birthday hasn't occurred yet this year
        }

        return age;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="doctors-page">
            <h1 className="page-title">Doctors List</h1>
            <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary add-btn">
                <FaUserPlus /> {showAddForm ? "Cancel" : "Add Doctor"}
            </button>

            {showAddForm && (
                
                <div className="form-overlay">
                    <div className="form-modal">
                        <h2 class="add-doctor">ADD DOCTOR</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="doctor-form" >
                            <input id="name"
                                type="text"
                                placeholder="Id Auto-Generated(Type 1)"
                                value={newDoctor.id}
                                onChange={(e) => setNewDoctor({ ...newDoctor, id: e.target.value })}
                                className={fieldErrors.id ? "input-error" : ""}
                                required
                            />
                            <input id="name"
                                type="text"
                                placeholder="Name"
                                value={newDoctor.Name}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Name: e.target.value })}
                                className={fieldErrors.Name ? "input-error" : ""}
                                required
                            />
                            <input id="name"
                                type="date"
                                placeholder ="Date of Birth"
                                value={newDoctor.dob}
                                onChange={(e) => {
                                    const dob = e.target.value;
                                    setNewDoctor((prev) => ({
                                        ...prev,
                                        dob: dob,
                                        Age: calculateAge(dob) // Automatically calculate and set Age
                                    }));
                                }}
                                required
                            />

                            <input id="name" 
                                type="number"
                                placeholder="Age"
                                value={newDoctor.Age}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Age: e.target.value })}
                                className={fieldErrors.Age ? "input-error" : ""}
                                required
                            />
                            <input id="name"
                                type="text"
                                placeholder="Pincode"
                                value={newDoctor.Pincode}
                                onChange={(e) => { setNewDoctor({ ...newDoctor, Pincode: e.target.value }); fetchCityFromPincode(e.target.value); }}
                                required
                            />
                            <input id="name" type="text" placeholder="City" value={newDoctor.City} readOnly required />
                            <select id="name"
                                value={newDoctor.Qualification}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Qualification: e.target.value })}
                                required
                            >
                                <option value="">Select Qualification</option>
                                {qualifications.map((qualification, index) => (
                                    <option key={index} value={qualification}>{qualification}</option>
                                ))}
                            </select>
                            <input id="name"
                                type="text"
                                placeholder="Login ID Auto-generated(Type 1)"
                                value={newDoctor.loginId}
                                onChange={(e) => setNewDoctor({ ...newDoctor, loginId: e.target.value })}
                                className={fieldErrors.loginId ? "input-error" : ""}
                                required
                            />
                            <input id="name"
                                type="password"
                                placeholder="Password"
                                value={newDoctor.password}
                                onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                                className={fieldErrors.password ? "input-error" : ""}
                                required
                            />
                            <select id="name"
                                value={newDoctor.Gender}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Gender: e.target.value })}
                                className={fieldErrors.Gender ? "input-error" : ""}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input id="name"
                                type="text"
                                placeholder="Mobile"
                                maxLength="10"
                                value={newDoctor.Mobile}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d{0,10}$/.test(input)) {
                                        setNewDoctor({ ...newDoctor, Mobile: input });
                                    }
                                }}
                                className={fieldErrors.Mobile ? "input-error" : ""}
                                required
                            />
                            
                            {newDoctor.Mobile.length > 0 && newDoctor.Mobile.length < 10 && (
                                <p style={{ color: "red", fontSize: "12px" }}>Enter a valid 10-digit mobile number</p>
                            )}
                            <div className="button-group">
                                {/* Step 1: Send OTP before registering */}
                                <button onClick={handleSendOTP} className="btn btn-success">Send OTP</button>

                                {/* Step 2: Show OTP Input after OTP is sent */}
                                {showOTPInput && (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                        <button onClick={handleVerifyOTP} className="btn btn-primary">Verify OTP</button>
                                    </div>
                                )}
                                <button onClick={handleCancel} className="btn btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="doctor-list">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="doctor-card">
                        <h3>{doctor.Name}<i class="fa-solid fa-stethoscope"></i></h3>
                        <p><strong>Age:</strong> {doctor.Age}</p>
                        <p><strong>Gender:</strong> {doctor.Gender}</p>
                        <p><strong>Qualification:</strong> {doctor.Qualification}</p>
                        <p><strong>Mobile:</strong> {doctor.Mobile}</p>
                        <p><strong>City:</strong> {doctor.City}</p>
                        <button onClick={() => handleDeleteDoctor(doctor.id)} className="btn btn-danger">
                            <FaTrash /> Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;