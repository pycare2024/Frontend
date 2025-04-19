//COMPLETE SCREENING TEST FORM , WHICH ASKS QUESTIONS FROM PATIENT AND GIVE THEM A AI GENERATED REPORT

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScreenTestForm.css";

const ScreenTestForm = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(53).fill(null));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [report, setReport] = useState("");
  const [testMeta, setTestMeta] = useState({ date: "", time: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const { patientId, phoneNumber, patientName, patientGender, problems } = location.state || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://backend-xhl4.onrender.com/NewScreeningTestRoute/getQuestions");
        const data = await res.json();
        if (!res.ok || !data.questions) throw new Error();

        // Group questions by section
        const sectionMap = {};
        for (const q of data.questions) {
          if (!sectionMap[q.section]) sectionMap[q.section] = [];
          sectionMap[q.section].push(q);
        }

        // Sort each section by `order`
        for (const sec in sectionMap) {
          sectionMap[sec].sort((a, b) => a.order - b.order);
        }

        // Build filteredQuestions respecting `problems` order
        const filteredQuestions = problems.flatMap(p => sectionMap[p] || []);

        console.log("🧪 Ordered sections in final questions:", filteredQuestions.map(q => q.section));

        setQuestions(filteredQuestions);
        setAnswers(Array(filteredQuestions.length).fill(null));
        setLoading(false);
      } catch (err) {
        console.error("❌ Error loading questions:", err);
        setError("Failed to load questions.");
      }
    };

    fetchQuestions();
  }, [problems]);

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
          problems,
          sectionCounts: problems.reduce((acc, p) => {
            acc[p] = questions.filter(q => q.section === p).length;
            return acc;
          }, {})
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
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
  
            body {
              font-family: 'Segoe UI', sans-serif;
              padding: 40px;
              background-color: #f4f6f8;
              color: #333;
            }
  
            .report-container {
              max-width: 800px;
              margin: auto;
              background-color: #fff;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
  
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
  
            .header img {
              width: 100px;
              margin-bottom: 10px;
              border: 2px solid #4285F4;
              border-radius: 10px;
            }
  
            .header h1 {
              color: #4285F4;
              font-size: 2.2rem;
              margin: 0;
            }
  
            .header p {
              font-style: italic;
              color: #555;
              margin-top: 4px;
            }
  
            .section {
              margin-bottom: 30px;
            }
  
            .section-title {
              font-size: 1.3rem;
              color: #4285F4;
              border-bottom: 2px solid #e0e0e0;
              padding-bottom: 6px;
              margin-bottom: 15px;
              font-weight: 600;
            }
  
            .section p {
              margin: 8px 0;
              font-size: 1rem;
            }
  
            .summary {
              background-color: #f1f8ff;
              border-left: 4px solid #4285F4;
              padding: 20px;
              border-radius: 10px;
              font-size: 1rem;
              line-height: 1.6;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <img src="${window.location.origin}/PsyCareMain.png" alt="PsyCare Logo" />
              <h1>PsyCare</h1>
              <p>Your Path to Mental Wellness</p>
            </div>
  
            <div class="section">
              <div class="section-title">Patient Details</div>
              <p><strong>Name:</strong> ${patientName}</p>
              <p><strong>Mobile:</strong> ${phoneNumber}</p>
              <p><strong>Gender:</strong> ${patientGender}</p>
              <p><strong>Date:</strong> ${testMeta.date}</p>
              <p><strong>Time:</strong> ${testMeta.time}</p>
            </div>
  
            <div class="section">
              <div class="section-title">AI-Generated Report Summary</div>
              <div class="summary">
                ${report}
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 300); // ⏱ give styles/images time to render
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
          {currentQuestion ? (
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
            </>
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>No questions available. Please try again later.</p>
          )}
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