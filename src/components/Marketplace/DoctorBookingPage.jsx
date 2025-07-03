import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                    <p style={{ color: "white" }}>{doctor?.Role}</p>
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
                    <p style={{ color: "white" }}>{doctor?.Gender}</p>
                    <p style={{ color: "white" }}>{doctor?.City}</p>
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
                                        {availableSchedules[selectedDateIndex].slots.map((slot, idx) => (
                                            <button
                                                key={idx}
                                                className={`slot-button ${selectedSlot === slot ? "selected" : ""}`}
                                                onClick={() => setSelectedSlot(slot)}
                                            >
                                                {slot.startTime} - {slot.endTime}
                                            </button>
                                        ))}
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
                            <p>Doctor: {appointmentInfo.doctorName}</p>
                            <p>Date & Time: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                            <p>Status: Paid</p>
                        </div>
                    ) : (
                        <div className="confirmation">
                            <h3>Appointment Booked</h3>
                            <p>Doctor: {appointmentInfo.doctorName}</p>
                            <p>
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