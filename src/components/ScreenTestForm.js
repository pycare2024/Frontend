//COMPLETE SCREENING TEST FORM , WHICH ASKS QUESTIONS FROM PATIENT AND GIVE THEM A AI GENERATED REPORT

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScreenTestForm.css";

function formatAssessmentId(rawId, testDate) {
  if (!rawId) return "";

  const year = new Date(testDate).getFullYear();
  const shortId = rawId.slice(-4);  // last 4 characters

  return `P-${year}-${shortId}`;
}

function parseReport(generatedReport) {
  if (!generatedReport) return null;

  const sections = {
    topDetails: {},
    testSummary: [],
    observations: "",
    riskClassification: "",
    recommendations: "",
    confidentialityNote: ""
  };

  // 1. Extract Top Details first
  const topDetailsMatch = generatedReport.match(/Top Details:\s*([\s\S]*?)\s*1\. Test Summary:/);

  if (topDetailsMatch) {
    const topDetailsText = topDetailsMatch[1].trim();
    topDetailsText.split("\n").forEach(line => {
      const [key, value] = line.split(":").map(part => part.trim());
      if (key && value) {
        sections.topDetails[key] = value;
      }
    });
  }

  // 2. Now split the remaining sections by section numbers
  const parts = generatedReport.split(/(?:\n|^)1\. Test Summary:|2\. AI Generated Observations:|3\. Risk Classification:|4\. Recommended Next Steps:|5\. Confidentiality Note:/);

  if (parts.length < 6) {
    console.error("Report format invalid!");
    return null;
  }

  // parts[0] = top details text
  // parts[1] = Test Summary
  // parts[2] = Observations
  // parts[3] = Risk Classification
  // parts[4] = Recommendations
  // parts[5] = Confidentiality Note

  // 3. Parse Test Summary table
  const lines = parts[1].trim().split("\n").filter(line => line.trim() !== "");
  for (let i = 2; i < lines.length; i++) { // skip header and separator
    const cells = lines[i].split("|").map(cell => cell.trim());
    if (cells.length === 3) {
      sections.testSummary.push({
        tool: cells[0],
        score: cells[1],
        risk: cells[2]
      });
    }
  }

  // 4. Assign other parts
  sections.observations = parts[2]?.trim() || "";
  sections.riskClassification = parts[3]?.trim() || "";
  sections.recommendations = parts[4]?.trim() || "";
  sections.confidentialityNote = parts[5]?.trim() || "";

  return sections;
}

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
  const [parsedReport, setParsedReport] = useState(null);
  const [testId, setTestId] = useState("");
  const [userType, setUserType] = useState("");
  const [empId, setEmpId] = useState("");
  const [compName, setCompName] = useState("");

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: patientId,
          patientName,
          answers,
          problems,
          sectionCounts: problems.reduce((acc, p) => {
            acc[p] = questions.filter(q => q.section === p).length;
            return acc;
          }, {})
        }),
      });

      const data = await response.json();
      // console.log("DATA->",data);

      if (response.ok) {
        setSuccess("Assessment submitted successfully!");
        setReport(data.report || "No report generated."); // ✅ Only setReport
        setTestId(data.assessment_id);
        setUserType(data.userType || "");
        setEmpId(data.empId || "");
        setCompName(data.companyName || "");

      } else {
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      console.log(err);
      setError("Error submitting assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ OUTSIDE of handleSubmit:
  useEffect(() => {
    if (report) {
      const structuredReport = parseReport(report);
      setParsedReport(structuredReport);
    }
  }, [report]);

  const testData = [
    { abbreviation: "PCL-5", fullForm: "Post-Traumatic Stress Disorder Checklist for Diagnostic and Statistical Manual of Mental Disorders, 5th Edition" },
    { abbreviation: "ISI", fullForm: "Insomnia Severity Index" },
    { abbreviation: "PHQ-9", fullForm: "Patient Health Questionnaire-9" },
    { abbreviation: "GAD-7", fullForm: "Generalized Anxiety Disorder-7" },
    { abbreviation: "BAI", fullForm: "Beck Anxiety Inventory" },
    { abbreviation: "BDI-II", fullForm: "Beck Depression Inventory-II" },
    { abbreviation: "Y-BOCS", fullForm: "Yale-Brown Obsessive Compulsive Scale" },
  ];

  const testRows = testData.map((test, index) => `
  <tr>
    <td>${index + 1}</td>
    <td>${test.abbreviation}</td>
    <td>${test.fullForm}</td>
  </tr>
`).join("");

  const handlePrint = () => {
    if (!parsedReport) {
      alert("No report available to print!");
      return;
    }

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
                margin: 0;
                padding: 0;
                page-break-inside: avoid;
              }
            }
  
            body {
              font-family: 'Segoe UI', sans-serif;
              margin: 20px;
              background-color: #ffffff;
              color: #000;
              font-size: 12px;
              position: relative;
            }
  
            .watermark {
              position: fixed;
              top: 30%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 80px;
              color: rgba(0, 0, 0, 0.05);
              z-index: 0;
              pointer-events: none;
              user-select: none;
            }
  
            .report-container {
              max-width: 750px;
              margin: auto;
              padding: 20px;
              background-color: #fff;
              z-index: 1;
              position: relative;
            }
  
            .header {
              display: flex;
              align-items: center;
              margin-bottom: 30px;
            }
  
            .header img {
              width: 60px;
              height: 60px;
              margin-right: 20px;
              border: 2px solid #4285F4;
              border-radius: 10px;
            }
  
            .header-text {
              display: flex;
              flex-direction: column;
            }
  
            .header-text h1 {
              color: #4285F4;
              font-size: 1.8rem;
              margin: 0;
            }
  
            .header-text p {
              font-style: italic;
              color: #555;
              margin-top: 4px;
              font-size: 0.9rem;
            }
  
            .info-row {
              display: flex;
              gap: 40px;
              margin-bottom: 30px;
            }
  
            .info-block {
              flex: 1;
            }
  
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
  
            .section-title {
              font-size: 1.2rem;
              color: #4285F4;
              margin-bottom: 12px;
              font-weight: 600;
            }

            .section-2
            {
              font-size: 1.2rem;
              color: #4285F4;
              margin-bottom: 15px;
              font-weight: 600;
              text-align: center;
              text-decoration: underline;
            }

            .section-3
            {
              font-size: 1.2rem;
              color: #4285F4;
              margin-bottom: 25px;
              font-weight: 600;
              text-align: center;
              text-decoration: underline;
            }
  
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
  
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: center;
              font-size: 11px;
            }
  
            th {
              background-color: #4285F4;
              color: white;
              font-weight: bold;
            }
  
            .section p {
              margin: 8px 0;
              font-size: 0.95rem;
              line-height: 1.4;
              white-space: pre-wrap;
            }
  
            /* Page Breaks between big sections (if needed) */
            .page-break {
              page-break-before: always;
            }

            .tests-heading {
font-size: 1.2rem;
              color: #4285F4;
              margin-bottom: 12px;
              font-weight: 600;
}

.tests-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 30px;
}

.tests-table th,
.tests-table td {
  border: 1px solid #ddd;
  padding: 12px 14px;
  text-align: left;
}

.tests-table th {
  background-color: #4285F4;
  color: white;
  font-weight: 600;
}
          </style>
        </head>
        <body>
          <div class="watermark">PsyCare</div>
  
          <div class="report-container">
            <div class="header">
              <img src="${window.location.origin}/PsyCareMain.png" alt="PsyCare Logo" />
              <div class="header-text">
                <h1>PsyCare</h1>
                <p>Your Path to Mental Wellness</p>
              </div>
            </div>

            <div>
            <h1 class="section-2">Screening Test Report</h1>
            <h2 class="section-3">Psycometric Analysis - Individual(Report 1)</h2>
            </div>
  
            <div class="info-row">
              <div class="info-block">
                <div class="section-title">Patient Details</div>
                <p><strong>Name:</strong> ${patientName}</p>
                <p><strong>Mobile:</strong> ${phoneNumber}</p>
                <p><strong>Gender:</strong> ${patientGender}</p>
                ${userType === "corporate" ? `
                  <p><strong>Employee Id:</strong> ${empId}</p>
                  <p><strong>Company Name:</strong> ${compName}</p>
                ` : ""}
              </div>
  
              <div class="info-block">
                <div class="section-title">Assessment Details</div>
                <p><strong>Date:</strong> ${parsedReport.topDetails["Date"]}</p>
                <p><strong>Assessment ID:</strong> ${formatAssessmentId(testId, testMeta.date)}</p>
                <p><strong>Assessment Mode:</strong> ${parsedReport.topDetails["Assessment_Mode"]}</p>
                <p><strong>Assessment Type:</strong> ${parsedReport.topDetails["Assessment_Type"]}</p>
                <p><strong>Tools Used:</strong> ${parsedReport.topDetails["Tools_Used"]}</p>
              </div>
            </div>
  
            <div class="section">
              <div class="section-title">1. Test Summary</div>
              <table>
                <thead>
                  <tr>
                    <th>Tool Used</th>
                    <th>Score</th>
                    <th>Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  ${parsedReport.testSummary.length > 0 ?
        parsedReport.testSummary.map(item => `
                      <tr>
                        <td>${item.tool}</td>
                        <td>${item.score}</td>
                        <td>${item.risk}</td>
                      </tr>
                    `).join('') :
        `<tr><td colspan="3">No data available</td></tr>`
      }
                </tbody>
              </table>
            </div>
  
            <div class="section">
              <div class="section-title">2. AI Generated Observations</div>
              <p>${parsedReport.observations}</p>
            </div>
  
            <div class="section">
              <div class="section-title">3. Risk Classification</div>
              <p>${parsedReport.riskClassification}</p>
            </div>
  
            <div class="section">
              <div class="section-title">4. Recommended Next Steps</div>
              <p>${parsedReport.recommendations}</p>
            </div>
  
            <div class="section">
              <div class="section-title">5. Confidentiality Note</div>
              <p>${parsedReport.confidentialityNote}</p>
            </div>

            <div class="page-break">
            <h2 class="tests-heading">Psycometric Tools Used</h2>
            <table class="tests-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Test Abbreviation</th>
                  <th>Test Full Form</th>
                </tr>
              </thead>
              <tbody>
                ${testRows}
              </tbody>
            </table>
            <div className="section">
            <h3 class="section-title">🔵 Screening Test Report</h3>
              <ul>
                  <li>Summary of the mental health screening results based on standardized tools (e.g., PHQ-9, GAD-7, ISI), highlighting key symptoms or concerns.</li>
                  <li>Scores and severity levels (e.g., mild, moderate, severe) for each test taken, with brief interpretation.</li>
                  <li>Personalized recommendations or next steps based on the individual’s mental health profile.</li>
              </ul>
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
    }, 300);
  };

  if (loading) return <div className="loading">Loading questions...</div>;

  const currentQuestion = questions[currentIndex];



  return (
    <div className="test-form-container">
      <div className="screening-container">
        <h2>Screening Test</h2>

        {report ? (
          <div className="report-box">
            <h3>Your Screening Report</h3>
            <div className="report-text">
              <h4><strong>Report for {patientName}</strong></h4>
              {report
                .split(/(?=\*\*Summary:|\*\*Findings:|\*\*Recommendations:)/)
                .map((section, index) => (
                  <div key={index} style={{ marginBottom: "1.2rem", lineHeight: "1.6" }}>
                    <p dangerouslySetInnerHTML={{ __html: section.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}></p>
                  </div>
                ))}
            </div>
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
    </div>
  );
};

export default ScreenTestForm;