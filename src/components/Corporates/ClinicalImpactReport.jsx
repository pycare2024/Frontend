import React, { useState } from "react";
import { marked } from "marked";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./ClinicalImpactReport.css";

export default function ClinicalImpactReport() {
    const [companyCode, setCompanyCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportData, setReportData] = useState(null);

    const fetchReport = async () => {
        const res = await fetch(
            `https://backend-xhl4.onrender.com/CorporateRoute/${companyCode}/clinical-impact?startDate=${startDate}&endDate=${endDate}`
        );
        const data = await res.json();
        setReportData(data);
    };

    const handlePrint = () => {
        const original = document.getElementById("print-section");
        if (!original) {
            console.error("Print section not found!");
            return;
        }

        // Clone the print section and replace canvases with images
        const clone = original.cloneNode(true);
        const liveCanvases = original.querySelectorAll("canvas");
        const clonedCanvases = clone.querySelectorAll("canvas");

        liveCanvases.forEach((canvas, index) => {
            const img = new Image();
            img.src = canvas.toDataURL("image/png");
            img.style.maxWidth = "100%";
            img.style.display = "block";
            img.style.margin = "20px 0";
            if (clonedCanvases[index]?.parentNode) {
                clonedCanvases[index].parentNode.replaceChild(img, clonedCanvases[index]);
            }
        });

        const printWindow = window.open("", "", "width=1200,height=900");
        printWindow.document.write(`
          <html>
            <head>
              <title>Clinical Impact Report - PsyCare</title>
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
                  margin-bottom: 20px;
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
                  font-size: 30px;
                  color: #4285F4;
                  margin: 0;
                  font-weight: 700;
                }
                .header-text p {
                  margin-top: 8px;
                  font-size: 15px;
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
                  font-size: 27px;
                  margin-bottom: 15px;
                }
                h3 {
                  font-size: 17px;
                  color: #4285F4;
                  margin-top: 30px;
                }
                h4 {
                  font-size: 17px;
                }
                p {
                  font-size: 11px;
                  line-height: 1.6;
                  margin: 5px 0 15px 0;
                }
                ul {
                  margin-top: 10px;
                  padding-left: 20px;
                }
                li {
                  margin-bottom: 8px;
                  font-size: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: separate;
                  border-spacing: 0 10px;
                  font-size: 10px;
                  margin-top: 15px;
                }
                th {
                  background: #4285F4;
                  color: #fff;
                  padding: 12px;
                  font-size: 11px;
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
                  font-size: 8px;
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
      
                ${clone.innerHTML}
      
                <div class="footer">
                  Generated by <strong>PsyCare</strong> | ${new Date().toLocaleDateString()}
                </div>
              </div>
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };
    // Prepare data for Doughnut chart: Total Screenings vs Follow-ups vs Repeat
    const doughnutData = reportData
        ? {
            labels: ["Total Screenings", "Follow-Up Appointments", "Repeat Screenings"],
            datasets: [
                {
                    data: [
                        reportData.totalScreenings,
                        reportData.followUpAppointments,
                        reportData.repeatScreenings,
                    ],
                    backgroundColor: ["#4285F4", "#34A853", "#FBBC05"],
                    hoverOffset: 30,
                },
            ],
        }
        : null;

    // Prepare data for Bar chart: Severity Breakdown
    const barData = reportData
        ? {
            labels: ["Mild", "Moderate", "Moderately Severe", "Severe"],
            datasets: [
                {
                    label: "Number of Cases",
                    data: [
                        reportData.severityBreakdown.mild,
                        reportData.severityBreakdown.moderate,
                        reportData.severityBreakdown.moderately_severe,
                        reportData.severityBreakdown.severe,
                    ],
                    backgroundColor: [
                        "#8BC34A",
                        "#FFC107",
                        "#FF9800",
                        "#F44336",
                    ],
                },
            ],
        }
        : null;

    // Prepare data for Line chart (dummy example with severity levels over the date range)
    // Since you have no time series, we'll simulate using severity counts as points.
    const lineData = reportData
        ? {
            labels: ["Mild", "Moderate", "Moderately Severe", "Severe"],
            datasets: [
                {
                    label: "Severity Trend",
                    data: [
                        reportData.severityBreakdown.mild,
                        reportData.severityBreakdown.moderate,
                        reportData.severityBreakdown.moderately_severe,
                        reportData.severityBreakdown.severe,
                    ],
                    fill: false,
                    borderColor: "#1967d2",
                    tension: 0.3,
                    pointBackgroundColor: "#4285F4",
                },
            ],
        }
        : null;

    return (
        <div className="report-container">
            <h1 className="report-header">📊 Clinical Impact Report</h1>

            {/* Controls for filtering report */}
            <div className="report-controls">
                <input
                    type="text"
                    placeholder="Company Code"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    aria-label="Company Code"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    aria-label="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    aria-label="End Date"
                />
                <button
                    onClick={fetchReport}
                    className="fetch-button"
                    aria-label="Fetch Report"
                >
                    Fetch Report
                </button>
            </div>

            {reportData && (
                <div id="print-section">
                    {/* Summary Cards */}
                    <section className="report-grid" aria-label="Summary statistics">
                        <article className="report-card">
                            <h3>Total Screenings</h3>
                            <p>{reportData.totalScreenings}</p>
                        </article>
                        <article className="report-card">
                            <h3>Follow-Up Appointments</h3>
                            <p>{reportData.followUpAppointments}</p>
                        </article>
                        <article className="report-card">
                            <h3>Repeat Screenings</h3>
                            <p>{reportData.repeatScreenings}</p>
                        </article>
                    </section>

                    {/* Charts Section */}
                    <section className="chart-section" aria-label="Overview charts">
                        <h2>📈 Overview Charts</h2>
                        <div className="report-grid">
                            <div className="report-card">
                                <h4>Screenings Distribution</h4>
                                <Doughnut data={doughnutData} />
                            </div>
                            <div className="report-card">
                                <h4>Severity Breakdown</h4>
                                <Bar data={barData} />
                            </div>
                            <div className="report-card">
                                <h4>Severity Trend</h4>
                                <Line data={lineData} />
                            </div>
                        </div>
                    </section>

                    {/* Follow-up Summary */}
                    <section className="followup-summary" aria-label="Follow-up summary"
                        dangerouslySetInnerHTML={{ __html: marked.parse(reportData.followUpTrends || "No summary available.") }}
                    />
                </div>
            )}

            {/* Print Button */}
            <div className="print-button-container">
                <button onClick={handlePrint} className="print-button" aria-label="Print Report">
                    🖨️ Print Report
                </button>
            </div>
        </div>
    );
}