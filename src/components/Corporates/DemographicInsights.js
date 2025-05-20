// DemographicInsights.js
import React, { useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./DemographicInsights.css";
import { marked } from 'marked';

const COLORS = ["#4285F4", "#FBBC05", "#34A853", "#EA4335", "#A142F4", "#F4B400"];


const DemographicInsights = () => {
  const [companyCode, setCompanyCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geminiSummary, setGeminiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const fetchGeminiSummary = async (demographicData) => {
    setSummaryLoading(true);
    setGeminiSummary("");

    try {
      const response = await fetch("https://backend-xhl4.onrender.com/GeminiRoute/summarizeDemographics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ demographicData }),
      });

      const result = await response.json();
      setGeminiSummary(result.summary);
    } catch (error) {
      console.error("Error fetching Gemini summary:", error);
      setGeminiSummary("Failed to generate summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const fetchData = async (e) => {
    e.preventDefault();
    if (!companyCode.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-xhl4.onrender.com/CorporateRoute/demographic-insights/${companyCode}`
      );
      console.log(response.data);
      setData(response.data);
      fetchGeminiSummary(response.data);
    } catch (error) {
      alert("Failed to fetch demographic data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section");
    if (!printContent) {
      console.error("Print section not found!");
      return;
    }

    const logoURL = `${window.location.origin}/PsyCareMain.png`;

    const WindowPrt = window.open("", "", "width=1200,height=900");

    WindowPrt.document.write(`
      <html>
        <head>
          <title>Demographic Insights Report - PsyCare</title>
          <style>
  /* Print color fix */
* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 50px 60px;
  background: #f9fafb;
  color: #222;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Container holding whole report */
.report-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Each "page" that will break after printing */
.print-page {
  background: #fff;
  padding: 40px 50px;
  margin-bottom: 70px;
  border-radius: 12px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  page-break-after: always;
  break-after: page;
  /* Avoid page break inside */
  page-break-inside: avoid;
}

/* Prevent break after last page */
.print-page:last-child {
  page-break-after: auto;
}

/* Header section with logo and title */
.header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
}

.header img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 16px;
  border: 3px solid #4285F4;
  box-shadow: 0 0 10px rgba(66, 133, 244, 0.2);
}

.header-text h1 {
  font-size: 36px;
  color: #4285F4;
  font-weight: 700;
  margin: 0;
}

.header-text p {
  font-size: 18px;
  color: #555;
  margin-top: 6px;
}

/* Main Titles */
h1, h2, h3 {
  color: #4285F4;
  font-weight: 700;
  margin-top: 0;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-top: 35px;
  margin-bottom: 15px;
}

h3 {
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 12px;
}

/* Text content */
p, li {
  font-size: 16px;
  line-height: 1.7;
  color: #333;
}

ul {
  margin-left: 22px;
  margin-bottom: 15px;
}

/* Horizontal rule with accent color */
hr {
  border: none;
  border-top: 3px solid #4285F4;
  margin: 30px 0;
}

/* Chart container for print */
.chart-container {
  margin-top: 35px;
  padding: 20px;
  background: #f0f5ff;
  border-radius: 12px;
  box-shadow: inset 0 0 12px rgba(66, 133, 244, 0.12);
}

/* Summary box */
.di-summary {
  background: #e8f0fe;
  border-left: 6px solid #4285F4;
  padding: 25px 30px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(66, 133, 244, 0.1);
  margin-bottom: 40px;
}

/* Description text for charts */
.di-description {
  font-size: 15px;
  color: #555;
  margin-bottom: 14px;
  font-style: italic;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 12px;
}

th, td {
  border: 1px solid #d1d9e6;
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #4285F4;
  color: white;
  font-weight: 400;
}

/* Thank you page */
.thank-you {
  text-align: center;
  padding: 120px 20px;
}

.thank-you h1 {
  font-size: 42px;
  color: #34A853;
  font-weight: 800;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.15);
}
/* Responsive tweaks */
@media print {
  body {
    background: white;
    margin: 0;
    padding: 0;
  }

  .print-page {
    box-shadow: none;
    border-radius: 0;
    margin: 0 0 40px 0;
    padding: 30px 40px;
  }
  
  /* Hide elements you don’t want to print here */
  button, input, form {
    display: none !important;
  }
}
</style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <img src="${logoURL}" alt="PsyCare Logo" onerror="this.style.display='none'" />
              <div class="header-text">
                <h1>PsyCare</h1>
                <p>Your Path to Mental Wellness</p>
              </div>
            </div>
            <hr />
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    WindowPrt.document.close();
    WindowPrt.focus();

    // Ensure resources like the logo load before printing
    WindowPrt.onload = () => {
      setTimeout(() => {
        WindowPrt.print();
        WindowPrt.close();
      }, 500);
    };
  };

  const formatData = (obj) =>
    obj ? Object.entries(obj).map(([name, value]) => ({ name, value })) : [];

  const testData = [
    {
      abbreviation: "PCL-5",
      fullForm: "Post-Traumatic Stress Disorder Checklist for Diagnostic and Statistical Manual of Mental Disorders, 5th Edition",
      description: "A 20-item self-report measure assessing symptoms of PTSD based on DSM-5 criteria."
    },
    {
      abbreviation: "ISI",
      fullForm: "Insomnia Severity Index",
      description: "Evaluates the nature, severity, and impact of insomnia over a 2-week period."
    },
    {
      abbreviation: "PHQ-9",
      fullForm: "Patient Health Questionnaire-9",
      description: "Screens for depression severity by assessing frequency of depressive symptoms."
    },
    {
      abbreviation: "GAD-7",
      fullForm: "Generalized Anxiety Disorder-7",
      description: "Assesses anxiety severity and symptoms based on the GAD criteria."
    },
    {
      abbreviation: "BAI",
      fullForm: "Beck Anxiety Inventory",
      description: "Measures the severity of anxiety symptoms through a 21-question inventory."
    },
    {
      abbreviation: "BDI-II",
      fullForm: "Beck Depression Inventory-II",
      description: "A widely used tool to evaluate the intensity of depression in individuals aged 13 and older."
    },
    {
      abbreviation: "Y-BOCS",
      fullForm: "Yale-Brown Obsessive Compulsive Scale",
      description: "Clinician-administered or self-report scale to assess severity of OCD symptoms."
    }
  ];

  return (
    <div className="demographic">
      <div className="di-container">
        <h1 className="di-title">📊 Demographic Insights Dashboard</h1>
        <form className="di-form" onSubmit={fetchData}>
          <input
            type="text"
            placeholder="Enter Company Code"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Generate Report"}
          </button>
        </form>

        {data && (
          <div id="print-section">
            <div className="di-data-section">
              <div className="print-page">
                <div className="di-summary">
                  <h1 style={{ color: "#4285F4", textAlign: "center", fontWeight: "bold" }}>📊 Demographic Insights Report</h1>
                  <h2 style={{ textAlign: "center" }}>Psycometric Analysis - Enterprise(Report 3)</h2>
                  <h2>Total Patients: {data.totalPatients}</h2>
                  <p>Company Code: {data.companyCode}</p>
                  <p><strong>Overview:</strong> This report presents a demographic breakdown of employees who have participated in mental wellness programs under the provided company code.</p>
                  <ul>
                    <li>Useful for identifying engagement patterns across departments or branches.</li>
                    <li>Supports HR teams in customizing initiatives for targeted groups.</li>
                    <li>Helps understand organizational diversity and inclusivity.</li>
                  </ul>
                </div>
              </div>

              <div className="di-charts">
                <div className="print-page">
                  <div className="di-chart-box">
                    <h3>Age Group Distribution</h3>
                    <p className="di-description">
                      This graph illustrates the spread of participants across predefined age categories. Understanding which age groups are most active helps tailor engagement strategies (e.g., workshops, resources).
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={formatData(data.ageGroups)}>
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4285F4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="di-chart-box">
                    <h3>Gender Split</h3>
                    <p className="di-description">
                      This pie chart highlights gender representation among participants. A balanced gender ratio is often a sign of inclusive wellness culture, while imbalances may signal the need for more inclusive outreach.
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={formatData(data.genderSplit)}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {formatData(data.genderSplit).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="print-page">
                  <div className="di-chart-box">
                    <h3>Location Participation</h3>
                    <p className="di-description">
                      This chart visualizes participant count across all office locations. Use horizontal scroll to explore all data points.
                    </p>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <div style={{ minWidth: Math.max(600, data.locationParticipation.length * 80) }}>
                        <ResponsiveContainer width="100%" height={700}>
                          <BarChart
                            data={formatData(data.locationParticipation)}
                            layout="vertical"
                            margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                          >
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#34A853" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="print-page">
                {geminiSummary && (
                  <div className="gemini-summary-container">
                    <h2>🤖 AI-Powered HR Analytics Summary</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(geminiSummary),
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="print-page">
                <h2 className="tests-heading">🧪 Psychological Tests Used</h2>

                <table className="tests-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Test Abbreviation</th>
                      <th>Test Full Form</th>
                      <th>Test Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testData.map((test, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{test.abbreviation}</td>
                        <td>{test.fullForm}</td>
                        <td>{test.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="report-note">
                  <h3>🔵 Demographic Insights Report</h3>
                  <ul>
                    <li>Detailed participation across various age groups, helping identify which segments are most engaged.</li>
                    <li>Clear gender-wise distribution of individuals booking appointments.</li>
                    <li>Location or branch-wise breakdown (if data available), offering geographic insights into mental health engagement.</li>
                  </ul>
                </div>
              </div>

              <div className="print-page thank-you">
                <h1>Thank You!</h1>
                <p>
                  We appreciate your time and collaboration.<br />
                  Together, we’re building a healthier tomorrow 💙.
                </p>
                <hr />
                <footer className="thank-you-footer">
                  <a href="https://www.psy-care.in" target="_blank" rel="noopener noreferrer">www.psy-care.in</a> &nbsp; | &nbsp;
                  <a href="mailto:contactus@psy-care.in">contactus@psy-care.in</a>
                </footer>
              </div>


            </div>
          </div>
        )}
        <button className="di-print-button" onClick={handlePrint}>
          🖨️ Print Report
        </button>
      </div>
    </div>
  );
};

export default DemographicInsights;
