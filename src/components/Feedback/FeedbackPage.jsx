import React, { useState } from "react";
import axios from "axios";
import "./FeedbackPage.css";

const FeedbackPage = () => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [ratings, setRatings] = useState({
        relationship: 0,
        goalsTopics: 0,
        approachFit: 0,
        overall: 0,
    });
    const [comments, setComments] = useState("");

    // Send OTP
    const sendOtp = async () => {
        try {
            await axios.get(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${mobile}`);
            setStep(2);
            setMessage("OTP sent successfully.");
        } catch {
            setMessage("Failed to send OTP. Please try again.");
        }
    };

    // Verify OTP & fetch patient
    const verifyOtp = async () => {
        try {
            await axios.get(`https://backend-xhl4.onrender.com/OtpRoute/verify-otp/${mobile}/${otp}`);
            const res = await axios.get(`https://backend-xhl4.onrender.com/patientRoute/check/${mobile}`);
            const data = res.data;

            setPatient({
                _id: data.patientId,
                name: data.patientName,
                mobile: data.patientMobile,
                gender: data.patientGender,
            });

            setMessage(`Hello, ${data.patientName}!`);
            fetchAppointments(data.patientId);
            setStep(3);
        } catch {
            setMessage("OTP verification failed or patient not found.");
        }
    };

    // Fetch appointments without feedback
    const fetchAppointments = async (patientId) => {
        try {
            const res = await axios.get(`https://backend-xhl4.onrender.com/FeedbackRoute/appointments-without-feedback/${patientId}`);
            setAppointments(res.data);
        } catch {
            setMessage("Either feedback for all appointments has been submitted, or no sessions have been marked as completed yet.");
        }
    };

    // console.log("AppointmentData->", appointments);

    // Submit feedback
    const submitFeedback = async () => {
        try {
            await axios.post(`https://backend-xhl4.onrender.com/FeedbackRoute/submit`, {
                patient_id: patient._id,
                session_id: selectedAppointment._id,
                ratings,
                comments,
            });

            setMessage("✅ Feedback submitted successfully.");
            setStep(5);
        } catch {
            setMessage("Error submitting feedback. Please try again.");
        }
    };

    return (
        <div className="feedback-mainbg">
            <div className={`feedback-container ${step === 4 ? "feedback-expanded" : ""}`}>
                <h2>Therapy Feedback</h2>
                {message && <p className="feedback-message">{message}</p>}

                {step === 1 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <button onClick={sendOtp}>Send OTP</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={verifyOtp}>Verify OTP</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h4>Select an appointment to give feedback</h4>
                        <ul className="appointment-list">
                            {appointments.map((appt) => (
                                <li key={appt._id}>
                                    <button
                                        onClick={() => {
                                            setSelectedAppointment(appt);
                                            setStep(4);
                                        }}
                                    >
                                        {new Date(appt.DateOfAppointment).toLocaleString(undefined, {
                                            dateStyle: "medium",
                                            timeStyle: "short"
                                        })}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {step === 4 && (
                    <>
                        <h4>Rate your session</h4>
                        {[
                            {
                                key: "relationship",
                                left: "I did not feel heard, understood, or respected",
                                right: "I felt heard, understood, and respected"
                            },
                            {
                                key: "goalsTopics",
                                left: "We did not talk about what I wanted to work on",
                                right: "We talked about what I wanted to work on"
                            },
                            {
                                key: "approachFit",
                                left: "The therapist’s approach is not a good fit for me",
                                right: "The therapist’s approach is a good fit for me"
                            },
                            {
                                key: "overall",
                                left: "There was something missing in the session today",
                                right: "Overall today’s session was right for me"
                            }
                        ].map(({ key, left, right }) => (
                            <div className="srs-question-block" key={key}>
                                <div className="srs-labels">
                                    <span>{left}</span>
                                    <span>{right}</span>
                                </div>
                                {/* <div className="srs-scale">
                                {Array.from({ length: 11 }, (_, i) => (
                                    <label key={i}>
                                        <input
                                            type="radio"
                                            name={key}
                                            value={i}
                                            checked={ratings[key] === i}
                                            onChange={() => setRatings({ ...ratings, [key]: i })}
                                        />
                                        <span>{i}</span>
                                    </label>
                                ))}
                            </div> */}
                                <div className="rating-row">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={ratings[key]}
                                        onChange={(e) =>
                                            setRatings({ ...ratings, [key]: parseInt(e.target.value) })
                                        }
                                    />
                                    {/* <div class="slider-scale" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
     <span>0</span>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
    <span>10</span> 
   
  </div> */}
                                    <div className="slider-scale">
                                        {[...Array(11)].map((_, i) => (
                                            <span key={i}>{i}</span>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        ))}

                        <textarea
                            placeholder="Any comments about your session?"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}

                            style={{
                                width: "100%",
                                minHeight: "150px",
                                fontSize: "1rem",
                                padding: "10px",
                                resize: "none",
                                overflow: "hidden",
                                boxSizing: "border-box",

                            }}
                        />
                        <button onClick={submitFeedback}>Submit Feedback</button>
                    </>
                )}

                {step === 5 && (
                    <div className="thank-you">
                        <h4>Thank you for your feedback!</h4>
                        <p>We appreciate your input to help improve our services.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;