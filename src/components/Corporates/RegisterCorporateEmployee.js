import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RegisterCorporateEmployee.css";

const RegisterCorporateEmployee = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { empId, companyCode, name } = state || {}; // ✅ get name also

  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Location: "",
    Mobile: "",
    Problem: "",
    Department: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/registerCorporateEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          empId,
          companyCode,
          Name: name, // ✅ send name directly
          userType: "corporate"
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 Registered successfully. You can now take the Psychometric test.");
        setTimeout(() => navigate("/StartScreeningTest", 5000));
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error registering employee. Please try again.");
    }
  };

  return (
    <div className="register-employee-main">
      <div className="register-employee-container">
        <h2>Corporate Employee Registration</h2>

        <form className="employee-form" onSubmit={handleRegister}>
          <p><strong>Company Code:</strong> {companyCode}</p>
          <p><strong>Employee ID:</strong> {empId}</p>
          <p><strong>Name:</strong> {name}</p>

          {/* No editable Name field anymore */}
          <input name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} required />
          <input name="Location" placeholder="City / Location" value={formData.Location} onChange={handleChange} required />
          <input name="Mobile" placeholder="Mobile Number" value={formData.Mobile} onChange={handleChange} required />
          <input name="Problem" placeholder="Brief Problem" value={formData.Problem} onChange={handleChange} required />
          <input name="Department" placeholder="Department" value={formData.Department} onChange={handleChange} required />

          <select name="Gender" value={formData.Gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">Register</button>
        </form>

        {message && (
          <p className={message.includes("successfully") ? "success" : "error"}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterCorporateEmployee;