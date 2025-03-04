import React, { useEffect, useState } from "react";
import "./Doctors.css"; // Import CSS for styling
import { FaUserPlus, FaTrash } from "react-icons/fa"; // Icons for better visual appeal

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
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

    const handleAddDoctor = async () => {
        console.log("Add Doctor button clicked");

        if (!validateForm()) {
            console.log("Form validation failed", fieldErrors);
            return;
        }

        const doctorWithId = { ...newDoctor, id: generateDoctorId() };
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

            console.log("Doctor added successfully ! ✅");

            // ✅ Display a success message using state or alert
            alert("Doctor registered successfully!");

            setShowAddForm(false);
            setNewDoctor({
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
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete doctor");
            fetchDoctors();
        } catch (error) {
            setError(error.message);
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
                        <h2>Add Doctor</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="doctor-form">
                            <input
                                type="text"
                                placeholder="Id Auto-Generated"
                                value={newDoctor.id}
                                onChange={(e) => setNewDoctor({ ...newDoctor, id: e.target.value })}
                                className={fieldErrors.id ? "input-error" : ""}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                value={newDoctor.Name}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Name: e.target.value })}
                                className={fieldErrors.Name ? "input-error" : ""}
                                required
                            />
                            <input
                                type="date"
                                placeholder="Date of Birth"
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

                            <input
                                type="number"
                                placeholder="Age"
                                value={newDoctor.Age}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Age: e.target.value })}
                                className={fieldErrors.Age ? "input-error" : ""}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={newDoctor.Pincode}
                                onChange={(e) => { setNewDoctor({ ...newDoctor, Pincode: e.target.value }); fetchCityFromPincode(e.target.value); }}
                                required
                            />
                            <input type="text" placeholder="City" value={newDoctor.City} readOnly required />
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
                            <input
                                type="text"
                                placeholder="Login ID"
                                value={newDoctor.loginId}
                                onChange={(e) => setNewDoctor({ ...newDoctor, loginId: e.target.value })}
                                className={fieldErrors.loginId ? "input-error" : ""}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newDoctor.password}
                                onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                                className={fieldErrors.password ? "input-error" : ""}
                                required
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
                                onChange={(e) => setNewDoctor({ ...newDoctor, Mobile: e.target.value })}
                                className={fieldErrors.Mobile ? "input-error" : ""}
                                required
                            />
                            <div className="button-group">
                                <button onClick={handleAddDoctor} className="btn btn-success">
                                    Add Doctor
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
                    <div key={doctor._id} className="doctor-card">
                        <h3>{doctor.Name}<i class="fa-solid fa-stethoscope"></i></h3>
                        <p><strong>Age:</strong> {doctor.Age}</p>
                        <p><strong>Gender:</strong> {doctor.Gender}</p>
                        <p><strong>Qualification:</strong> {doctor.Qualification}</p>
                        <p><strong>Mobile:</strong> {doctor.Mobile}</p>
                        <p><strong>City:</strong> {doctor.City}</p>
                        <button onClick={() => handleDeleteDoctor(doctor._id)} className="btn btn-danger">
                            <FaTrash /> Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;