import React, { useState } from "react";
import "./RegisterCorporate.css";

const RegisterCorporate = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    empIdFormat: ""
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg(`✅ Company registered. Code: ${data.companyCode}`);
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          empIdFormat: ""
        });
      } else {
        setErrorMsg(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-corporate-container">
      <h2>Register Corporate Company</h2>
      <form className="corporate-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Contact Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Contact Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="empIdFormat"
          placeholder="Employee ID Format (e.g., ACME###)"
          value={formData.empIdFormat}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {successMsg && <p className="success">{successMsg}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
};

export default RegisterCorporate;