import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./CorporateScreeningSummary.css";

function CorporateScreeningSummary() {
    const [companyCode, setCompanyCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const COLORS = ["#4285F4", "#FBBC05", "#34A853", "#EA4335"];

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
            // console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            setSummaryData(null);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('print-section');
        if (!printContent) {
            console.error("Print section not found!");
            return;
        }

        const printWindow = window.open('', '', 'height=900,width=1200');
        printWindow.document.write(`
          <html>
            <head>
              <title>Mental health screening summary Report - PsyCare</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: 0;
                  padding: 40px;
                  background: #ffffff;
                  color: #333;
                  width: 100%;
                  box-sizing: border-box;
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .header img {
                  width: 120px;
                  margin-bottom: 10px;
                }
                .header h1 {
                  color: #4285F4;
                  margin: 0;
                  font-size: 32px;
                  letter-spacing: 1px;
                }
                .header p {
                  font-size: 18px;
                  color: #666;
                  margin-top: 8px;
                }
                hr {
                  margin: 20px 0;
                  border: none;
                  border-top: 2px solid #4285F4;
                }
                h2, h3 {
                  color: #333;
                  margin-top: 20px;
                  margin-bottom: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 10px;
                  font-size: 14px;
                }
                th, td {
                  border: 1px solid #ccc;
                  padding: 10px;
                  text-align: center;
                }
                th {
                  background-color: #4285F4;
                  color: white;
                }
                tr:nth-child(even) {
                  background-color: #f2f2f2;
                }
                .legend-print {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 10px;
                  margin-top: 20px;
                  justify-content: center;
                }
                .legend-item {
                  display: flex;
                  align-items: center;
                  gap: 5px;
                  font-size: 14px;
                }
                .legend-color {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                }
                .section {
                  page-break-inside: avoid;
                  margin-bottom: 30px;
                }
                .footer {
                  margin-top: 40px;
                  text-align: center;
                  font-size: 14px;
                  color: #999;
                }
                @media print {
                  body {
                    zoom: 100%;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <img src="${window.location.origin}/PsyCareMain.png" alt="PsyCare Logo" />
                <h1>PsyCare</h1>
                <p>Your Path to Mental Wellness</p>
              </div>
              <hr />
              ${printContent.innerHTML}
              <div class="footer">
                <p>Generated by PsyCare | ${new Date().toLocaleDateString()}</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const casesPieData = summaryData ? [
        { name: "Insomnia", value: summaryData.insomniaCases },
        { name: "Anxiety", value: summaryData.anxietyCases },
        { name: "Depression", value: summaryData.depressionCases },
        { name: "PTSD", value: summaryData.ptsdCases },
    ] : [];

    const departmentBarData = summaryData ? Object.keys(summaryData.departmentScores).map(dept => ({
        department: dept,
        "GAD-7": summaryData.departmentScores[dept]["GAD-7"]?.length ? summaryData.departmentScores[dept]["GAD-7"][0] : 0,
        "PCL-5": summaryData.departmentScores[dept]["PCL-5"]?.length ? summaryData.departmentScores[dept]["PCL-5"][0] : 0,
    })) : [];

    return (
        <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h1 style={{ color: "#4285F4", marginBottom: "2rem" }}>Corporate Screening Summary</h1>

            {/* Filters */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <input
                    type="text"
                    placeholder="Company Code"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    style={{ padding: "0.7rem", borderRadius: "5px", border: "1px solid #ccc", flex: 1 }}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ padding: "0.7rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ padding: "0.7rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button
                    onClick={handleGenerate}
                    style={{ backgroundColor: "#4285F4", color: "white", padding: "0.7rem 1.5rem", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Generate
                </button>
                {summaryData && (
                    <button
                        onClick={handlePrint}
                        style={{ backgroundColor: "#34A853", color: "white", padding: "0.7rem 1.5rem", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        Print
                    </button>
                )}
            </div>

            {/* Error or Loading */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading...</p>}

            {/* Printable Content */}
            {summaryData && (
                <div id="print-section" style={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px" }}>
                    <h2>Mental health screening summary report</h2>
                    <h2>Summary for {summaryData.companyName}</h2>
                    <p>Date Range: {startDate} to {endDate}</p>
                    <p>Total Screenings: {summaryData.totalScreenings}</p>
                    <p>Total Patients: {summaryData.totalPatients}</p>
                    <p>Insomnia Cases: {summaryData.insomniaCases}</p>
                    <p>Anxiety Cases: {summaryData.anxietyCases}</p>
                    <p>Depression Cases: {summaryData.depressionCases}</p>
                    <p>PTSD Cases: {summaryData.ptsdCases}</p>

                    <div className="section">
                        {/* Cases Pie Chart */}
                        <h3 style={{ marginTop: "2rem" }}>Cases Distribution</h3>
                        {/* Screen View: PieChart */}
                        <div className="screen-only">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={casesPieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, value }) => `${name}: ${value}`}
                                    >
                                        {casesPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Legends */}
                            <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                {casesPieData.map((entry, index) => (
                                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <div style={{
                                            width: "20px",
                                            height: "20px",
                                            backgroundColor: COLORS[index % COLORS.length],
                                            borderRadius: "50%",
                                        }}></div>
                                        <span>{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Print View: Static Table */}
                        <div className="print-only" style={{ marginTop: "1rem" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#4285F4", color: "white" }}>
                                        <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Case Type</th>
                                        <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Number of Cases</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {casesPieData.map((caseItem, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{caseItem.name}</td>
                                            <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{caseItem.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="section">
                        {/* Department Bar Chart */}
                        <h3 style={{ marginTop: "2rem" }}>Department Scores</h3>
                        {/* Screen View: Bar Chart */}
                        <div className="screen-only">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={departmentBarData}>
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="GAD-7" fill="#4285F4" name="GAD-7 Score" />
                                    <Bar dataKey="PCL-5" fill="#EA4335" name="PCL-5 Score" />
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Legend below for better clarity */}
                            <div style={{ marginTop: "1rem", display: "flex", gap: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <div style={{ width: "20px", height: "20px", backgroundColor: "#4285F4" }}></div>
                                    <span>GAD-7 Score</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <div style={{ width: "20px", height: "20px", backgroundColor: "#EA4335" }}></div>
                                    <span>PCL-5 Score</span>
                                </div>
                            </div>
                        </div>

                        {/* Print View: Static Table */}
                        <div className="print-only" style={{ marginTop: "1rem" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#4285F4", color: "white" }}>
                                        <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Department</th>
                                        <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>GAD-7 Score</th>
                                        <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>PCL-5 Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentBarData.map((dept, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{dept.department}</td>
                                            <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{dept["GAD-7"]}</td>
                                            <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{dept["PCL-5"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Legend for print also */}
                            <div style={{ marginTop: "1rem" }}>
                                <p><strong>Legends:</strong></p>
                                <p><span style={{ color: "#4285F4" }}>■</span> GAD-7 Score (Anxiety Measure)</p>
                                <p><span style={{ color: "#EA4335" }}>■</span> PCL-5 Score (PTSD Measure)</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default CorporateScreeningSummary;