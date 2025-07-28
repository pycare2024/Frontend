import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CorporateBooking.css";

const CorporateBooking = () => {
    const [step, setStep] = useState(1);
    const [companyCode, setCompanyCode] = useState("");
    const [empId, setEmpId] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [familyList, setFamilyList] = useState([]);
    const [patientData, setPatientData] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [preferredSlot, setPreferredSlot] = useState("");
    const [appointmentConfirmed, setAppointmentConfirmed] = useState(null);
    const [doctorName, setDoctorName] = useState("");
    const [latestAppointment, setLatestAppointment] = useState(null);
    const [isFollowUp, setIsFollowUp] = useState(false);
    const [followUpData, setFollowUpData] = useState(null);
    const [awaitingFollowUpChoice, setAwaitingFollowUpChoice] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!awaitingFollowUpChoice && followUpData && isFollowUp) {
            bookAppointment();
        }
    }, [awaitingFollowUpChoice, followUpData, isFollowUp]);

    const verifyCorporatePatient = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/verifyCorporatePatient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyCode, empId })
            });
            const data = await response.json();

            if (response.status === 200) {
                setPatientData(data.employee);
                setPhoneNumber(data.employee.employeePhone);
                setFamilyList(data.employee.familyMembers || []);
                setStep(2);
            } else if (response.status === 400 && data.exists === false && data.masterRecord) {
                navigate("/RegisterCorporateEmployee", {
                    state: { empId: data.masterRecord.empId, companyCode, name: data.masterRecord.name }
                });
            } else {
                setCompanyError(data.message || "Unauthorized access.");
            }
        } catch (error) {
            setCompanyError("Network error. Please try again.");
        }
    };

    const fetchPatientByPhone = async (phone) => {
        const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/getPatientByPhone/${phone}`);
        const data = await response.json();
        if (response.ok && data.patient) {
            setSelectedPatient({
                id: data.patient?._id || "",
                name: data.patient?.Name || "",
                gender: data.patient?.Gender || "",
                mobile: data.patient?.Mobile || "",
            });
        }
    };

    const fetchLatestAppointment = async (phone) => {
        const res = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/appointments/latest/${phone}`);
        const data = await res.json();
        if (res.ok) {
            setLatestAppointment(data);
            return data;
        }
        return null;
    };

    const sendOTP = async () => {
        const res = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${phoneNumber}`);
        const data = await res.json();
        if (res.ok) setStep(4);
        else setError(data.message);
    };

    const verifyOTP = async () => {
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${phoneNumber}/${otp}`);
        const data = await response.json();
        if (response.ok) {
            await fetchAvailableDates();
            const latest = await fetchLatestAppointment(phoneNumber);
            if (latest?.followUpRecommended) {
                setFollowUpData(latest);
                setAwaitingFollowUpChoice(true);
                return;
            }
            setStep(5);
        } else {
            setError(data.message);
        }
    };

    const fetchAvailableDates = async () => {
        const res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/availableDates");
        const data = await res.json();
        if (res.ok) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Remove time for accurate comparison

            const filteredDates = Object.entries(data)
                .filter(([key]) => key.startsWith("Date"))
                .map(([, val]) => val)
                .filter(dateStr => {
                    const dateObj = new Date(dateStr);
                    dateObj.setHours(0, 0, 0, 0);
                    return dateObj >= today;
                });

            setAvailableDates(filteredDates);
        }
    };

    const bookAppointment = async () => {
        try {
            const res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/bookAppointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedDate,
                    preferredTime: preferredSlot,
                    patient_id: selectedPatient.id,
                    userType: "corporate",
                    empId,
                    companyCode,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setAppointmentConfirmed(data.appointmentDetails);
                setDoctorName(data.doctorName);
                setStep(6);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Something went wrong while booking the appointment.");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="book-step-section">
                        <input placeholder="Company Code" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} />
                        <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                        <button onClick={verifyCorporatePatient} style={{color:"green"}}>Verify</button>
                        {companyError && <p className="book-error-text">{companyError}</p>}
                    </div>
                );
            case 2:
                return (
                    <div className="book-step-section">
                        <h4>Select Patient</h4>
                        <button onClick={async () => {
                            await fetchPatientByPhone(patientData.employeePhone);
                            await fetchLatestAppointment(patientData.employeePhone);
                            setPhoneNumber(patientData.employeePhone);
                            setStep(3);
                        }}>Self</button>
                        {familyList.map((fm, i) => (
                            <button key={i} onClick={async () => {
                                await fetchPatientByPhone(fm.mobile);
                                await fetchLatestAppointment(fm.mobile);
                                setPhoneNumber(fm.mobile);
                                setStep(3);
                            }}>{fm.name} ({fm.relation})</button>
                        ))}
                        <button onClick={() => navigate("/RegisterFamilyMember", { state: { empId, companyCode } })}>+ Add New Family Member</button>
                    </div>
                );
            case 3:
                return (
                    <div className="book-step-section">
                        <button onClick={sendOTP}>Send OTP to {phoneNumber}</button>
                    </div>
                );
            case 4:
                return (
                    <div className="book-step-section">
                        <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={verifyOTP}>Verify OTP</button>
                    </div>
                );
            case 5:
                return (
                    <div className="book-step-section">
                        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                            <option>Select Date</option>
                            {availableDates.map((d, i) => <option key={i}>{d}</option>)}
                        </select>
                        <select value={preferredSlot} onChange={(e) => setPreferredSlot(e.target.value)}>
                            <option>Select Time</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>
                        <button onClick={bookAppointment}>Book Appointment</button>
                    </div>
                );
            case 6:
                return (
                    <div className="book-confirmation-box">
                        <h4>Appointment Confirmed</h4>
                        <p><strong>Date:</strong> {new Date(appointmentConfirmed.DateOfAppointment).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {appointmentConfirmed.AppStartTime}</p>
                        <p><strong>Doctor:</strong> {doctorName}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="book-appointment-container">
            <div className="book-appointment-card">
                <h2>Corporate Booking</h2>
                {error && <p className="book-error-text">{error}</p>}
                {awaitingFollowUpChoice && followUpData && (
                    <div className="followup-dialog">
                        <h3>Follow-Up Recommended</h3>
                        <p>Doctor <strong>{followUpData.doctorName}</strong> recommended a follow-up.</p>
                        <p>Proceed with follow-up booking?</p>
                        <div className="followup-dialog-buttons">
                            <button onClick={() => {
                                setIsFollowUp(true);
                                setAwaitingFollowUpChoice(false);
                            }}>Yes</button>
                            <button onClick={() => {
                                setIsFollowUp(false);
                                setAwaitingFollowUpChoice(false);
                                setStep(5); // ⬅️ Go to normal booking if user declines
                            }}>No</button>
                        </div>
                    </div>
                )}
                {renderStep()}
            </div>
        </div>
    );
};

export default CorporateBooking;