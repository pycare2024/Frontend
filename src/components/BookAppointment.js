import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./bookappointment.jpg";

const BookAppointment = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [preferredSlot, setPreferredSlot] = useState("");
    const [patientData, setPatientData] = useState(null);
    const [paymentLink, setPaymentLink] = useState(null);
    const [appointmentConfirmed, setAppointmentConfirmed] = useState(null);
    const [appointmentId, setAppointmentId] = useState(null);
    const [doctorName, setDoctorName] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () => {
            if (step === 4 && appointmentConfirmed === null && paymentLink && appointmentId) {
                try {
                    const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/appointment/${appointmentId}`);
                    const data = await response.json();
                    if (response.ok && data?.appointment?.payment_status === "confirmed") {
                        setAppointmentConfirmed(data.appointment);
                        setStep(5);
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error("Error checking appointment status:", error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [step, paymentLink, appointmentConfirmed, appointmentId]);

    const sendOTP = async () => {
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }
        setError("");
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${phoneNumber}`);
        const data = await response.json();

        if (response.ok) {
            setStep(2);
        } else {
            setError(data.message);
        }
    };

    const verifyOTP = async () => {
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        setError("");
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${phoneNumber}/${otp}`);
        const data = await response.json();

        if (response.ok) {
            setShowPopup(true);
            setTimeout(checkPatientStatus, 3000);
        } else {
            setError(data.message);
        }
    };

    const checkPatientStatus = async () => {
        setShowPopup(false);
        const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phoneNumber}`);
        const data = await response.json();

        if (response.ok) {
            setPatientData(data);
            fetchAvailableDates();
            setStep(3);
        } else {
            navigate("/register", { state: { phoneNumber } });
        }
    };

    const fetchAvailableDates = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/availableDates");
            const data = await response.json();

            if (response.ok) {
                const extractedDates = Object.entries(data)
                    .filter(([key]) => key.startsWith("Date"))
                    .map(([, value]) => value);
                setAvailableDates(extractedDates);
            } else {
                setAvailableDates([]);
                setError("No available dates found.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setAvailableDates([]);
            setError("Failed to fetch available dates.");
        }
    };

    const bookAppointment = async () => {
        if (!selectedDate || !preferredSlot) {
            setError("Please select both a date and a time slot.");
            return;
        }

        const response = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/bookAppointment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                selectedDate,
                preferredTime: preferredSlot,
                patient_id: patientData.patientId
            })
        });

        const data = await response.json();

        if (response.ok) {
            setPaymentLink(data.paymentLink);
            setAppointmentId(data.appointmentDetails._id);
            setDoctorName(data.doctorName);
            setStep(4);
        } else {
            setError(data.message);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                position: "relative",
                marginTop: "5%"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.66)",
                    zIndex: 0,
                }}
            />

            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "600px" }}>
                <h1 style={{ color: "#4285F9", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
                    PsyCare - Appointment Booking
                </h1>

                {step === 1 && (
                    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "2px solid #4285F9", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                        <label htmlFor="phoneNumber" style={{ fontSize: "1.25rem", fontWeight: "600", display: "block", marginBottom: "10px", color: "#333", textAlign: "center" }}>
                            Mobile Number
                        </label>
                        <input
                            id="phoneNumber"
                            type="text"
                            placeholder="Enter 10-digit phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                fontSize: "1rem",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "15px",
                                outline: "none",
                            }}
                        />
                        <button
                            onClick={sendOTP}
                            style={{
                                width: "100%",
                                backgroundColor: "#4285F4",
                                color: "#fff",
                                padding: "12px",
                                fontSize: "1rem",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #4285F9",
                        borderRadius: "12px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}>
                        <div style={{
                            // backgroundColor: "#ffffff",
                            padding: "40px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            textAlign: "center"
                        }}>
                            <h2 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>OTP Verification</h2>

                            <p style={{ marginBottom: "20px", color: "#666" }}>
                                Please enter the One-Time Password sent to your registered mobile number.
                            </p>

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{
                                    padding: "12px",
                                    width: "100%",
                                    fontSize: "1rem",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    marginBottom: "20px",
                                    outline: "none",
                                    transition: "border-color 0.3s"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#4285F4"}
                                onBlur={(e) => e.target.style.borderColor = "#ccc"}
                            />

                            <button
                                onClick={verifyOTP}
                                style={{
                                    width: "100%",
                                    backgroundColor: "#4285F4",
                                    color: "#fff",
                                    padding: "12px",
                                    fontSize: "1rem",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#3367D6"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#4285F4"}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "2rem",
                            padding: "2rem",
                            border: "2px solid #4285F9",
                            borderRadius: "12px",
                            alignItems: "flex-start",
                            marginTop: "2rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ minWidth: "200px" }}>
                            <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
                                Welcome, {patientData?.patientName}
                            </h2>
                            <label style={{ display: "block", marginBottom: "0.5rem" }}>
                                Select Appointment Date
                            </label>
                            <select
                                onChange={(e) => setSelectedDate(e.target.value)}
                                value={selectedDate}
                                style={{
                                    width: "100%",
                                    padding: "0.6rem",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    fontSize: "1rem",
                                }}
                            >
                                <option value="">-- Select Date --</option>
                                {availableDates.map((date, idx) => (
                                    <option key={idx} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ minWidth: "200px" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", marginTop: "2.5rem" }}>
                                Preferred Time Slot
                            </label>
                            <select
                                onChange={(e) => setPreferredSlot(e.target.value)}
                                value={preferredSlot}
                                style={{
                                    width: "100%",
                                    padding: "0.6rem",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    fontSize: "1rem",
                                }}
                            >
                                <option value="">-- Select Time Slot --</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                            </select>
                        </div>

                        <div style={{ alignSelf: "flex-end", marginTop: "2.5rem" }}>
                            <button
                                onClick={bookAppointment}
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "0.7rem 1.5rem",
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    border: "none",
                                    cursor: "pointer",
                                    marginLeft: "1rem",
                                }}
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && paymentLink && (
                    <div
                        style={{
                            maxWidth: "500px",
                            margin: "2rem auto",
                            padding: "2rem",
                            background: "#f0f8ff",
                            borderRadius: "16px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            textAlign: "center",
                            fontFamily: "'Segoe UI', sans-serif",
                        }}
                    >
                        <h2 style={{ color: "#2c3e50", fontSize: "1.8rem", marginBottom: "1rem" }}>
                            Almost Done, {patientData?.patientName}! 🎉
                        </h2>
                        <p style={{ fontSize: "1rem", color: "#444", marginBottom: "2rem" }}>
                            Please proceed with the payment to confirm your appointment.
                        </p>
                        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                            <button
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    padding: "0.75rem 1.5rem",
                                    fontSize: "1rem",
                                    borderRadius: "8px",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                            >
                                Pay Now
                            </button>
                        </a>
                    </div>
                )}

                {step === 5 && appointmentConfirmed && (
                    <div
                        style={{
                            maxWidth: "600px",
                            margin: "2rem auto",
                            padding: "2rem",
                            backgroundColor: "#e8f5e9",
                            borderRadius: "16px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            fontFamily: "'Segoe UI', sans-serif",
                            color: "#2e3a59",
                            lineHeight: "1.6",
                        }}
                    >
                        <h2 style={{ fontSize: "1.8rem", color: "#2c7a7b", marginBottom: "1rem" }}>
                            🌟 Hi {appointmentConfirmed.patientName}
                        </h2>
                        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                            🎉 Your appointment has been <strong>successfully confirmed!</strong>
                        </p>

                        <p>
                            📅 <strong>Date:</strong>{" "}
                            {new Date(appointmentConfirmed.DateOfAppointment).toLocaleDateString()}
                        </p>
                        <p>
                            ⏰ <strong>Time:</strong> {appointmentConfirmed.AppStartTime}
                        </p>
                        <p>
                            👨‍⚕️ <strong>Doctor:</strong> Dr. {doctorName}
                        </p>
                        <p>
                            🏥 <strong>Location:</strong> PsyCare / Online Consultation
                        </p>
                        <p>
                            💳 <strong>Payment Status:</strong> ✅ Paid (Transaction ID:{" "}
                            {appointmentConfirmed.payment_id})
                        </p>

                        <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#555" }}>
                            🔗 Your consultation link will be sent shortly before the session begins.
                        </p>

                        <hr style={{ margin: "2rem 0", border: "0.5px solid #ccc" }} />

                        <p style={{ textAlign: "center", fontWeight: "500" }}>
                            💙 Thank you for choosing <strong>PsyCare</strong>. We're here for you!
                        </p>
                    </div>
                )}

                {error && <p>{error}</p>}

                {showPopup && (
                    <div>
                        Your number has been verified. Checking our system for your details...
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookAppointment;
