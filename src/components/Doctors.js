import React, { useEffect, useState } from "react";
import "./Doctors.css"; // Import CSS for styling
import { FaUserPlus, FaTrash } from "react-icons/fa"; // Icons for better visual appeal
import "./doctorform.css";  //Importing css for add doctor page
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        id: "",
        photo: "",
        Name: "",
        City: "",
        Qualification: "",
        loginId: "",
        password: "",
        Gender: "",
        Mobile: "",
        Role: "",
        platformType: "",
        consultsStudents: false, // ✅ NEW
        languagesSpoken: "",      // ✅ comma-separated input
        experienceYears: 0,
        experienceMonths: 0,      // ✅ number
        areaOfExpertise: "",      // ✅ comma-separated
        certifications: [],
        certificationNames: []        // ✅ file upload
    });
    const [certFiles, setCertFiles] = useState([]); // for certification file uploads

    const [fieldErrors, setFieldErrors] = useState({});

    const [photoFile, setPhotoFile] = useState(null);

    const platforms = ["marketplace", "corporate", "school"];

    const Roles = ["Therapist", "Consultant"];

    useEffect(() => {
        fetchDoctors();
    }, []);

    const areaOfExpertiseOptions = [
        "Child Psychology (6–12 years)",
        "Adolescent / Teen Psychology (13–18 yrs)",
        "Young Adults (18–25 yrs)",
        "Adults (25–45 yrs)",
        "Geriatric Psychology (45+ yrs)",
        "Couples & Relationship Therapy",
        "Family Therapy",
        "LGBTQIA+ Affirmative Therapy",
        "Parental Counselling",
        "Student Academic Stress Support",
        "Corporate / Employee Wellness",
        "Anxiety Disorders",
        "Depression",
        "Obsessive Compulsive Disorder (OCD)",
        "Panic Disorders",
        "Phobias",
        "Post-Traumatic Stress Disorder (PTSD)",
        "Attention Deficit Hyperactivity Disorder (ADHD)",
        "Autism Spectrum Disorders (ASD)",
        "Eating Disorders",
        "Grief & Loss",
        "Sleep Disorders",
        "Cognitive Behavioural Therapy (CBT)",
        "Rational Emotive Behaviour Therapy (REBT)",
        "Dialectical Behaviour Therapy (DBT)",
        "Mindfulness-Based Interventions",
        "Trauma-Informed Therapy",
        "Narrative Therapy",
        "Art-Based Therapy",
        "Play Therapy",
        "Behaviour Modification",
        "Hypnotherapy",
        "Career Counselling & Guidance",
        "Psychometric Testing & Interpretation"
    ];

    const certificationNameOptions = [
        { value: "Certificate in Cognitive Behavioural Therapy (CBT)", label: "CBT" },
        { value: "Certificate in Rational Emotive Behaviour Therapy (REBT)", label: "REBT" },
        { value: "Certificate in Dialectical Behaviour Therapy (DBT)", label: "DBT" },
        { value: "Certificate in Acceptance & Commitment Therapy (ACT)", label: "ACT" },
        { value: "Certificate in Transactional Analysis (TA)", label: "Transactional Analysis (TA)" },
        { value: "Certificate in Solution Focused Brief Therapy (SFBT)", label: "SFBT" },
        { value: "Certificate in Mindfulness-Based Cognitive Therapy (MBCT)", label: "MBCT" },
        { value: "Certificate in Narrative Therapy", label: "Narrative Therapy" },
        { value: "Certificate in Gestalt Therapy", label: "Gestalt Therapy" },
        { value: "Certificate in Hypnotherapy", label: "Hypnotherapy" },
        { value: "Certificate in Art-Based Therapy", label: "Art-Based Therapy" },
        { value: "Certificate in Music Therapy", label: "Music Therapy" },
        { value: "Certificate in Dance Movement Therapy", label: "Dance Movement Therapy" },
        { value: "Certificate in Play Therapy", label: "Play Therapy" },
        { value: "Certificate in Drama Therapy", label: "Drama Therapy" },
        { value: "Trauma-Informed Care Certification", label: "Trauma-Informed Care" },
        { value: "Suicide Prevention & Crisis Intervention Training", label: "Suicide Prevention" },
        { value: "Certificate in Grief & Loss Counselling", label: "Grief & Loss" },
        { value: "Certificate in Child Sexual Abuse Counselling", label: "Child Sexual Abuse" },
        { value: "LGBTQIA+ Affirmative Counselling Certificate", label: "LGBTQIA+ Affirmative" },
        { value: "Certificate in Gender & Sexuality Studies for Counsellors", label: "Gender & Sexuality" },
        { value: "Certificate in Psychometric Testing & Interpretation", label: "Psychometric Testing" },
        { value: "Certificate in Clinical Assessments (like Rorschach, TAT, etc.)", label: "Clinical Assessments" },
        { value: "Certificate in Career Assessment & Guidance", label: "Career Assessment" },
        { value: "Certificate in School Counselling", label: "School Counselling" },
        { value: "Certificate in Family and Marriage Counselling", label: "Family/Marriage Counselling" },
        { value: "Certificate in Addiction Counselling", label: "Addiction Counselling" },
        { value: "Certificate in Behaviour Modification", label: "Behaviour Modification" }
    ];

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

    const areaOptions = areaOfExpertiseOptions.map((item) => ({
        value: item,
        label: item
    }));

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

    const uploadPhotoToBackend = async (file, doctorId) => {
        const formData = new FormData();
        formData.append("photo", file); // must match backend 'upload.single("photo")'

        const response = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/uploadPhoto/${doctorId}`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        return data.url; // cloudinary URL returned from backend
    };

    const handleAddDoctor = async () => {
        const doctorId = generateDoctorId();
        const autoPassword = generateRandomPassword(8);

        if (!validateForm()) return;

        const doctorData = {
            ...newDoctor,
            id: doctorId,
            loginId: doctorId,
            password: autoPassword,
            photo: "",
            areaOfExpertise: newDoctor.areaOfExpertise,
            experienceYears: newDoctor.experienceYears,
            experienceMonths: newDoctor.experienceMonths,
            certifications: [],
            certificationNames: newDoctor.certificationNames
        };

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(doctorData)
            });

            if (!response.ok) throw new Error("Doctor registration failed");
            const savedDoctor = await response.json();
            const doctorMongoId = savedDoctor.doctor?._id;

            if (photoFile && doctorMongoId) {
                const formData = new FormData();
                formData.append("photo", photoFile);
                await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/uploadPhoto/${doctorMongoId}`, {
                    method: "POST",
                    body: formData
                });
            }

            if (certFiles.length > 0 && doctorMongoId) {
                const formData = new FormData();
                certFiles.forEach((file) => formData.append("certifications", file));
                await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/uploadCertifications/${doctorMongoId}`, {
                    method: "POST",
                    body: formData
                });
            }

            alert(`Doctor registered successfully!\nLogin ID: ${doctorId}\nPassword: ${autoPassword}`);
            setShowAddForm(false);
            setPhotoFile(null);
            setCertFiles([]);
            setNewDoctor({
                id: "",
                Name: "",
                City: "",
                Qualification: [],
                loginId: "",
                password: "",
                Gender: "",
                Mobile: "",
                Role: "",
                platformType: "",
                photo: "",
                consultsStudents: false,
                languagesSpoken: [],
                experienceYears: "",
                areaOfExpertise: "",
                certifications: [],
                certificationNames: "",
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
            <h1 style={{ color: "#4285F4", fontWeight: "bold", textAlign: "center" }}>Experts List</h1>
            <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
                <FaUserPlus /> {showAddForm ? "Cancel" : "Add Experts"}
            </button>

            {showAddForm && (

                <div className="form-overlay">
                    <div className="form-modal">
                        <h2 class="add-doctor" style={{ color: "#4285F4" }}>ADD EXPERT</h2>
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
                            <label>Qualifications</label>
                            <select
                                multiple
                                value={newDoctor.Qualification}
                                onChange={(e) =>
                                    setNewDoctor({
                                        ...newDoctor,
                                        Qualification: Array.from(e.target.selectedOptions, (option) => option.value),
                                    })
                                }
                            >
                                {[
                                    "B.A (H) Applied Psychology",
                                    "BA(Hons) in Social Science",
                                    "BA Psychology",
                                    "BA Applied Psychology",
                                    "BSc Psychology",
                                    "B.Sc (Nursing)",
                                    "Bachelor of Arts (Honours) in Psychology",
                                    "Bachelor in Applied Psychology",
                                    "Doctorate in Psychology",
                                    "Diploma in Counseling",
                                    "Diploma in Psychology",
                                    "M.A (Clinical Psychology)",
                                    "M.A Clinical Psychology",
                                    "M.A Counselling Psychology",
                                    "M.A in Psychology with counselling specialization",
                                    "M.A. Applied Psychology (Clinical and Counseling Practice)",
                                    "M.A. Clinical Psychology + PG Diploma (Pursuing)",
                                    "M.A. Clinical Psychology",
                                    "M.A. Psychology, PGDGC",
                                    "MA +B.ED + Diploma NCERT, Diploma ISTD",
                                    "MA (Applied Psychology)",
                                    "MA (Clinical Psychology)",
                                    "MA Applied Psychology",
                                    "MA Clinical Psychology",
                                    "MA Counselling Psychology",
                                    "MA Psychology",
                                    "MA Psychology+ PG Diploma Counselling Psychology",
                                    "MA in Applied Psychology",
                                    "MA in Applied Psychology (Specialized in Clinical and Counseling)",
                                    "MA in Clinical Psychology",
                                    "MA in Counselling Psychology",
                                    "MA in Psychology",
                                    "MA(Psy) PGDRP PGDGC",
                                    "Mac Clinical Psychology",
                                    "Masters",
                                    "Masters Clinical Psychology",
                                    "Masters Degree in Applied Psychology (Clinical Specialisation)",
                                    "Masters In Applied Psychology (Clinical Psychology) and B.Ed",
                                    "Masters in Clinical Psychology",
                                    "Masters in Counselling Psychology",
                                    "Masters in Lifespan Counselling",
                                    "Masters in Psychology",
                                    "Masters of Science in Psychology",
                                    "Masters in child, clinical and counselling psychology",
                                    "MPhil in Clinical Psychology",
                                    "M.Phil in Clinical Psychology",
                                    "M.Sc (Cl.Psy)",
                                    "M.Sc Counseling Psychology",
                                    "M.Sc Clinical Psychology",
                                    "M.Sc in Applied Psychology",
                                    "M.Sc in Clinical Psychology",
                                    "M.Sc in Psychology (Clinical and Counseling Psychology)",
                                    "M.Sc. Clinical Psychology",
                                    "M.Sc. Psychology (Clinical)",
                                    "MSc Clinical Psycho Oncology",
                                    "MSc Clinical Psychology",
                                    "MSc Counselling Psychology",
                                    "MSc Counseling Psychology",
                                    "MSc Psychology",
                                    "MSc in Applied Psychology",
                                    "MSc in Clinical Psychology",
                                    "MSc in Counselling Psychology",
                                    "MSc in Psychology",
                                    "MSc Psychology with Clinical Specialization",
                                    "MSCCFT",
                                    "MSW",
                                    "PG Diploma in Clinical Psychology",
                                    "PG Diploma in Counseling and Psychotherapy",
                                    "PG Diploma in Guidance and Career Counseling",
                                    "PG Diploma in Guidance and Counselling",
                                    "PG Diploma in Mental Health",
                                    "PGD in Child Psychology",
                                    "PGD in Gender Studies",
                                    "PGD-PH",
                                    "PGDGC",
                                    "PGDRP",
                                    "PGDRP RCI License",
                                    "PGDDRM",
                                    "Post Graduate (MSc Clinical Psychology)",
                                    "Post Graduate in Psychology",
                                    "Post Graduate Diploma in Rehabilitation Psychology",
                                    "Post Graduation",
                                    "Post Graduation Diploma in Rehabilitation Psychology",
                                    "PsyD"
                                ].map((deg) => (
                                    <option key={deg} value={deg}>
                                        {deg}
                                    </option>
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
                            {newDoctor.platformType === "marketplace" && (
                                <label style={{ fontSize: "14px", marginTop: "10px" }}>
                                    <input
                                        type="checkbox"
                                        checked={newDoctor.consultsStudents}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, consultsStudents: e.target.checked })}
                                    />
                                    &nbsp;Consults Students
                                </label>
                            )}
                            <label>Languages Spoken</label>
                            <select
                                multiple
                                value={newDoctor.languagesSpoken}
                                onChange={(e) =>
                                    setNewDoctor({
                                        ...newDoctor,
                                        languagesSpoken: Array.from(e.target.selectedOptions, (option) => option.value),
                                    })
                                }
                            >
                                {[
                                    "English", "Hindi", "Bengali", "Spanish", "French", "Arabic", "Russian",
                                    "Mandarin", "German", "Portuguese", "Japanese", "Urdu", "Tamil",
                                    "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia"
                                ].map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <input
                                    type="number"
                                    placeholder="Years"
                                    min="0"
                                    value={newDoctor.experienceYears}
                                    onChange={(e) =>
                                        setNewDoctor({ ...newDoctor, experienceYears: parseInt(e.target.value || 0) })
                                    }
                                    style={{ width: "50%" }}
                                />
                                <input
                                    type="number"
                                    placeholder="Months"
                                    min="0"
                                    max="11"
                                    value={newDoctor.experienceMonths}
                                    onChange={(e) =>
                                        setNewDoctor({ ...newDoctor, experienceMonths: parseInt(e.target.value || 0) })
                                    }
                                    style={{ width: "50%" }}
                                />
                            </div>

                            <Select
                                isMulti
                                options={areaOptions}
                                value={areaOptions.filter(opt => newDoctor.areaOfExpertise.includes(opt.value))}
                                onChange={(selected) =>
                                    setNewDoctor({
                                        ...newDoctor,
                                        areaOfExpertise: selected.map((s) => s.value)
                                    })
                                }
                            />
                            <label>Upload Profile Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhotoFile(e.target.files[0])}
                            />

                            <label>Certification Names</label>
                            <Select
                                isMulti
                                options={certificationNameOptions}
                                value={certificationNameOptions.filter(opt =>
                                    newDoctor.certificationNames.includes(opt.value)
                                )}
                                onChange={(selected) =>
                                    setNewDoctor({
                                        ...newDoctor,
                                        certificationNames: selected.map((s) => s.value)
                                    })
                                }
                            />

                            <label>Upload Certifications (PDF/Images)</label>
                            <input
                                type="file"
                                multiple
                                accept="application/pdf,image/*"
                                onChange={(e) => setCertFiles(Array.from(e.target.files))}
                            />

                            {certFiles.length > 0 && (
                                <ul style={{ fontSize: "12px", marginTop: "5px" }}>
                                    {certFiles.map((file, idx) => (
                                        <li key={idx}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
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
                                    Register
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
                    <div
                        key={doctor._id}
                        className="doctor-card"
                        onClick={() => navigate(`/doctor/${doctor._id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        {/* 👇 Display Doctor Photo */}
                        {doctor.photo ? (
                            <img
                                src={doctor.photo}
                                alt={`${doctor.Name}`}
                                className="doctor-photo"
                            />
                        ) : (
                            <img
                                src="/default-doctor.png" // ✅ fallback image if no photo
                                alt="No Photo"
                                className="doctor-photo"
                            />
                        )}

                        <h3>{doctor.Name} <i className="fa-solid fa-stethoscope"></i></h3>
                        <p><strong>City:</strong> {doctor.City}</p>
                        <p><strong>Gender:</strong> {doctor.Gender}</p>
                        <p><strong>Qualification:</strong> {doctor.Qualification}</p>
                        <p><strong>Mobile:</strong> {doctor.Mobile}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;