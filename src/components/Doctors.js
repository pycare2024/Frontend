import React, { useEffect, useState } from "react";
import "./Doctors.css"; // Import CSS for styling
import { FaUserPlus, FaTrash } from "react-icons/fa"; // Icons for better visual appeal
import "./doctorform.css";  //Importing css for add doctor page
import { useNavigate } from "react-router-dom";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        id: "",
        Name: "",
        City: "",
        Qualification: "",
        loginId: "",
        password: "",
        Gender: "",
        Mobile: "",
        Role: "",
        platformType: "" // 👈 Add this
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const qualifications = ["M.phil Clinical Psycology", "M A Psychology"];

    const platforms = ["marketplace", "corporate", "school"];

    const Roles = ["Therapist", "Consultant"];

    useEffect(() => {
        fetchDoctors();
    }, []);

    const navigate = useNavigate();

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

    const generateDoctorId = () => {
        const initials = newDoctor.Name?.split(" ").map(w => w[0].toUpperCase()).join("").slice(0, 2) || "DR";
        const randomDigits = Math.floor(100 + Math.random() * 900);
        return `${initials}${randomDigits}`; // e.g., AG517
    };

    const generateRandomPassword = (length = 8) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = ["Name", "City", "Qualification", "Gender", "Mobile", "Role"];

        requiredFields.forEach((field) => {
            if (!newDoctor[field]) {
                errors[field] = true;
            }
        });

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
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

        const doctorId = generateDoctorId();
        const autoPassword = generateRandomPassword(8);
        setNewDoctor(prev => ({ ...prev, password: autoPassword }));

        if (!validateForm()) {
            console.log("Form validation failed", fieldErrors);
            return;
        }

        const doctorWithId = { ...newDoctor, id: doctorId, loginId: doctorId, password: autoPassword }; // Set loginId same as id

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
            alert(`Doctor registered successfully!\nLogin ID: ${doctorId}\nPassword: ${autoPassword}`);
            await handleSendCredentials(doctorWithId);

            setShowAddForm(false);
            setNewDoctor({
                id: "",
                Name: "",
                City: "",
                Qualification: "",
                password: "", // Keep password as it is
                Gender: "",
                Mobile: "",
                Role: "",
                platformType: "",
            });
            setFieldErrors({});
            fetchDoctors();
        } catch (error) {
            console.error("Fetch error:", error.message);
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setNewDoctor({
            id: "",
            Name: "",
            City: "",
            Qualification: "",
            loginId: "",
            password: "",
            Gender: "",
            Mobile: "",
            Role: "",
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="doctors-page">
            <h1 style={{ color: "#4285F4", fontWeight: "bold" }}>Doctors List</h1>
            <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
                <FaUserPlus /> {showAddForm ? "Cancel" : "Add Doctor"}
            </button>

            {showAddForm && (

                <div className="form-overlay">
                    <div className="form-modal">
                        <h2 class="add-doctor" style={{ color: "#4285F4" }}>ADD DOCTOR</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="doctor-form" >
                            <input id="name"
                                type="text"
                                placeholder="Id Auto-Generated(Type 1)"
                                value={newDoctor.id}
                                readOnly
                            />
                            <input id="name"
                                type="text"
                                placeholder="Name"
                                value={newDoctor.Name}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Name: e.target.value })}
                                className={fieldErrors.Name ? "input-error" : ""}
                                required
                            />
                            <input type="text" placeholder="City" value={newDoctor.City} onChange={(e) => setNewDoctor({ ...newDoctor, City: e.target.value })} required />
                            <select
                                value={newDoctor.Qualification}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Qualification: e.target.value })}
                                required
                            >
                                <option value="">Select Qualification</option>
                                {qualifications.map((qualification, index) => (
                                    <option key={index} value={qualification}>{qualification}</option>
                                ))}
                            </select>
                            <select
                                value={newDoctor.Role}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Role: e.target.value })}
                                required
                            >
                                <option value="">Select Role</option>
                                {Roles.map((Role, index) => (
                                    <option key={index} value={Role}>{Role}</option>
                                ))}
                            </select>
                            <select
                                value={newDoctor.platformType}
                                onChange={(e) => setNewDoctor({ ...newDoctor, platformType: e.target.value })}
                                required
                            >
                                <option value="">Select Platform</option>
                                {platforms.map((type, index) => (
                                    <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                            <input type="text" placeholder="Login ID (Auto-generated)" value={newDoctor.loginId} readOnly />
                            <input
                                type="text"
                                placeholder="Password (Auto-generated)"
                                value={newDoctor.password}
                                readOnly
                            />
                            <select
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
                            <input
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
                                <button onClick={handleAddDoctor} className="btn btn-success" style={{ backgroundColor: "#4285F4" }}>
                                    Register Doctor
                                </button>
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
                    <div key={doctor._id}
                        className="doctor-card"
                        onClick={() => navigate(`/doctor/${doctor._id}`)}
                        style={{ cursor: "pointer" }}>
                        <h3>{doctor.Name}<i class="fa-solid fa-stethoscope"></i></h3>
                        <p><strong>City:</strong> {doctor.City}</p>
                        <p><strong>Gender:</strong> {doctor.Gender}</p>
                        <p><strong>Qualification:</strong> {doctor.Qualification}</p>
                        <p><strong>Mobile:</strong> {doctor.Mobile}</p>

                        {/* <button onClick={() => handleDeleteDoctor(doctor.id)} className="btn btn-danger">
                            <FaTrash /> Remove
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;