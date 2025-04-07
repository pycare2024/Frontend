import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./bookappointment.jpg";
import { useLocation } from "react-router-dom";

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

    const location = useLocation();

    // Check if phoneNumber is passed from RegisterPatient
    useEffect(() => {
        if (location.state?.phoneNumber) {
            setPhoneNumber(location.state.phoneNumber);

            // Optional: skip OTP and fetch patient directly
            checkPatientStatus(location.state.phoneNumber);
        }
    }, [location.state]);

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

    const checkPatientStatus = async (phone = phoneNumber) => {
        setShowPopup(false);
        const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phone}`);
        const data = await response.json();

        if (response.ok) {
            setPatientData(data);
            fetchAvailableDates();
            setStep(3); // ✅ go to appointment slot selection
        } else {
            // 🔁 if patient not found, go to Register page and pass the phone number
            navigate("/RegisterPatient", { state: { phoneNumber: phone } });
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
                    // backgroundColor: "rgba(255, 255, 255, 0.66)",
                    zIndex: 0,
                }}
            />

            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "600px" }}>
                <h1 style={{
                    color: "#4285F4",
                    fontWeight: "bold",
                    fontSize: "3rem",
                    textAlign: "center",
                    marginBottom: "5rem",
                    letterSpacing: "0.5px"
                }}>
                    Book Your Appointment
                </h1>

                {step === 1 && (
                    <div style={{
                        maxWidth: "420px",
                        margin: "0 auto",
                        padding: "25px 30px",
                        borderRadius: "16px",
                        backdropFilter: "blur(12px)",
                        background: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        textAlign: "center"
                    }}>
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
                                backgroundColor: "#4285F4",
                                color: "white",
                                padding: "12px 24px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                borderRadius: "8px",
                                border: "none",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(66, 133, 244, 0.3)"
                            }}
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div style={{
                        maxWidth: "420px",
                        margin: "0 auto",
                        padding: "30px",
                        borderRadius: "16px",
                        backdropFilter: "blur(12px)",
                        background: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        textAlign: "center"
                    }}>
                        <h2 style={{ marginBottom: "1rem", color: "#333", fontWeight: "700", fontSize: "1.6rem" }}>
                            OTP Verification
                        </h2>
                        <p style={{ marginBottom: "1.5rem", color: "#555" }}>
                            Enter the OTP sent to your phone
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
                            }}
                        />

                        <button
                            onClick={verifyOTP}
                            style={{
                                backgroundColor: "#4285F4",
                                color: "#fff",
                                padding: "12px 24px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                transition: "transform 0.3s ease"
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        padding: "30px",
                        borderRadius: "16px",
                        background: "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.18)"
                    }}>
                        <h2 style={{ color: "#2c3e50", marginBottom: "1.5rem" }}>
                            Welcome, {patientData?.patientName}
                        </h2>

                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                            <div style={{ flex: "1" }}>
                                <label style={{ fontWeight: "600" }}>Select Appointment Date</label>
                                <select
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.6rem",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginTop: "0.5rem"
                                    }}
                                >
                                    <option value="">-- Select Date --</option>
                                    {availableDates.map((date, idx) => (
                                        <option key={idx} value={date}>{date}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ flex: "1" }}>
                                <label style={{ fontWeight: "600" }}>Preferred Time Slot</label>
                                <select
                                    value={preferredSlot}
                                    onChange={(e) => setPreferredSlot(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.6rem",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginTop: "0.5rem"
                                    }}
                                >
                                    <option value="">-- Select Time Slot --</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <button
                                onClick={bookAppointment}
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "0.75rem 2rem",
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: "transform 0.3s ease"
                                }}
                                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
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
                            padding: "2rem 2.5rem",
                            borderRadius: "16px",
                            background: "rgba(255, 255, 255, 0.25)",
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                            textAlign: "center",
                            fontFamily: "'Segoe UI', sans-serif",
                            border: "1px solid rgba(255, 255, 255, 0.18)"
                        }}
                    >
                        <h2 style={{ color: "#2c3e50", fontSize: "1.8rem", marginBottom: "1rem", fontWeight: "700" }}>
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
                                    padding: "0.75rem 2rem",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    borderRadius: "8px",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
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
                            padding: "2.5rem",
                            background: "rgba(255, 255, 255, 0.25)",
                            backdropFilter: "blur(14px)",
                            borderRadius: "16px",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                            fontFamily: "'Segoe UI', sans-serif",
                            color: "#2e3a59",
                            lineHeight: "1.6",
                            border: "1px solid rgba(255, 255, 255, 0.18)"
                        }}
                    >
                        <h2 style={{ fontSize: "1.8rem", color: "#2c7a7b", marginBottom: "1rem", fontWeight: "700" }}>
                            🌟 Hi {appointmentConfirmed.patientName}
                        </h2>

                        <p style={{ fontSize: "1.1rem", marginBottom: "1.2rem" }}>
                            🎉 Your appointment has been <strong>successfully confirmed!</strong>
                        </p>

                        <div style={{ lineHeight: "2" }}>
                            <p>📅 <strong>Date:</strong> {new Date(appointmentConfirmed.DateOfAppointment).toLocaleDateString()}</p>
                            <p>⏰ <strong>Time:</strong> {appointmentConfirmed.AppStartTime}</p>
                            <p>👨‍⚕️ <strong>Doctor:</strong> Dr. {doctorName}</p>
                            <p>🏥 <strong>Location:</strong> PsyCare / Online Consultation</p>
                            <p>💳 <strong>Payment Status:</strong> ✅ Paid</p>
                            <p>🧾 <strong>Transaction ID:</strong> {appointmentConfirmed.payment_id}</p>
                        </div>

                        <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#555" }}>
                            🔗 Your consultation link will be sent shortly before the session begins.
                        </p>

                        <hr style={{ margin: "2rem 0", border: "0.5px solid #ccc" }} />

                        <p style={{ textAlign: "center", fontWeight: "600", color: "#333" }}>
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
