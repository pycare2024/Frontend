import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./DoctorBookingPage.css";

function DoctorBookingPage() {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [availableSchedules, setAvailableSchedules] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [patientData, setPatientData] = useState({ Name: "", Age: "", Gender: "", Location: "", Problem: [] });
    const [appointmentInfo, setAppointmentInfo] = useState(null);

    const location = useLocation();
    const isStudentBooking = location.state?.isStudentBooking || false;
    const studentIdUrl = location.state?.studentIdUrl || null;

    // console.log("Student id url -> ",studentIdUrl);

    useEffect(() => {
        fetchDoctor();
        fetchSlots();
    }, [doctorId]);

    useEffect(() => {
        if (appointmentInfo?.appointmentId) {
            checkPaymentStatus(appointmentInfo.appointmentId);
        }
    }, [appointmentInfo?.appointmentId]);

    useEffect(() => {
        if (appointmentInfo && appointmentInfo.payment_status !== "confirmed") {
            const interval = setInterval(() => {
                checkPaymentStatus(appointmentInfo.appointmentId); // 👈 make sure this ID is correct
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [appointmentInfo]);

    const fetchDoctor = async () => {
        const res = await axios.get(`https://backend-xhl4.onrender.com/DoctorRoute/${doctorId}`);
        setDoctor(res.data);
    };

    const fetchSlots = async () => {
        const res = await axios.get(`https://backend-xhl4.onrender.com/AppointmentRoute/marketplace/getAvailableSlots/${doctorId}`);
        console.log("Response -> ",res);
        setAvailableSchedules(res.data.availableSchedules || []);
    };

    const handleSendOtp = async () => {
        if (phoneNumber.length !== 10) return alert("Enter a valid 10-digit phone number");
        const res = await axios.get(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${phoneNumber}`);
        if (res.status === 200) setOtpSent(true);
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await axios.get(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${phoneNumber}/${enteredOtp}`);
            if (res.status === 200) {
                setOtpVerified(true);
                try {
                    const check = await axios.get(`https://backend-xhl4.onrender.com/patientRoute/check/${phoneNumber}`);
                    bookAppointment(check.data.patientId);
                } catch (err) {
                    if (err.response && err.response.status === 404) {
                        setIsNewUser(true);
                    } else {
                        alert("Error checking patient.");
                    }
                }
            } else {
                alert("Incorrect OTP");
            }
        } catch (err) {
            alert("OTP verification failed.");
        }
    };

    const registerAndBook = async () => {
        const { Name, Age, Gender, Location, Problem } = patientData;
        if (!Name || !Age || !Gender || !Location || Problem.length === 0) {
            alert("Please fill all fields before registering.");
            return;
        }
        const payload = { ...patientData, Mobile: phoneNumber };
        try {
            const res = await axios.post("https://backend-xhl4.onrender.com/patientRoute/register", payload);
            if (res.status === 201) {
                bookAppointment(res.data.patientId);
            }
        } catch (err) {
            alert("Error registering patient.");
        }
    };

    const bookAppointment = async (patientId) => {
        try {
            const res = await axios.post("https://backend-xhl4.onrender.com/AppointmentRoute/bookRetailAppointmentMarketplace", {
                doctor_id: doctorId,
                schedule_id: availableSchedules[selectedDateIndex].schedule_id,
                slot_time: selectedSlot.startTime,
                patient_id: patientId,
                isStudentBooking,
                studentIdUrl // <-- ✅ new field here
            });
            setAppointmentInfo(res.data);
        } catch (err) {
            alert("Error booking appointment.");
        }
    };

    const checkPaymentStatus = async (appointmentId) => {
        try {
            const res = await axios.get(`https://backend-xhl4.onrender.com/AppointmentRoute/checkPaymentStatus/${appointmentId}`);
            if (res.status === 200 && res.data.payment_status === "confirmed") {
                setAppointmentInfo((prev) => ({ ...prev, payment_status: "confirmed" }));
            }
        } catch (err) {
            console.warn("Payment status check failed.");
        }
    };

    const qualifications = Array.isArray(doctor?.Qualification)
        ? doctor.Qualification
        : doctor?.Qualification?.split(",").map(q => q.trim());

    return (
        <div className="booking-wrapper">
            <div className="booking-container">
                <div className="doctor-profile">
                    <img src={doctor?.photo || "/default-doc.png"} alt={doctor?.Name} />
                    <h2>{doctor?.Name}</h2>
                    <p style={{ color: "#0964f8" }}>{doctor?.Role}</p>
                    {doctor?.Qualification && (
                        <div className="qualifications-wrapper">
                            {(Array.isArray(doctor.Qualification)
                                ? doctor.Qualification
                                : doctor.Qualification.split(",").map(q => q.trim())
                            ).map((q, idx) => (
                                <span key={idx} className="qualification-pill">
                                    {q}
                                </span>
                            ))}
                        </div>
                    )}
                    <p style={{ color: "#0964f8" }}>{doctor?.Gender}</p>
                    <p style={{ color: "#0964f8" }}>{doctor?.City}</p>
                </div>

                <div className="booking-slot-section">
                    {!appointmentInfo ? (
                        <>
                            <h3>Select Date</h3>
                            <div className="date-selector">
                                {availableSchedules.map((s, i) => (
                                    <button
                                        key={s.schedule_id}
                                        className={`date-button ${selectedDateIndex === i ? "active" : ""}`}
                                        onClick={() => {
                                            setSelectedDateIndex(i);
                                            setSelectedSlot(null);
                                        }}
                                    >
                                        {new Date(s.date).toLocaleDateString("en-IN", {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short"
                                        })}
                                    </button>
                                ))}
                            </div>

                            {selectedDateIndex !== null && (
                                <>
                                    <h4>Available Slots</h4>
                                    <div className="slots-grid">
                                        {availableSchedules[selectedDateIndex].slots.map((slot, idx) => {
                                            console.log("Price per slot->",availableSchedules[selectedDateIndex].pricePerSlot);
                                            const basePrice = availableSchedules[selectedDateIndex].pricePerSlot || 944;
                                            const finalPrice = /*isStudentBooking ? Math.floor(basePrice / 2) :*/ basePrice;
                                            const gstAmount = Math.round(finalPrice * 0.18);
                                            const totalPrice = finalPrice + gstAmount;

                                            return (
                                                <button
                                                    key={idx}
                                                    className={`slot-button ${selectedSlot === slot ? "selected" : ""}`}
                                                    onClick={() => setSelectedSlot(slot)}
                                                >
                                                    <div>{slot.startTime} - {slot.endTime}</div>
                                                    <div className="slot-price">₹{totalPrice} (incl. GST)</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {selectedSlot && !otpVerified && (
                                <div className="otp-section">
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter Phone Number"
                                    />
                                    {otpSent ? (
                                        <>
                                            <input
                                                type="text"
                                                value={enteredOtp}
                                                onChange={(e) => setEnteredOtp(e.target.value)}
                                                placeholder="Enter OTP"
                                            />
                                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                                        </>
                                    ) : (
                                        <button onClick={handleSendOtp}>Send OTP</button>
                                    )}
                                </div>
                            )}

                            {isNewUser && (
                                <div className="register-section">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        onChange={(e) => setPatientData({ ...patientData, Name: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        onChange={(e) => setPatientData({ ...patientData, Age: e.target.value })}
                                    />
                                    <select
                                        onChange={(e) => setPatientData({ ...patientData, Gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        onChange={(e) => setPatientData({ ...patientData, Location: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Problem (comma separated)"
                                        onChange={(e) =>
                                            setPatientData({ ...patientData, Problem: e.target.value.split(",") })
                                        }
                                    />
                                    <button onClick={registerAndBook}>Register & Book</button>
                                </div>
                            )}
                        </>
                    ) : appointmentInfo.payment_status === "confirmed" ? (
                        <div className="confirmation">
                            <h3>Appointment Confirmed</h3>
                            {isStudentBooking && (
                                <div className="student-booking-info">
                                    <p><strong>Student Booking:</strong> Yes</p>
                                    {studentIdUrl && (
                                        <p>
                                            <strong>Student ID:</strong><br />
                                            <a href={studentIdUrl} target="_blank" rel="noreferrer">View Uploaded ID</a>
                                        </p>
                                    )}
                                </div>
                            )}
                            <p>Doctor: {appointmentInfo.doctorName}</p>
                            <p>Date & Time: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                            <p>Status: Paid</p>
                        </div>
                    ) : (
                        <div className="confirmation">
                            <h3>Slot Reserved (Awaiting Payment)</h3>
                            <p style={{ color: "#00378fff", textAlign: "center" }}>Dear {patientData.Name},
                                Your selected appointment slot has been successfully reserved for you. To confirm your booking, please complete the payment using the link provided below.
                                Note: The payment link will expire in 10 minutes. Kindly complete the transaction promptly to avoid cancellation of the slot.</p>
                            <p style={{ color: "#00378fff" }}>Doctor: {appointmentInfo.doctorName}</p>
                            <p style={{ color: "#00378fff" }}>
                                Payment Link: {" "}
                                <a href={appointmentInfo.paymentLink} target="_blank" rel="noreferrer">
                                    Click to Pay
                                </a>
                            </p>
                            <p><em>Once payment is completed, your appointment details will appear here.</em></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorBookingPage;