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
        Address: "",
        Qualification: "",
        loginId: "",
        password: "",
        Gender: "",
        Mobile: ""
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

    const validateForm = () => {
        const errors = {};
        const requiredFields = ["id", "Name", "Age", "Address", "Qualification", "loginId", "password", "Gender", "Mobile"];

        requiredFields.forEach((field) => {
            if (!newDoctor[field]) {
                errors[field] = true;
            }
        });

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddDoctor = async () => {
        if (!validateForm()) return;

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDoctor)
            });
            if (!response.ok) throw new Error("Failed to add doctor");
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
            fetchDoctors();
        } catch (error) {
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
                                placeholder="Id"
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
                                type="number"
                                placeholder="Age"
                                value={newDoctor.Age}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Age: e.target.value })}
                                className={fieldErrors.Age ? "input-error" : ""}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={newDoctor.Address}
                                onChange={(e) => setNewDoctor({ ...newDoctor, Address: e.target.value })}
                                className={fieldErrors.Address ? "input-error" : ""}
                                required
                            />
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
                        <p><strong>Address:</strong> {doctor.Address}</p>
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