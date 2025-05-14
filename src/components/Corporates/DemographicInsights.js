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
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 50px 70px;
              background: #fff;
              color: #333;
            }
  
            .report-container {
              width: 100%;
            }
  
            .header {
              display: flex;
              align-items: center;
              gap: 20px;
              margin-bottom: 40px;
            }
  
            .header img {
              width: 80px;
              height: 80px;
              border-radius: 12px;
              border: 2px solid #4285F4;
              object-fit: cover;
            }
  
            .header-text {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
  
            .header-text h1 {
              font-size: 32px;
              color: #4285F4;
              margin: 0;
              font-weight: 700;
            }
  
            .header-text p {
              margin-top: 6px;
              font-size: 16px;
              color: #555;
              font-weight: 500;
            }
  
            hr {
              border: none;
              border-top: 2px solid #4285F4;
              margin: 30px 0;
            }
  
            h2 {
              font-size: 24px;
              color: #4285F4;
              margin-top: 30px;
            }
  
            h3 {
              font-size: 20px;
              color: #4285F4;
              margin-top: 20px;
            }
  
            p, li {
              font-size: 15px;
              line-height: 1.6;
            }
  
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
  
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              font-size: 14px;
              text-align: left;
            }
  
            th {
              background-color: #4285F4;
              color: white;
            }
  
            .chart-container {
              margin-top: 40px;
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
              <div className="di-summary">
                <h1 style={{ color: "#4285F4", alignContent: "center", fontWeight: "bold" }}>📊 Demographic Insights Report</h1>
                <h2>Total Patients: {data.totalPatients}</h2>
                <p>Company Code: {data.companyCode}</p>
                <p><strong>Overview:</strong> This report presents a demographic breakdown of employees who have participated in mental wellness programs under the provided company code.</p>
                <ul>
                  <li>Useful for identifying engagement patterns across departments or branches.</li>
                  <li>Supports HR teams in customizing initiatives for targeted groups.</li>
                  <li>Helps understand organizational diversity and inclusivity.</li>
                </ul>
              </div>

              <div className="di-charts">
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

                <div className="di-chart-box">
                  <h3>Location Participation</h3>
                  <p className="di-description">
                    This chart breaks down participant count by location. It helps identify which offices or cities have the highest wellness engagement. Low participation areas might benefit from targeted awareness campaigns.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={formatData(data.locationParticipation)}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#34A853" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

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
