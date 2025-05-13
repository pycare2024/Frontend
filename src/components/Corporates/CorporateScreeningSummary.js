import React, { useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "./CorporateScreeningSummary.css";

function CorporateScreeningSummary() {
    const [companyCode, setCompanyCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const COLORS = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

    const handleGenerate = async () => {
        if (!companyCode || !startDate || !endDate) {
            setError("Please fill all fields.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await axios.get(
                `https://backend-xhl4.onrender.com/CorporateRoute/${companyCode}/screening-summary?startDate=${startDate}&endDate=${endDate}`
            );
            setSummaryData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            setSummaryData(null);
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

        const WindowPrt = window.open("", "", "width=1200,height=900");
        WindowPrt.document.write(`
      <html>
        <head>
          <title>Corporate Screening Summary Report - PsyCare</title>
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
              gap: 30px;
              margin-bottom: 40px;
            }
            .header img {
              width: 100px;
              height: 100px;
              object-fit: cover;
              border-radius: 14px;
              border: 2px solid #4285F4;
            }
            .header-text {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .header-text h1 {
              font-size: 38px;
              color: #4285F4;
              margin: 0;
              font-weight: 700;
            }
            .header-text p {
              margin-top: 8px;
              font-size: 18px;
              color: #555;
              font-weight: 500;
            }
            hr {
              border: none;
              border-top: 2px solid #4285F4;
              margin: 30px 0;
            }
            h2 {
              color: #4285F4;
              font-size: 26px;
              margin-bottom: 15px;
            }
            h3 {
              font-size: 22px;
              color: #4285F4;
              margin-top: 30px;
            }
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 5px 0 15px 0;
            }
            ul {
              margin-top: 10px;
              padding-left: 20px;
            }
            li {
              margin-bottom: 8px;
              font-size: 15px;
            }
            table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0 10px;
              font-size: 15px;
              margin-top: 15px;
            }
            th {
              background: #4285F4;
              color: #fff;
              padding: 12px;
              font-size: 16px;
              border-radius: 8px 8px 0 0;
            }
            td {
              background: #f9f9f9;
              padding: 12px;
              border: 1px solid #ddd;
            }
            .section {
              margin-bottom: 50px;
            }
            .footer {
              border-top: 1px solid #ddd;
              margin-top: 50px;
              padding-top: 20px;
              text-align: center;
              font-size: 13px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <img src="${window.location.origin}/PsyCareMain.png" alt="PsyCare Logo" />
              <div class="header-text">
                <h1>PsyCare</h1>
                <p>Your Path to Mental Wellness</p>
              </div>
            </div>
  
            <hr />
  
            ${printContent.innerHTML}
  
            <div class="footer">
              Generated by <strong>PsyCare</strong> | ${new Date().toLocaleDateString()}
            </div>
          </div>
        </body>
      </html>
    `);

        WindowPrt.document.close();
        WindowPrt.focus();
        setTimeout(() => {
            WindowPrt.print();
            WindowPrt.close();
        }, 500);
    };

    const casesPieData = summaryData
        ? [
            { name: "Insomnia", value: summaryData.insomniaCases },
            { name: "Anxiety", value: summaryData.anxietyCases },
            { name: "Depression", value: summaryData.depressionCases },
            { name: "PTSD", value: summaryData.ptsdCases },
        ]
        : [];

    // Preparing Radar Chart data with dynamic tests based on available data
    const radarChartData = summaryData
        ? Object.keys(summaryData).reduce((acc, key) => {
            const scoreValue = summaryData[key];
            if (scoreValue !== undefined) {
                acc.push({ subject: key, score: scoreValue });
            }
            return acc;
        }, [])
        : [];

    return (
        <div className="screening-summary-container">
            <center><h1 style={{fontSize:"2.5rem", fontWeight:"bold",color:"#4285F4"}}>Corporate Screening Summary</h1></center>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Company Code"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={handleGenerate}>Generate</button>
                {summaryData && (
                    <button onClick={handlePrint} className="print-btn">
                        Print
                    </button>
                )}
            </div>

            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}

            {summaryData && (
                <div id="print-section" className="report-content">
                    <div className="section">
                        <h2>Screening Overview</h2>
                        <p>
                            <strong>Company Name:</strong> {summaryData.companyName}
                        </p>
                        <p>
                            <strong>Date Range:</strong> {startDate} to {endDate}
                        </p>
                        <p>
                            <strong>Total Screenings:</strong> {summaryData.totalScreenings}
                        </p>
                        <p>
                            <strong>Total Patients:</strong> {summaryData.totalPatients}
                        </p>
                    </div>

                    <div className="section" style={{ marginTop: "2rem" }}>
                        <h2 style={{ color: "#4285F4", marginBottom: "1rem", fontSize: "24px", textAlign: "center" }}>
                            Summary of Cases
                        </h2>
                        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px", fontSize: "16px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#4285F4", color: "white" }}>
                                    <th style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}>Condition</th>
                                    <th style={{ padding: "12px", borderRadius: "0 8px 8px 0" }}>Number of Cases</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ backgroundColor: "#fff" }}>
                                    <td style={{ padding: "12px" }}>Insomnia</td>
                                    <td style={{ padding: "12px" }}>{summaryData.insomniaCases}</td>
                                </tr>
                                <tr style={{ backgroundColor: "#fff" }}>
                                    <td style={{ padding: "12px" }}>Anxiety</td>
                                    <td style={{ padding: "12px" }}>{summaryData.anxietyCases}</td>
                                </tr>
                                <tr style={{ backgroundColor: "#fff" }}>
                                    <td style={{ padding: "12px" }}>Depression</td>
                                    <td style={{ padding: "12px" }}>{summaryData.depressionCases}</td>
                                </tr>
                                <tr style={{ backgroundColor: "#fff" }}>
                                    <td style={{ padding: "12px" }}>PTSD</td>
                                    <td style={{ padding: "12px" }}>{summaryData.ptsdCases}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="section" style={{ backgroundColor: "#f9fbfd", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(66, 133, 244, 0.1)" }}>
                        <h2 style={{ textAlign: "center", color: "#4285F4", fontSize: "28px", marginBottom: "1rem" }}>
                            Cases Distribution
                        </h2>
                        <p style={{ textAlign: "center", color: "#666", fontSize: "15px", marginBottom: "2rem" }}>
                            Overview of primary mental health conditions observed among employees.
                        </p>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <PieChart width={600} height={400}>
                                <Pie
                                    data={casesPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70} // <-- donut style
                                    outerRadius={140}
                                    paddingAngle={3}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    labelLine={false}
                                    dataKey="value"
                                >
                                    {casesPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ fontSize: "14px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
                                />
                            </PieChart>
                        </div>

                        {/* Tiny legends */}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1.5rem",
                            marginTop: "2rem",
                            flexWrap: "wrap"
                        }}>
                            {casesPieData.map((entry, index) => (
                                <div key={index} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#eef3fb",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: "#333"
                                }}>
                                    <div style={{
                                        width: "16px",
                                        height: "16px",
                                        backgroundColor: COLORS[index % COLORS.length],
                                        borderRadius: "50%",
                                        marginRight: "8px"
                                    }}></div>
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section" style={{ backgroundColor: "#f9fbfd", padding: "2rem", borderRadius: "12px" }}>
                        <h2 style={{ textAlign: "center", color: "#4285F4", fontSize: "28px", marginBottom: "1rem" }}>
                            Department-wise Screening Insights
                        </h2>
                        <p style={{ textAlign: "center", color: "#666", fontSize: "15px", marginBottom: "2rem" }}>
                            Analysis of mental health scores across departments.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <ResponsiveContainer width="100%" height={400}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    {radarChartData.map((test, index) => (
                                        <Radar
                                            key={index}
                                            name={test.subject}
                                            dataKey="score"
                                            stroke={COLORS[index % COLORS.length]}
                                            fill={COLORS[index % COLORS.length]}
                                            fillOpacity={0.4}
                                        />
                                    ))}
                                    <Tooltip />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Key Insights</h3>
                        <ul>
                            <li>Insomnia often indicates early mental distress in employees.</li>
                            <li>Elevated anxiety and depression levels impact workplace productivity.</li>
                            <li>PTSD symptoms highlight need for psychological safety policies.</li>
                            <li>Regular mental wellness checks significantly enhance workforce resilience.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CorporateScreeningSummary;