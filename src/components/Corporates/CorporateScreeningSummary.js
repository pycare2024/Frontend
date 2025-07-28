import React, { useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LabelList,
    Label
} from "recharts";
import "./CorporateScreeningSummary.css";
import { marked } from "marked";
import PatientSeverityTable from "./PatientSeverityTable";
import './PatientSeverityTable.css';

function CorporateScreeningSummary() {
    const [companyCode, setCompanyCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [summaryInsights, setSummaryInsights] = useState(null);
    const [heatmapData2, setHeatmapData] = useState([]);
    const [heatmapLoading, setHeatmapLoading] = useState(false);
    const [heatmapError, setHeatmapError] = useState("");

    const COLORS = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

    const handleGenerate = async () => {
        if (!companyCode || !startDate || !endDate) {
            setError("Please fill all fields.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            // 1. Get screening summary data
            const response = await axios.get(
                `https://backend-xhl4.onrender.com/CorporateRoute/${companyCode}/screening-summary?startDate=${startDate}&endDate=${endDate}`
            );

            // 2. Send screening data to Gemini for insights
            const insightsResponse = await axios.post(
                "https://backend-xhl4.onrender.com/GeminiRoute/summarizeScreeningSummary",
                { screeningData: response.data }
            );

            // 3. Fetch heatmap data (your provided try-catch block)
            try {
                setHeatmapLoading(true);
                setHeatmapError("");

                const heatmapResponse = await axios.post(
                    "https://backend-xhl4.onrender.com/CorporateRoute/summary-per-patient",
                    {
                        companyCode,
                        startDate,
                        endDate,
                    }
                );

                const heatmapPayload = Array.isArray(heatmapResponse.data)
                    ? heatmapResponse.data
                    : Array.isArray(heatmapResponse.data.data)
                        ? heatmapResponse.data.data
                        : null;

                if (heatmapPayload) {
                    setHeatmapData(heatmapPayload);
                } else {
                    setHeatmapError("Unexpected heatmap response format.");
                }
            } catch (heatmapErr) {
                setHeatmapError("Failed to fetch heatmap data.");
                console.error(heatmapErr);
            } finally {
                setHeatmapLoading(false);
            }

            // Set summary data and insights after all calls succeed
            setSummaryData(response.data);
            setSummaryInsights(insightsResponse.data.summary);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            setSummaryData(null);
            setSummaryInsights(null);
            setHeatmapData(null);  // Optional: clear heatmap on error
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
          * {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
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
            h1 {
              color: #4285F4;
              font-size: 26px;
              margin-bottom: 15px;
            }
            h2 {
              color: #4285F4;
              font-size: 18px;
              margin-bottom: 15px;
              text-align:center;
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

.heatmap-title {
  text-align: center;
  color: #1e2a38;
  font-weight: 500;
  font-size: 24px;
  border-bottom: 3px solid #3b82f6; /* brighter blue */
  padding-bottom: 5px;
  font-family: 'Segoe UI Semibold', Tahoma, Geneva, Verdana, sans-serif;
}

.heatmap-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px solid #3b82f6;
  border-radius: 15px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 8px 20px rgb(59 130 246 / 0.15);
  page-break-inside: avoid;
  background: #fefefe;
}

.heatmap-row {
  display: grid;
  grid-template-columns: 2fr repeat(6, 1fr);
  align-items: center;
  transition: background-color 0.25s ease;
}

.heatmap-row.header {
  background-color: WHITE;
  color: #0a2540;
  font-weight: 300;
  border-bottom: 3px solid #3b82f6;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  user-select: none;
}

.heatmap-row:not(.header):nth-child(even) {
  background-color: #fafbfc;
}

.heatmap-cell {
  padding: 9px 10px;
  text-align: center;
  border-right: 1px solid #d1d9e6;
  border-bottom: 1px solid #d1d9e6;
  font-size: 11px;
  font-weight: 300;
  color: #1c2a47;
  box-sizing: border-box;
  user-select: text;
  transition: background-color 0.3s ease;
}

.heatmap-cell:last-child {
  border-right: none;
}

.heatmap-cell.dept {
  font-weight: 400;
  text-align: left;
  padding-left: 20px;
  background-color: #f9fbff;
  color: #1c3aa9;
  letter-spacing: 0.02em;
}

.heatmap-cell[data-count='0'] {
  background-color: #f5f8ff;
  color: #7a8aad;
}

.thank-you {
  text-align: center;
  padding: 100px 40px;
  background: linear-gradient(to bottom, #e3f2fd, #ffffff);
  border-top: 4px solid #3b82f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  page-break-before: always;
}

.thank-you h1 {
  font-size: 48px;
  color: #3b82f6;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.thank-you p {
  font-size: 20px;
  color: #333;
  line-height: 1.6;
  font-weight: 500;
}

  @media print {
  .print-page {
    page-break-after: always;
  }

  .print-page:last-child {
    page-break-after: auto;
  }
}

/* This must go in your print-specific CSS or @media print section */

@media print {
  .print-page,
  .heatmap-container {
    width: 100% !important;
    overflow: visible !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .heatmap-table {
    width: 100% !important;
    table-layout: fixed !important;
    word-wrap: break-word !important;
    font-size: 11px;
  }

  .heatmap-table th,
  .heatmap-table td {
    padding: 4px !important;
    word-break: break-word !important;
  }

  body {
    -webkit-print-color-adjust: exact; /* Ensures colors like heatmap are printed */
    print-color-adjust: exact;
    margin: 0;
  }
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

    const renderMarkdown = (markdownContent) => {
        return marked(markdownContent);
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

    console.log("Radar Chart Data=>", radarChartData);

    // Get departmentScores safely
    const departmentRawScores = summaryData?.departmentScores || {};

    // Transform to [{ department: "X", score: total }, ...]
    const barChartData = Object.keys(departmentRawScores).map((dept) => {
        const tests = departmentRawScores[dept];

        // Count total entries (sum of all arrays' lengths)
        const totalScreenings = Object.values(tests).reduce(
            (sum, testArray) => sum + (Array.isArray(testArray) ? testArray.length : 0),
            0
        );

        return { department: dept, score: totalScreenings };
    });

    // console.log("DepartmentScores=>", departmentRawScores);
    // console.log("Bar Chart Data=>", barChartData);

    const tools = ["PHQ-9", "BDI-II", "GAD-7", "BAI", "ISI", "PCL-5", "Y-BOCS-II"];

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


    const getHeatmapData = (departmentScores) => {
        return Object.entries(departmentScores || {}).map(([dept, toolsData]) => {
            const row = { department: dept };
            tools.forEach((tool) => {
                row[tool] = toolsData[tool]?.length || 0;
            });
            return row;
        });
    };

    const heatmapData = getHeatmapData(summaryData?.departmentScores);

    console.log("Heat Map Data => ", heatmapData);


    return (
        <div className="screening-summary-container">
            <center><h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4285F4" }}>Corporate Screening Summary</h1></center>

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
                    <div className="print-page">
                        <div className="section" style={{ backgroundColor: "#f9fbfd", padding: "2rem", borderRadius: "12px" }}>
                            <h2 style={{ textAlign: "center", color: "#4285F4", fontSize: "28px", marginBottom: "1rem" }}>
                                Department-wise Screening Insights
                            </h2>
                            <p style={{ textAlign: "center", color: "#666", fontSize: "15px", marginBottom: "2rem" }}>
                                Analysis of emotional Well-being scores across departments.
                            </p>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <ResponsiveContainer width="100%" height={1000}>
                                    <BarChart
                                        layout="vertical"
                                        data={barChartData}
                                        margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                                    >
                                        <defs>
                                            <linearGradient id="barColor" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#4285F4" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#AECBFA" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            type="number"
                                            domain={[0, 'dataMax + 5']}
                                            tick={{ fontSize: 20, fontWeight: "bold" }}
                                        >
                                            <Label
                                                value="No of Screenings"
                                                position="insideBottom"
                                                offset={-20}
                                                style={{ textAnchor: "middle", fontSize: 20, fill: "#333", textDecoration:"underline" }}
                                            />
                                        </XAxis>
                                        <YAxis
                                            type="category"
                                            dataKey="department"
                                            width={150}
                                            tick={{ fontSize: 20, fontWeight: "bold" }}
                                        >
                                            <Label
                                                value="Department Names"
                                                angle={-90}
                                                position="insideLeft"
                                                offset={-10}
                                                style={{ textAnchor: "middle", fontSize: 20, fill: "#333" , textDecoration:"underline"}}
                                            />
                                        </YAxis>
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="score"
                                            fill="url(#barColor)"
                                            radius={[6, 6, 6, 6]}
                                            barSize={18}
                                        >
                                            <LabelList dataKey="score" position="right" style={{ fill: "#000", fontSize: 20, fontWeight: "bold" }} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CorporateScreeningSummary;