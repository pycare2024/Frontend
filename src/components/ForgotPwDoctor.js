import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bg from "./passwordDoc.jpg";

function ForgotPwDoctor() {
  const [loginId, setLoginId] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (!loginId || !mobile) {
      toast.error("Please fill Login ID and Mobile number", { position: "top-center" });
      return;
    }

    try {
      const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${mobile}`);
      const data = await response.json();
      if (response.ok) {
        toast.success("OTP sent successfully", { position: "top-center" });
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Error sending OTP", { position: "top-center" });
    }
  };

  const verifyAndResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.error("Enter OTP and new password", { position: "top-center" });
      return;
    }

    try {
      const verifyResponse = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${mobile}/${otp}`);
      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        toast.error(verifyData.message || "OTP verification failed", { position: "top-center" });
        return;
      }

      const resetResponse = await fetch("https://backend-xhl4.onrender.com/DoctorRoute/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, newPassword })
      });

      const resetData = await resetResponse.json();
      if (resetResponse.ok) {
        toast.success("Password reset successfully!", { position: "top-center" });
        setTimeout(() => navigate("/DoctorLogin"), 2000);
      } else {
        toast.error(resetData.message || "Failed to reset password", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Reset Doctor Password</h2>
        <form onSubmit={verifyAndResetPassword}>
          <input
            type="text"
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={styles.input}
            maxLength={10}
            required
          />

          {!otpSent ? (
            <button type="button" onClick={sendOTP} style={styles.buttonPrimary}>
              Send OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.buttonPrimary}>
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

const styles = {
    container: {
        height: "100vh",
        backgroundImage: `url(${bg})`, // ✅ replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "30px 35px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    animation: "fadeIn 0.8s ease",
    borderLeft: "6px solid #4285F4", // 👈 blue boundary on the left
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)", // 👈 subtle shadow
    transition: "all 0.3s ease-in-out"
  },
  title: {
    marginBottom: "20px",
    color: "#4285F4",
    fontWeight:"bold",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none"
  },
  buttonPrimary: {
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    transition: "background 0.3s ease"
  }
};

export default ForgotPwDoctor;