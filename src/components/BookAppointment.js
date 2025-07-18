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
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [bookingFollowUp, setBookingFollowUp] = useState(false);
  // Additional state for follow-up booking confirmation
  const [awaitingFollowUpChoice, setAwaitingFollowUpChoice] = useState(false);
  const [followUpData, setFollowUpData] = useState(null);
  const [isFollowUp, setIsFollowUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("SelectedPatient has changed:", selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if (!awaitingFollowUpChoice && followUpData) {
      setStep(4); // proceed to booking step after user decides
    }
  }, [awaitingFollowUpChoice, followUpData]);

  useEffect(() => {
    if (!awaitingFollowUpChoice && followUpData) {
      bookAppointment(); // Now it will book with correct isFollowUp value
    }
  }, [awaitingFollowUpChoice, followUpData]);

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
      console.log("📡 Verification Response:", data);

      if (response.status === 200) {
        // ✅ Employee already registered in system
        setUserType("corporate");
        setPatientData(data.employee);
        setFamilyList(data.employee.familyMembers || []);
        setStep(1.6);
      }

      else if (response.status === 400 && data.exists === false && data.masterRecord) {
        // ✅ Found in master list, but not yet registered — proceed to registration
        navigate("/RegisterCorporateEmployee", {
          state: {
            empId: data.masterRecord.empId,
            companyCode,
            name: data.masterRecord.name
          }
        });
      }

      else if (response.status === 404) {
        // ❌ Not in master list OR company not registered
        setCompanyError(data.message || "Unauthorized access.");
      }

      else {
        // 🛑 Any other unknown response
        setCompanyError(data.message || "Unexpected error. Please try again.");
      }

    } catch (error) {
      console.error("❌ Error in verifyCorporatePatient:", error.message);
      setCompanyError("Network error. Please try again.");
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

        const latest = await fetchLatestAppointment(phoneNumber);
        if (latest?.followUpRecommended) {
          setFollowUpData(latest);
          setAwaitingFollowUpChoice(true);
          return; // Wait for user confirmation before proceeding
        }

        setStep(4); // go to appointment step
      } else {
        if (userType === "corporate" && familyOption === "family") {
          navigate("/RegisterFamilyMember", { state: { empId, companyCode } });
        } else {
          navigate("/RegisterPatient", { state: { phoneNumber } });
        }
      }
    } else {
      setError(data.message);
    }
  };

  const fetchAvailableDates = async () => {
    const res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/availableDates");
    const data = await res.json();
    if (res.ok) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize to midnight

      const dates = Object.entries(data)
        .filter(([key]) => key.startsWith("Date"))
        .map(([, val]) => val)
        .filter((dateStr) => {
          const dateObj = new Date(dateStr);
          dateObj.setHours(0, 0, 0, 0);
          return dateObj >= today;
        });

      setAvailableDates(dates);
    }
  };

  const fetchLatestAppointment = async (number) => {
    try {
      const res = await fetch(`https://backend-xhl4.onrender.com/AppointmentRoute/appointments/latest/${number}`);
      const data = await res.json();

      if (res.ok && data) {
        setLatestAppointment(data); // for UI display
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching latest appointment:", error);
      return null;
    }
  };


  const bookAppointment = async () => {
    if (!patientData?.patientId) {
      setError("Patient ID missing. Please verify your mobile number again.");
      return;
    }

    try {
      const latest = await fetchLatestAppointment(phoneNumber);

      if (latest?.followUpRecommended && !awaitingFollowUpChoice && followUpData === null) {
        setFollowUpData(latest);
        setAwaitingFollowUpChoice(true);
        return;
      }

      let res;
      if (isFollowUp && followUpData) {
        res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/bookFollowupAppointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedDate,
            preferredTime: preferredSlot,
            patient_id: patientData.patientId,
            userType,
            empId,
            companyCode,
            previousAppointmentId: followUpData._id,
            doctor_id: followUpData.doctor_id,
          }),
        });
      } else {
        res = await fetch("https://backend-xhl4.onrender.com/AppointmentRoute/bookAppointment", {
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
      }

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
    } catch (error) {
      console.error("Booking error:", error);
      setError("Something went wrong while booking the appointment.");
    }
  };

  const fetchPatientByPhone = async (phone) => {
    try {
      const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/getPatientByPhone/${phone}`);
      const data = await response.json();
      console.log("Fetched patient:", data);

      if (response.ok && data.patient) {
        setSelectedPatient({
          id: data.patient?._id || "",
          name: data.patient?.Name || "",
          gender: data.patient?.Gender || "",
          mobile: data.patient?.Mobile || "",
        });
      } else {
        console.error("No patient found with this phone");
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="book-step-section">
            <div className="book-user-type-buttons">
              <button onClick={() => setUserType("corporate")}>Corporate</button>
              <button onClick={() => { setUserType("retail"); setStep(2); }} disabled style={{ backgroundColor: "gray" }}>Retail</button>
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
      // case 1.5:
      //   return (
      //     <div className="book-step-section">
      //       <h4>Book appointment for:</h4>
      //       <button onClick={() => { setFamilyOption("self"); setStep(2); }}>Self</button>
      //       <button onClick={() => { setFamilyOption("family"); setStep(1.6); }}>Family Member</button>
      //     </div>
      //   );

      case 1.6:
        return (
          <div className="book-step-section">
            <h4>Select Patient</h4>

            {/* Always show Self option first */}
            <button
              onClick={async () => {
                console.log(patientData);
                const phone = patientData?.employeePhone;
                setPhoneNumber(phone);
                setUserType("corporate");
                setFamilyOption("self");

                // 1. Fetch full patient data
                await fetchPatientByPhone(phone);

                // 2. Check for follow-up
                await fetchLatestAppointment(phone);
                if (latestAppointment && latestAppointment.followUpRecommended) {
                  alert("A follow-up was recommended in the last session. Booking with the same doctor.");
                  setBookingFollowUp(true);
                  setDoctorId(latestAppointment.doctorId);
                } else {
                  setDoctorId(null);
                  setLatestAppointment(null);
                }

                // 3. Proceed
                setStep(1.7);
              }}
            >
              Self
            </button>

            {familyList.length > 0 &&
              familyList.map((fm, index) => (
                <button
                  key={index}
                  onClick={async () => {
                    const phone = fm.mobile;
                    setPhoneNumber(phone);
                    setUserType("corporate");
                    setFamilyOption("family");

                    // 1. Fetch full patient data
                    await fetchPatientByPhone(phone);

                    // 2. Check for follow-up
                    await fetchLatestAppointment(phone);
                    if (latestAppointment && latestAppointment.followUpRecommended) {
                      alert("A follow-up was recommended in the last session. Booking with the same doctor.");
                      setBookingFollowUp(true);
                      setDoctorId(latestAppointment.doctorId);
                    } else {
                      setDoctorId(null);
                      setLatestAppointment(null);
                    }

                    // 3. Proceed
                    setStep(1.7);
                  }}
                >
                  {fm.name} ({fm.relation})
                </button>
              ))}

            {/* Always show Add New Family Member option */}
            <button
              onClick={() =>
                navigate("/RegisterFamilyMember", { state: { empId, companyCode } })
              }
            >
              + Add New Family Member
            </button>
          </div>
        );

      case 1.7:
        return (
          <div className="book-step-section">
            <h4>Proceed to Appointment Booking</h4>

            <div className="appointment-option">
              <button
                onClick={() => {
                  sendOTP(phoneNumber); // ⏩ Direct booking via OTP
                }}
              >
                Book Appointment
              </button>
            </div>
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
        {/* Follow-up confirmation dialog */}
        {awaitingFollowUpChoice && followUpData && (
          <div className="followup-dialog enhanced-dialog">
            <h3>👩‍⚕️ Follow-Up Recommendation</h3>
            <p>
              Our records indicate that <strong>Dr. {followUpData.doctorName}</strong> recommended a follow-up session based on your last appointment.
            </p>
            <p>Would you like to proceed with booking this follow-up now?</p>
            <div className="followup-dialog-buttons">
              <button className="confirm-btn" onClick={() => {
                setIsFollowUp(true);
                setAwaitingFollowUpChoice(false);
              }}>
                ✅ Yes, Book Follow-Up
              </button>
              <button className="decline-btn" onClick={() => {
                setIsFollowUp(false);
                setAwaitingFollowUpChoice(false);
              }}>
                ❌ No, Book New Appointment
              </button>
            </div>
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
};

export default BookAppointment;