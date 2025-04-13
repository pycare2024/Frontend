import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./bookappointment.jpg";
import { useLocation } from "react-router-dom";

const BookAppointment = () => {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState("");
    const [companyCode, setCompanyCode] = useState("");
    const [empId, setEmpId] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [preferredSlot, setPreferredSlot] = useState("");
    const [patientData, setPatientData] = useState(null);
    const [paymentLink, setPaymentLink] = useState(null);
    const [appointmentConfirmed, setAppointmentConfirmed] = useState(null);
    const [appointmentId, setAppointmentId] = useState(null);
    const [doctorName, setDoctorName] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.phoneNumber) {
            setPhoneNumber(location.state.phoneNumber);
            checkPatientStatus(location.state.phoneNumber);
        }
    }, [location.state]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (step === 4.5 && appointmentConfirmed === null && paymentLink && appointmentId) {
                try {
                    const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/appointment/${appointmentId}`);
                    const data = await response.json();
                    if (response.ok && data?.appointment?.payment_status === "confirmed") {
                        setAppointmentConfirmed(data.appointment);
                        setStep(5); // ✅ move to confirmation screen
                    }
                } catch (error) {
                    console.error("Error checking appointment status:", error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [step, paymentLink, appointmentConfirmed, appointmentId]);

    const verifyCorporatePatient = async () => {
        if (!companyCode || !empId) {
          setCompanyError("Company Code and Employee ID are required");
          return;
        }
      
        try {
          const response = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/verifyCorporatePatient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyCode, empId }),
          });
      
          const data = await response.json(); // ✅ always parse
      
          if (response.ok && data.exists) {
            setStep(2);
            setCompanyError("");
          } else if (data.message === "Employee not found. Proceed to registration.") {
            navigate("/RegisterCorporateEmployee", {
              state: { empId, companyCode }
            });
          } else if (data.message === "Company not registered with us.") {
            setCompanyError("Company not found. Please proceed with 'None of the Above'.");
          } else {
            setCompanyError(data.message || "Verification failed.");
          }
      
        } catch (err) {
          setCompanyError("Network error. Please try again.");
        }
      };

    const sendOTP = async () => {
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }
        setError("");
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${phoneNumber}`);
        const data = await response.json();
        if (response.ok) setStep(3);
        else setError(data.message);
    };

    const verifyOTP = async () => {
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${phoneNumber}/${otp}`);
        const data = await response.json();
        if (response.ok) {
            setShowPopup(true);
            setTimeout(() => checkPatientStatus(phoneNumber), 3000);
        } else setError(data.message);
    };

    const checkPatientStatus = async (phone) => {
        setShowPopup(false);
        const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phone}`);
        const data = await response.json();
        if (response.ok) {
            setPatientData(data);
            fetchAvailableDates();
            setStep(4);
        } else {
            navigate("/RegisterPatient", { state: { phoneNumber: phone } });
        }
    };

    const fetchAvailableDates = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/availableDates");
            const data = await response.json();
            if (response.ok) {
                const dates = Object.entries(data)
                    .filter(([key]) => key.startsWith("Date"))
                    .map(([, value]) => value);
                setAvailableDates(dates);
            }
        } catch (err) {
            console.error("Failed to fetch available dates.");
        }
    };

    const bookAppointment = async () => {
        const response = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/bookAppointment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                selectedDate,
                preferredTime: preferredSlot,
                patient_id: patientData.patientId,
                userType,
                empId,
                companyCode,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setPaymentLink(data.paymentLink);
            setAppointmentId(data.appointmentDetails._id);
            setDoctorName(data.doctorName);
            setStep(4.5); // ✅ Show payment button first
        } else {
            setError(data.message);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${bgImage})`, minHeight: "100vh", backgroundSize: "cover", padding: "2rem" }}>
            <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "16px", padding: "2rem" }}>
                <h1 style={{ textAlign: "center", color: "#4285F4" }}>Book Your Appointment</h1>

                {/* Step 1: Choose Type */}
                {step === 1 && (
                    <div>
                        <h3>Are you booking as a:</h3>
                        <button onClick={() => setUserType("corporate")}>Corporate</button>
                        <button onClick={() => { setUserType("retail"); setStep(2); }}>None of the Above</button>
                        {userType === "corporate" && (
                            <div>
                                <input placeholder="Company Code" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} />
                                <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                                <button onClick={verifyCorporatePatient}>Proceed</button>
                                {companyError && <p style={{ color: "red" }}>{companyError}</p>}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Enter Mobile */}
                {step === 2 && (
                    <div>
                        <input placeholder="Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <button onClick={sendOTP}>Send OTP</button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                )}

                {/* Step 3: OTP */}
                {step === 3 && (
                    <div>
                        <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={verifyOTP}>Verify OTP</button>
                    </div>
                )}

                {/* Step 4: Select Slot */}
                {step === 4 && (
                    <div>
                        <h3>Welcome {patientData?.patientName}</h3>
                        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                            <option>Select Date</option>
                            {availableDates.map((date, idx) => <option key={idx}>{date}</option>)}
                        </select>
                        <select value={preferredSlot} onChange={(e) => setPreferredSlot(e.target.value)}>
                            <option>Select Slot</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>
                        <button onClick={bookAppointment}>Book Appointment</button>
                    </div>
                )}

                {step === 4.5 && paymentLink && (
                    <div>
                        <h3>Almost Done!</h3>
                        <p>Please proceed with payment to confirm your appointment.</p>
                        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                            <button
                                style={{
                                    padding: "12px 24px",
                                    backgroundColor: "#4285F4",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                Pay Now
                            </button>
                        </a>
                        <p style={{ fontSize: "0.9rem", marginTop: "1rem", color: "#555" }}>
                            Once payment is complete, your appointment will be confirmed automatically.
                        </p>
                    </div>
                )}

                {/* Step 5: Confirmation */}
                {step === 5 && appointmentConfirmed && (
                    <div>
                        <h3>Appointment Confirmed!</h3>
                        <p>Date: {new Date(appointmentConfirmed.DateOfAppointment).toLocaleDateString()}</p>
                        <p>Time: {appointmentConfirmed.AppStartTime}</p>
                        <p>Doctor: {doctorName}</p>
                        <p>Status: ✅ Paid</p>
                        <a href={paymentLink}><button>View Payment Link</button></a>
                    </div>
                )}

                {showPopup && <p>Checking your details...</p>}
            </div>
        </div>
    );
};

export default BookAppointment;
