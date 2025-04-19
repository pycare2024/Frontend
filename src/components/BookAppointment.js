import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./bookappointment.jpg";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [empId, setEmpId] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [appointmentId, setAppointmentId] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [familyOption, setFamilyOption] = useState("");
  const [familyList, setFamilyList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (step === 4.5 && appointmentConfirmed === null && paymentLink && appointmentId) {
        try {
          const response = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/appointment/${appointmentId}`);
          const data = await response.json();
          if (response.ok && data?.appointment?.payment_status === "confirmed") {
            setAppointmentConfirmed(data.appointment);
            setStep(5);
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [step, paymentLink, appointmentConfirmed, appointmentId]);

  const verifyCorporatePatient = async () => {
    try {
      const response = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/verifyCorporatePatient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyCode, empId })
      });
      const data = await response.json();
      if (response.ok && data.exists) {
        setUserType("corporate");
        const emp = data.employee;
        if (emp.familyMembers?.length > 0) {
          setFamilyList(emp.familyMembers);
          setStep(1.5);
        } else {
          setStep(1.6);
        }
      } else if (data.message.includes("Employee not found")) {
        navigate("/RegisterCorporateEmployee", { state: { empId, companyCode } });
      } else if (data.message.includes("Company not registered")) {
        setCompanyError("Company not found. Please continue as retail.");
      } else {
        setCompanyError(data.message);
      }
    } catch (error) {
      setCompanyError("Verification failed. Try again later.");
    }
  };

  const sendOTP = async (number = phoneNumber) => {
    const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${number}`);
    const data = await response.json();
    if (response.ok) setStep(3);
    else setError(data.message);
  };

  const verifyOTP = async () => {
    const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${phoneNumber}/${otp}`);
    const data = await response.json();
    if (response.ok) {
      const patientRes = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phoneNumber}`);
      const pdata = await patientRes.json();
      if (patientRes.ok) {
        setPatientData(pdata);
        fetchAvailableDates();
        setStep(4);
      } else {
        if (userType === "corporate" && familyOption === "family") {
          navigate("/RegisterFamilyMember", { state: { empId, companyCode } });
        } else {
          navigate("/RegisterPatient", { state: { phoneNumber } });
        }
      }
    } else setError(data.message);
  };

  const fetchAvailableDates = async () => {
    const res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/availableDates");
    const data = await res.json();
    if (res.ok) {
      const dates = Object.entries(data)
        .filter(([key]) => key.startsWith("Date"))
        .map(([, val]) => val);
      setAvailableDates(dates);
    }
  };

  const bookAppointment = async () => {
    if (!patientData?.patientId) {
      setError("Patient ID missing. Please verify your mobile number again.");
      return;
    }

    const res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/bookAppointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedDate,
        preferredTime: preferredSlot,
        patient_id: patientData.patientId,
        userType,
        empId,
        companyCode
      })
    });

    const data = await res.json();
    if (res.ok) {
      setPaymentLink(data.paymentLink);
      setAppointmentId(data.appointmentDetails._id);
      setDoctorName(data.doctorName);
      if (userType === "corporate") {
        setAppointmentConfirmed(data.appointmentDetails);
        setStep(5);
      } else {
        setStep(4.5);
      }
    } else {
      setError(data.message || "Slot not available for the selected time. Please try another.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="book-step-section">
            <div className="book-user-type-buttons">
              <button onClick={() => setUserType("corporate")}>Corporate</button>
              <button onClick={() => { setUserType("retail"); setStep(2); }}>Retail</button>
            </div>
            {userType === "corporate" && (
              <>
                <input placeholder="Company Code" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} />
                <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                <button onClick={verifyCorporatePatient}>Verify</button>
                {companyError && <p className="book-error-text">{companyError}</p>}
              </>
            )}
          </div>
        );
      case 1.5:
        return (
          <div className="book-step-section">
            <h4>Book appointment for:</h4>
            <button onClick={() => { setFamilyOption("self"); setStep(2); }}>Self</button>
            <button onClick={() => { setFamilyOption("family"); setStep(1.6); }}>Family Member</button>
          </div>
        );
      case 1.6:
        return (
          <div className="book-step-section">
            {familyList.length > 0 && (
              <>
                <h4>Select Family Member</h4>
                {familyList.map((fm, index) => (
                  <button key={index} onClick={() => {
                    setPhoneNumber(fm.mobile);
                    setUserType("corporate");
                    setFamilyOption("family");
                    sendOTP(fm.mobile);
                  }}>
                    {fm.name} ({fm.relation})
                  </button>
                ))}
              </>
            )}
            <button onClick={() => navigate("/RegisterFamilyMember", { state: { empId, companyCode } })}>+ Add New Family Member</button>
          </div>
        );
      case 2:
        return (
          <div className="book-step-section">
            <input placeholder="Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <button onClick={() => sendOTP()}>Send OTP</button>
          </div>
        );
      case 3:
        return (
          <div className="book-step-section">
            <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={verifyOTP}>Verify OTP</button>
          </div>
        );
      case 4:
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
      case 4.5:
        return (
          paymentLink && userType !== "corporate" && (
            <div className="book-step-section">
              <h4>Proceed with Payment</h4>
              <a href={paymentLink} target="_blank" rel="noreferrer"><button>Pay Now</button></a>
            </div>
          )
        );
      case 5:
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
        <h2>Book Appointment</h2>
        {error && <p className="book-error-text">{error}</p>}
        {renderStep()}
      </div>
    </div>
  );
};

export default BookAppointment;