//COMPLETE SCREENING TEST FORM , WHICH ASKS QUESTIONS FROM PATIENT AND GIVE THEM A AI GENERATED REPORT

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScreenTestForm.css";

const ScreenTestForm = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(31).fill(null));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [report, setReport] = useState("");
  const [testMeta, setTestMeta] = useState({ date: "", time: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const patientId = location.state?.patientId;
  const phoneNumber = location.state?.phoneNumber;
  const patientName = location.state?.patientName;
  const patientGender = location.state?.gender || "-";

  useEffect(() => {
    fetch("https://backend-xhl4.onrender.com/NewScreeningTestRoute/getQuestions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(() => setError("Failed to load questions."));
  }, []);

  const handleOptionSelect = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setTestMeta({ date, time });

      const response = await fetch("https://backend-xhl4.onrender.com/NewScreeningTestRoute/submitAssessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_id: patientId,
          answers,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Assessment submitted successfully!");
        setReport(data.report || "No report generated.");
      } else {
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      setError("Error submitting assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>PsyCare - Mental Wellness Report</title>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              padding: 2rem;
              color: #333;
              background-color: #f9fafb;
            }
            .header {
              text-align: center;
              margin-bottom: 2rem;
            }
            .header h1 {
              color: #4285f4;
              margin-bottom: 0.2rem;
            }
            .header p {
              font-style: italic;
              color: #555;
            }
            .details {
              margin-bottom: 2rem;
              padding: 1rem;
              background: #ffffff;
              border: 1px solid #ccc;
              border-radius: 8px;
            }
            .details p {
              margin: 0.4rem 0;
              font-size: 1rem;
            }
            .report-box {
              border: 1px solid #ccc;
              padding: 1.5rem;
              border-radius: 10px;
              background: #ffffff;
            }
            .report-box h3 {
              margin-bottom: 1rem;
              color: #1d4ed8;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PsyCare</h1>
            <p>Your Path to Mental Wellness</p>
          </div>
          <div class="details">
            <p><strong>Patient Name:</strong> ${patientName}</p>
            <p><strong>Gender:</strong> ${patientGender}</p>
            <p><strong>Date:</strong> ${testMeta.date}</p>
            <p><strong>Time:</strong> ${testMeta.time}</p>
          </div>
          <div class="report-box">
            <h3>AI-Generated Report Summary</h3>
            <p>${report}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <div className="loading">Loading questions...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="screening-container">
      <h2>Screening Test</h2>

      {report ? (
        <div className="report-box">
          <h3>Your Screening Report</h3>
          <div className="report-text">{report}</div>
          <div className="report-actions">
            <button className="print-btn" onClick={handlePrint}>Print Report</button>
            <button
              className="proceed-btn"
              onClick={() => navigate("/BookAppointment", {
                state: {
                  patientId,
                  phoneNumber,
                  patientName,
                },
              })}
            >
              Proceed to Book Appointment
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="question-count">Question {currentIndex + 1} of {questions.length}</p>
          <div className="question-box">
            <h3>{currentQuestion.question}</h3>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${answers[currentIndex] === index + 1 ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(index + 1)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="navigation-buttons">
            <button onClick={handleBack} disabled={currentIndex === 0}>Back</button>
            {currentIndex < questions.length - 1 ? (
              <button onClick={handleNext} disabled={answers[currentIndex] === null}>Next</button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}>Submit</button>
            )}
          </div>
        </>
      )}

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ScreenTestForm;