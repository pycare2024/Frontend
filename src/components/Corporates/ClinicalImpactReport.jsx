import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { marked } from "marked";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import "chart.js/auto";
import "./ClinicalImpactReport.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function ClinicalImpactReport() {
  const [companyCode, setCompanyCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      // Fetch clinical impact report
      const res1 = await fetch(
        `https://backend-xhl4.onrender.com/CorporateRoute/${companyCode}/clinical-impact?startDate=${startDate}&endDate=${endDate}`
      );
      const data1 = await res1.json();
      setReportData(data1);

      // Fetch severity evaluations
      setLoading(true);
      const res2 = await fetch('https://backend-xhl4.onrender.com/CorporateRoute/categorize-overall-severity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyCode, startDate, endDate }),
      });
      const data2 = await res2.json();
      setEvaluations(data2.evaluations || []);
      console.log('Evaluations =>', data2.evaluations);
    } catch (err) {
      console.error('Error in fetchReport:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const original = document.getElementById("print-section");
    if (!original) {
      console.error("Print section not found!");
      return;
    }

    const clone = original.cloneNode(true);
    const liveCanvases = original.querySelectorAll("canvas");
    const clonedCanvases = clone.querySelectorAll("canvas");


    liveCanvases.forEach((canvas, index) => {
      const img = new Image();
      img.src = canvas.toDataURL("image/png");
      img.style.maxWidth = "100%";
      img.style.display = "block";
      img.style.margin = "30px auto";
      if (clonedCanvases[index]?.parentNode) {
        clonedCanvases[index].parentNode.replaceChild(img, clonedCanvases[index]);
      }
    });

    const htmlContent = `
      <html>
        <head>
          <title>Clinical Impact Report - PsyCare</title>
          <style>
@page {
  margin: 40px 50px;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background: #fff;
  color: #333;
}

/* === PAGE BREAK & SECTIONS === */
.page {
  page-break-after: always;
  page-break-inside: avoid;
  padding: 30px 40px;
}

.page:last-child {
  page-break-after: auto;
}

/* === COVER PAGE === */
.cover-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Changed fixed height to min-height for better print handling */
  min-height: 100vh;
  text-align: center;
  color: #1967d2;
}

.cover-page img {
  width: 220px;
  height: 220px;
  border-radius: 18px;
  margin-bottom: 25px;
  border: 2px solid #4285F4;
  // box-shadow: 0 8px 30px rgba(66, 133, 244, 0.3);
}

.cover-page h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: 700;
  color: #0b57d0;
}

.cover-page p {
  font-size: 1.4rem;
  color: #555;
  font-weight: 500;
}

.h3-title
{
color:#4285F4;
}

.h3-inside-title
{
font-size:24px;
color:#4285F4;
text-align:center;
}

/* === SECTION TITLES === */
.section-title {
  font-size: 1.8rem;
  color: #4285F4;
  border-left: 6px solid #4285F4;
  padding-left: 14px;
  margin-top: 40px;
  margin-bottom: 25px;
  font-weight: 600;
}

/* === SUMMARY CARDS === */
.report-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  margin-bottom: 50px;
}

.report-header {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #4285f4;
  margin-bottom: 0.5rem;
}

.summary-card {
  background: linear-gradient(to bottom, #f3f8ff, #ffffff);
  padding: 20px 24px;
  border-radius: 14px;
  text-align: center;
  // box-shadow: 0 6px 16px rgba(66, 133, 244, 0.12);
}

.summary-card h3 {
  font-size: 1.15rem;
  margin-bottom: 8px;
  color: #1967d2;
}

.summary-card p {
  font-size: 2.1rem;
  font-weight: 700;
  color: #0b3d91;
}

/* === CHARTS === */
.chart-title {
  font-size: 30px;
  font-weight: 700;
  color: #4285F4;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.5px;
}

.chart-card {
  background: linear-gradient(145deg, #ffffff, #f0f4ff);
  padding: 2rem 2rem 1.5rem 2rem;
  // box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
  margin-bottom: 40px;
  page-break-inside: avoid;
  height:35%;
}

img.chart-img {
  max-width: 100%;
  margin: 30px auto;
  display: block;
  border-radius: 12px;
  // box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.followup-summary {
  page-break-before: always;
  background:white;
  // padding: 20px 40px;
  border-radius: 12px;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #4285F4;
  // margin: 40px auto 60px auto;
  // max-width: 900px;
  white-space: normal; /* changed here */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.print-page
{
page-break-before: always;
}

/* Table styling */
.tests-heading {
  font-size: 24px;
  color: #4285F4;
  margin-bottom: 20px;
  text-align:center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 12px;
}

th, td {
  border: 1px solid #4285F4;
  padding: 12px 15px;
  text-align: justify;
}

th {
  background-color: #4285F4;
  color: #4285F4;
  font-weight: 600;
}

/* === THANK YOU SECTION === */
.thank-you {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Changed from height */
  page-break-before: always;
  background: linear-gradient(to bottom right, #eef3fa, #ffffff);
}

.thank-you-box {
  background: #ffffff;
  padding: 60px 50px;
  border: 2px solid #4285F4;
  border-radius: 20px;
  // box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 600px;
  width: 90%;
}

.thank-you-box h2 {
  color: #1967d2;
  font-size: 2.2rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.thank-you-box p {
  color: #555;
  font-size: 1.15rem;
  line-height: 1.6;
}

.heatmap-wrapper {
  margin: 1rem 0;
  padding: 1rem;
  background: #fefefe;
}

.heatmap-title {
  font-size: 24px;
  color: #4285F4;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 cells per row */
  gap: 4px 2px; /* 6px vertical gap, 4px horizontal gap (very small) */
  justify-items: center;
  margin-bottom: 1rem; /* reduce bottom margin */
}

.heatmap-rectangle {
  width: 100%;
  max-width: 150px; /* reduced width to fit 6 nicely */
  height: 30px;
  border: 0.5px solid white;
  border-radius: 10px; /* slightly smaller radius for tighter spacing */
  // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06); /* lighter shadow */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.677); /* darker text for readability */
  font-size: 0.8rem;
  text-transform: capitalize;
  transition: transform 0.2s;
}

.heatmap-rectangle:hover {
  transform: scale(1.05);
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.severity-label {
  padding: 0 1rem;
  text-align: center;
}

.heatmap-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #333;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  // box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
}

.heatmap-rectangle {
  -webkit-print-color-adjust: exact !important; /* Chrome/Safari */
  print-color-adjust: exact !important;         /* Firefox */
}
.color-box {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.heatmap-info {
  // padding: 1.5rem 2rem;
  background: #f9fbfd;
  border-radius: 16px;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

.heatmap-info h4 {
  font-size: 1.4rem;
  color: #4285F4;
  margin-bottom: 1rem;
  font-weight: 700;
}

.heatmap-info ul {
  padding-left: 1.2rem;
}

.heatmap-info ul li {
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.2rem;
}

.heatmap-info li {
  text-align:justify;
}

.heatmap-info ul li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4285F4;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1;
  top: 0;
}

.chart-info {
  padding: 1.5rem 2rem;
  border-radius: 16px;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  text-align: justify;
}

.chart-info h4 {
  font-size: 1.4rem;
  color: #4285F4;
  margin-bottom: 1rem;
  font-weight: 700;
}

.chart-info ul {
  padding-left: 1.2rem;
}

.chart-info ul li {
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.2rem;
}

.chart-info ul li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4285F4;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1;
  top: 0;
}

.report-note li
{
text-align:justify;
}
          </style>
        </head>
        <body>
          <div class="page cover-page">
            <img src="${window.location.origin}/PsyCareMain.png" alt="PsyCare Logo" />
            <h1>Clinical Impact Report</h1>
            <p>Your mental health matters — powered by PsyCare</p>
            <p style="margin-top: 40px; font-size: 1rem;">${new Date().toLocaleDateString()}</p>
          </div>
  
          <div class="page">
            ${clone.innerHTML}
          </div>
  
          <div class="page thank-you">
  <div class="thank-you-box">
    <h2>🙏 Thank You</h2>
    <p>
      We appreciate your partnership in prioritizing mental health.<br />
      Together, we're building a happier, healthier workforce 💙
      www.psy-care.in | contactus@psy-care.in
    </p>
  </div>
</div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "", "width=1200,height=900");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const totalScreeningsData = reportData
    ? {
      labels: ["Total Screenings"],
      datasets: [
        {
          data: [reportData.totalScreenings],
          backgroundColor: ["#4285F4"],
          hoverOffset: 30
        }
      ]
    }
    : null;

  const appointmentBreakdownData = reportData
    ? {
      labels: ["Completed", "No Show", "Cancelled", "Follow-ups"],
      datasets: [
        {
          data: [
            reportData.appointmentBreakdown.completed,
            reportData.appointmentBreakdown.no_show,
            reportData.appointmentBreakdown.cancelled,
            reportData.appointmentBreakdown.followups,
          ],
          backgroundColor: ["#34A853", "#EA4335", "#A1A1A1", "#4285F4"],
          hoverOffset: 30,
        },
      ],
    }
    : null;

  const screeningBreakdownData = reportData
    ? {
      labels: ["Only Screening Tests", "Screenings with Follow-up Sessions", "Repeat Screenings"],
      datasets: [
        {
          data: [
            reportData.totalScreenings - reportData.followUpAppointments,
            reportData.followUpAppointments,
            reportData.repeatScreenings,
          ],
          backgroundColor: ["#4285F4", "#34A853", "#FBBC05"],
          hoverOffset: 30,
        },
      ],
    }
    : null;

  // Prepare data for Doughnut chart: Total Screenings vs Follow-ups vs Repeat
  const doughnutData = reportData
    ? {
      labels: ["Total Screening Tests", "Therapy Sessions", "Repeat Screening Tests"],
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

  const severityColors = {
    minimal: '#7ED6A7',          // bright mint green
    mild: '#FFF176',             // sunny yellow
    moderate: '#FFB74D',         // bright orange
    moderately_severe: '#FF8A65',// warm coral
    severe: '#F44336',           // vivid red (classic bright red)
    extreme: '#AB47BC'           // bright purple
  };

  // console.log("Report Data => ", reportData);
  // console.log("Evaluations => ", evaluations);

  console.log("Doughnut Data -> ", doughnutData);

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
    <div className="main-report-container">
      <div className="report-container">

        {/* Controls for filtering report */}
        <div className="report-controls">
          <div className="control-group">
            <label htmlFor="companyCode">🏢 Company Code</label>
            <input
              id="companyCode"
              type="text"
              placeholder="Enter company code"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              aria-label="Company Code"
            />
          </div>

          <div className="control-group">
            <label htmlFor="startDate">📅 Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              aria-label="Start Date"
            />
          </div>

          <div className="control-group">
            <label htmlFor="endDate">📅 End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              aria-label="End Date"
            />
          </div>

          <button onClick={fetchReport} className="fetch-button" aria-label="Fetch Report">
            🚀 Generate Report
          </button>
        </div>

        {reportData && (
          <div id="print-section">
            <h1 className="report-header">📊 Clinical Impact Report</h1>
            <h2 style={{ textAlign: "center", color: "#4285F4", fontSize: "18px", marginBottom: "20px" }}>Psychometric Analysis - Enterprise(Report 4)</h2>
            {/* Summary Cards */}
            <section className="report-grid" aria-label="Appointment breakdown">
              <article className="report-card">
                <h3 className="h3-title">Total Appointments</h3>
                <p>{reportData.appointmentBreakdown.Total_appointments}</p>
              </article>
              <article className="report-card">
                <h3 className="h3-title">Completed</h3>
                <p>{reportData.appointmentBreakdown.completed}</p>
              </article>
              <article className="report-card">
                <h3 className="h3-title">No Show</h3>
                <p>{reportData.appointmentBreakdown.no_show}</p>
              </article>
              <article className="report-card">
                <h3 className="h3-title">Cancelled</h3>
                <p>{reportData.appointmentBreakdown.cancelled}</p>
              </article>
              <article className="report-card">
                <h3 className="h3-title">Follow-ups</h3>
                <p>{reportData.appointmentBreakdown.followups}</p>
              </article>
            </section>
            <section className="report-grid" aria-label="Summary statistics">
              <article className="report-card">
                <h3 className="h3-title">Total Screening Tests</h3>
                <p>{reportData.totalScreenings}</p>
              </article>
              <article className="report-card">
                <h3 className="h3-title">Screenings With Therapy Follow-Up</h3>
                <p>{reportData.followUpAppointments}</p>
              </article>
              <article className="report-card">
                <h3 className="h3-title">Repeat Screening Tests</h3>
                <p>{reportData.repeatScreenings}</p>
              </article>
            </section>

            <section className="chart-section page-break" aria-label="Overview charts">
              {/* <h2 className="chart-title">📈 Overview Charts</h2> */}
              <div className="chart-card full-width">
                <h3 className="h3-inside-title">Appointment Breakdown</h3>
                <figure>
                  <Doughnut data={appointmentBreakdownData} />
                  <figcaption style={{textAlign:"center"}}>Distribution of different appointment statuses.</figcaption>
                </figure>
              </div>

              <div className="chart-vertical">
                <div className="chart-card full-width">
                  <h3 className="h3-inside-title">Screenings Distribution</h3>
                  <figure>
                    <Doughnut data={screeningBreakdownData} />
                    <figcaption>A glance at how users are distributed across screening types.</figcaption>
                  </figure>
                </div>

                <div className="chart-card full-width">
                  <h3 className="h3-inside-title">Severity Breakdown</h3>
                  <figure>
                    <Bar
                      data={barData}
                      options={{
                        plugins: {
                          datalabels: {
                            anchor: 'end',
                            align: 'top',
                            color: '#000',
                            font: {
                              weight: 'bold',
                              size: 14,
                            },
                            formatter: Math.round, // Optional: Round values
                          },
                        },
                      }}
                      plugins={[ChartDataLabels]}
                    />
                    <figcaption>This chart reflects the total number of severity classifications across all instruments used. Since a single assessment may include multiple tools, a patient can appear under multiple severity levels — totals do not represent unique individuals.</figcaption>
                  </figure>
                </div>
                <div className="chart-info">
                  <h4>Severity Breakdown — Key Insights</h4>
                  <ul>
                    <li>Displays the total number of assessments falling into each severity category.</li>
                    <li>Bar height represents the count of patients or assessments in each level.</li>
                    <li>Categories range from <strong>Minimal</strong> to <strong>Extreme</strong>, visualizing mental health distribution.</li>
                    <li>Clear numeric labels on each bar make the chart easy to interpret at a glance.</li>
                    <li>Great for tracking trends, spotting patterns, or analyzing severity shifts over time.</li>
                    <li>Supports data-driven decisions for clinicians and administrative insights.</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="print-page">
              <div className="heatmap-wrapper">
                <h3 className="heatmap-title">Severity Heatmap</h3>
                <div className="heatmap-grid">
                  {evaluations.map((entry, index) => (
                    <div
                      key={index}
                      className="heatmap-rectangle"
                      style={{
                        backgroundColor: severityColors[entry.overallSeverity?.toLowerCase()] || '#ccc'
                      }}
                      title={`ID: ${entry.patient_id}\nSeverity: ${entry.overallSeverity}`}
                    >
                      <span className="severity-label">{entry.overallSeverity?.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
                <div className="heatmap-legend">
                  {Object.entries(severityColors).map(([label, color]) => (
                    <div key={label} className="legend-item">
                      <span className="color-box" style={{ backgroundColor: color }}></span>
                      <span className="legend-label">{label.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="heatmap-info">
                <h4 className="h3-title">Severity Heatmap — Key Information</h4>
                <ul>
                  <li>Visualizes patient severity levels across different evaluations in a clear, color-coded format.</li>
                  <li>Six severity categories ranging from <strong>Minimal</strong> to <strong>Extreme</strong>, each represented by a distinct bright color.</li>
                  <li>Color intensity and hue correspond to increasing severity, making it easy to spot critical cases at a glance.</li>
                  <li>Each rectangle displays the severity label with a hover effect and patient ID info.</li>
                  <li>The heatmap grid is responsive and organized with 6 cells per row for compact, efficient space usage.</li>
                  <li>The accompanying legend clarifies the meaning of each color, improving accessibility and understanding.</li>
                  <li>Designed to support quick clinical decisions by highlighting severity trends visually.</li>
                </ul>
              </div>
            </div>


            {/* Follow-up Summary */}
            <section className="followup-summary" aria-label="Follow-up summary"
              dangerouslySetInnerHTML={{ __html: marked.parse(reportData.followUpTrends || "No summary available.") }}
              style={{ textAlign: "justify" }} />

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
                <tbody style={{ color: "black" }}>
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
                <h3 className="h3-title">🔵 Clinical Impact Report</h3>
                <ul>
                  <li>Tracks total number of mental health screenings conducted within a selected date range.</li>
                  <li>Shows how many individuals proceeded to book therapy sessions after the screening.</li>
                  <li>Identifies users who took screening tests multiple times.</li>
                  <li>Categorizes cases into severity levels (e.g., mild, moderate, severe) and presents them using bar and line charts.</li>
                  <li>Includes an AI-generated summary highlighting key insights and overall psychological impact.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Print Button */}
        <div className="print-button-container">
          <button onClick={handlePrint} className="print-button" aria-label="Print Report">
            🖨️ Print Report
          </button>
        </div>
      </div>
    </div>
  );
}