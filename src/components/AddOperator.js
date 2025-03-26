import { useState } from "react";

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
        <div className="container mx-auto p-4 max-w-md" style={{marginTop:"10%",marginBottom:"5%"}}>
            <h2 className="text-2xl font-bold mb-4">Add Operator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="loginId" placeholder="Login ID" value={formData.loginId} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="tel" name="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" required />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Operator</button>
            </form>
        </div>
    );
};

export default AddOperator;