import { useState } from "react";
import "./AddOperator.css";

const AddOperator = () => {
    const [formData, setFormData] = useState({
        Name: "",
        loginId: "",
        password: "",
        mobileNo: "",
        email: "",
        dob: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://backend-xhl4.onrender.com/OperatorRoute/add-operator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        alert(result.message);
    };

    return (
        <div className="add-operator-wrapper">
            <div className="add-operator-card">
                <h2 className="add-operator-title">Operator Form</h2>
                <form onSubmit={handleSubmit} className="add-operator-form">
                    <input type="text" name="Name" placeholder="Full Name" value={formData.Name} onChange={handleChange} required />
                    <input type="text" name="loginId" placeholder="Login ID" value={formData.loginId} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input type="tel" name="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    <button type="submit">Add Operator</button>
                </form>
            </div>
        </div>
    );
};

export default AddOperator;