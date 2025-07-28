import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorLoginImage from './experts.jpg';

function DoctorLogin({ onLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showP, setShowP] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/doctorlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        onLogin(data.doctor);
        localStorage.setItem("doctor_id", data.doctor.doctor_id);
        localStorage.setItem("Id", data.doctor.id);
        navigate("/Home", { state: { doctor: data.doctor } });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const pageStyle = {
    backgroundImage: `url(${doctorLoginImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const formContainerStyle = {
    background: "rgba(255, 255, 255, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "380px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "10px",
    border: "1px solid rgba(200,200,200,0.5)",
    fontSize: "1rem",
    background: "rgba(255, 255, 255, 0.6)",
    color: "#333",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007aff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    marginTop: "14px",
    transition: "all 0.3s ease",
  };

  const forgotPasswordStyle = {
    marginTop: "30px",
    color: "WHITE",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const iconStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "gray",
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h2 style={{ marginBottom: "20px", color: "#4285F4", fontWeight: "700" }}>
          Experts Login
        </h2>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={inputStyle}
            required
          />
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type={showP ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <i
              className={`fa-solid ${showP ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowP(!showP)}
              style={iconStyle}
              title={showP ? "Hide Password" : "Show Password"}
            ></i>
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.04)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>
        <div>
          <span
            style={forgotPasswordStyle}
            onClick={() => navigate("/ForgotPwDoctor")}
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;