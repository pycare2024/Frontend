import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreeningTest.css";

const StartScreeningTest = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP, 3: Select Problems
    const [patientData, setPatientData] = useState(null);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const navigate = useNavigate();

    const problemSymptoms = {
        anxiety: ["Restlessness", "Racing thoughts", "Sweating"],
        depression: ["Low mood", "Fatigue", "Loss of interest"],
        sleep: ["Insomnia", "Nightmares", "Early waking"],
        ocd: ["Compulsive behaviors", "Intrusive thoughts", "Perfectionism"],
        ptsd: ["Flashbacks", "Irritability", "Avoidance"],
        others: ["Unspecified symptoms", "General distress", "Low confidence"]
    };

    const sendOTP = async (number = phoneNumber) => {
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${number}`);
        const data = await response.json();
        if (response.ok) setStep(2);  // After sending OTP, move to step 2
        else setError(data.message);
    };

    const verifyOTP = async () => {
        const response = await fetch(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${phoneNumber}/${otp}`);
        const data = await response.json();
        if (response.ok) {
            // OTP verified
            const patientRes = await fetch(`https://backend-xhl4.onrender.com/patientRoute/check/${phoneNumber}`);
            const pdata = await patientRes.json();
            if (patientRes.ok) {
                setPatientData(pdata);
                setStep(3); // Now show problem selection
            } else {
                // Not found - redirect to registration
                navigate("/BookAppointment", { state: { phoneNumber } });
            }
        } else {
            setError(data.message);
        }
    };

    const handleProblemSelect = (problem) => {
        if (selectedProblems.includes(problem)) {
            setSelectedProblems(selectedProblems.filter(p => p !== problem));
        } else {
            setSelectedProblems([...selectedProblems, problem]);
        }
    };

    const proceedToScreening = () => {
        if (selectedProblems.length === 0) {
            alert("Please select at least one issue before proceeding.");
            return;
        }
        // console.log(patientData);
        // console.log(patientData?.patientId);
        // console.log(patientData?.patientName);
        // console.log(patientData?.patientGender);
        // console.log(patientData?.patientMobile);
        // console.log(selectedProblems);
        navigate("/ScreenTestForm", {
            state: {
                patientId: patientData?.patientId,
                patientName: patientData?.patientName,
                phoneNumber: patientData?.patientMobile,
                patientGender: patientData?.patientGender,
                problems: selectedProblems
            }
        });
    };

    return (
        <div className="start-screening-page">
            <div className="start-screening-container">
                {step === 1 && (
                    <>
                        <h2>📞 Enter Your Phone Number</h2>
                        <input
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {error && <div className="error-message">{error}</div>}
                        <button onClick={() => sendOTP()}>Send OTP</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>🔒 Enter OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {error && <div className="error-message">{error}</div>}
                        <button onClick={verifyOTP}>Verify OTP</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>📝 Select Problems You Are Facing</h2>
                        <h3 style={{color:"#4285f4"}}>(You can choose more than one)</h3>
                        <div className="problem-grid-container">
  {Object.entries(problemSymptoms).map(([problem, symptoms]) => (
    <div
      key={problem}
      className={`problem-tile ${selectedProblems.includes(problem) ? "selected" : ""}`}
      onClick={() => handleProblemSelect(problem)}
    >
      <h3 className="problem-name">{problem.charAt(0).toUpperCase() + problem.slice(1)}</h3>
      
      <p className="symptom-label">Symptoms:</p>
      <div className="symptom-chip-container">
        {symptoms.map((symptom, i) => (
          <span key={i} className="symptom-chip">{symptom}</span>
        ))}
      </div>
    </div>
  ))}
</div>
                        <button onClick={proceedToScreening}>Proceed to Screening Test</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default StartScreeningTest;