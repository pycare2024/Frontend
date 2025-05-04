import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RegisterFamilyMember.css";

const RegisterFamilyMember = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { empId, companyCode } = state || {};

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    relation: "",
    age: "",
    gender: "",
    location: "",
    problem: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/registerFamilyMember", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          empId,
          companyCode,
          ...formData,
          userType: "corporate"  // ✅ Important addition here
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 Family member registered successfully. You can now book an appointment.");
        setTimeout(() => navigate("/BookAppointment", { state: { phoneNumber: formData.mobile } }), 2000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error during registration. Please try again.");
    }
  };

  return (
    <div className="register-family-container">
      <h2>Register Family Member</h2>
      <form onSubmit={handleRegister} className="family-form">
        <p><strong>Company Code:</strong> {companyCode}</p>
        <p><strong>Employee ID:</strong> {empId}</p>

        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
        <input name="relation" placeholder="Relation (e.g., Son, Wife)" value={formData.relation} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input name="location" placeholder="City / Location" value={formData.location} onChange={handleChange} required />
        <input name="problem" placeholder="Brief Problem" value={formData.problem} onChange={handleChange} required />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterFamilyMember;