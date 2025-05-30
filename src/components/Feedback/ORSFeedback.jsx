import React, { useState } from "react";
import axios from "axios";
import "./ORSFeedback.css"

const ORSFeedback = () => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [ratings, setRatings] = useState({
        individual: 0,
        interpersonal: 0,
        social: 0,
        overall: 0,
    });
    const [comments, setComments] = useState("");

    const sendOtp = async () => {
        try {
            await axios.get(`https://backend-xhl4.onrender.com/OtpRoute/send-otp/${mobile}`);
            setMessage("OTP sent successfully.");
            setStep(2);
        } catch {
            setMessage("Failed to send OTP. Please try again.");
        }
    };

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

            setMessage(`Welcome ${data.patientName}!`);
            fetchAppointments(data.patientId);
            setStep(3);
        } catch {
            setMessage("OTP verification failed or patient not found.");
        }
    };

    const fetchAppointments = async (patientId) => {
        try {
            const res = await axios.get(`https://backend-xhl4.onrender.com/FeedbackRoute/appointments-without-ORS/${patientId}`);
            setAppointments(res.data);
        } catch {
            setMessage("No completed appointments found or feedback already given.");
        }
    };

    const submitORSFeedback = async () => {
        try {
            await axios.post(`https://backend-xhl4.onrender.com/FeedbackRoute/submit-ors`, {
                patientId: patient._id,
                therapistId: selectedAppointment.doctor_id,
                sessionId: selectedAppointment._id,
                filledBy: "Self",
                ratings: {
                    individual: Number(ratings.individual),
                    interpersonal: Number(ratings.interpersonal),
                    social: Number(ratings.social),
                    overall: Number(ratings.overall),
                },
                notes: comments,
            });
            setMessage("✅ ORS feedback submitted successfully.");
            setStep(5);
        } catch (error) {
            console.error("Submit ORS feedback error:", error.response?.data || error.message);
            setMessage("Error submitting ORS feedback. Please try again.");
        }
    };

    return (
        <div className="orsmain">
        <div className={`feedback-container ${step === 4 ? "feedback-expanded" : ""}`}> 
            <h2>ORS Feedback</h2>
            {message && <p className="feedback-message">{message}</p>}

            {step === 1 && (
                <>
                    <input
                        type="text"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        
                    />
                    <button onClick={sendOtp} style={{ padding: "10px 20px" }}>Send OTP</button>
                </>
            )}

            {step === 2 && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                    />
                    <button onClick={verifyOtp} style={{ padding: "10px 20px" }}>Verify OTP</button>
                </>
            )}

            {step === 3 && (
                <>
                    <h4>Select an appointment to give ORS feedback</h4>
                    <ul className="appointment-list">
                        {appointments.map((appt) => (
                            <li key={appt._id} style={{ marginBottom: "10px" }}>
                                <button
                                    onClick={() => {
                                        setSelectedAppointment(appt);
                                        setStep(4);
                                    }}
                                    style={{ padding: "10px", width: "100%" }}
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
                    <h4>Rate your session based on how you’ve been doing this week</h4>
                    {[
                        { key: "individual", label: "Individually (personal well-being)" },
                        { key: "interpersonal", label: "Interpersonally (family, close relationships)" },
                        { key: "social", label: "Socially (work, school, friendships)" },
                        { key: "overall", label: "Overall (general sense of well-being)" },
                    ].map(({ key, label }) => (
                        <div key={key} className="srs-question-block">
                            <div className="srs-labels"><label><strong>{label}</strong></label></div>
                            
                            <div className="rating-row">
                                <input
                                type="range"
                                min="0"
                                max="10"
                                value={ratings[key]}
                                onChange={(e) =>
                                    setRatings({ ...ratings, [key]: parseInt(e.target.value) })
                                }
                                style={{ width: "100%" }}
                            />
                            <div className="slider-scale">
                                {[...Array(11)].map((_, i) => (
                                    <span key={i}>{i}</span>
                                ))}
                            </div>
                            </div>
                        </div>
                    ))}

                    <textarea
                        placeholder="Any comments about your week or session?"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        style={{
                            // width: "100%",
                            // minHeight: "100px",
                            // padding: "10px",
                            // marginTop: "20px",
                            // resize: "none",
                                width: "100%",
                                minHeight: "150px",
                                fontSize: "1rem",
                                padding: "10px",
                                resize: "none",
                                overflow: "hidden",
                                boxSizing: "border-box",
                        }}
                    />
                    <button onClick={submitORSFeedback} style={{ marginTop: "10px", padding: "10px 20px" }}>
                        Submit ORS Feedback
                    </button>
                </>
            )}

            {step === 5 && (
                <div className="thank-you">
                    <h4>Thank you for your ORS feedback!</h4>
                    <p>We value your input to enhance our services.</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default ORSFeedback;