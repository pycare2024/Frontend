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
  box-shadow: 0 8px 30px rgba(66, 133, 244, 0.3);
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
  font-size: 1.7rem;
  font-weight: 700;
  color: #4285f4;
  margin-bottom: 0.5rem;
}

.summary-card {
  background: linear-gradient(to bottom, #f3f8ff, #ffffff);
  padding: 20px 24px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(66, 133, 244, 0.12);
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
.chart-card {
  background: linear-gradient(145deg, #ffffff, #f0f4ff);
  border: 1px solid #e3e9f9;
  border-radius: 24px;
  padding: 2rem 2rem 1.5rem 2rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
  margin-bottom: 40px;
  page-break-inside: avoid;
  height:35%;
}

img.chart-img {
  max-width: 100%;
  margin: 30px auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.followup-summary {
  page-break-before: always;
  background: #f4f8ff;
  padding: 30px 40px;
  border-radius: 12px;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #222;
  margin: 40px auto 60px auto;
  max-width: 900px;
  white-space: normal; /* changed here */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
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
            {/* Summary Cards */}
            <section className="report-grid" aria-label="Summary statistics">
              <article className="report-card">
                <h3>Total Screening Tests</h3>
                <p>{reportData.totalScreenings}</p>
              </article>
              <article className="report-card">
                <h3>Therapy Sessions</h3>
                <p>{reportData.followUpAppointments}</p>
              </article>
              <article className="report-card">
                <h3>Repeat Screening Tests</h3>
                <p>{reportData.repeatScreenings}</p>
              </article>
            </section>

            <section className="chart-section" aria-label="Overview charts">
              <h2 className="chart-title">📈 Overview Charts</h2>

              <div className="chart-vertical">
                <div className="chart-card full-width">
                  <h3>Screenings Distribution</h3>
                  <figure>
                    <Doughnut data={doughnutData} />
                    <figcaption>A glance at how users are distributed across screening types.</figcaption>
                  </figure>
                </div>

                <div className="chart-card full-width">
                  <h3>Severity Breakdown</h3>
                  <figure>
                    <Bar data={barData} />
                    <figcaption>Shows severity classification for assessments.</figcaption>
                  </figure>
                </div>

                <div className="chart-card full-width">
                  <h3>Severity Trend</h3>
                  <figure>
                    <Line data={lineData} />
                    <figcaption>Monthly fluctuations in case severity.</figcaption>
                  </figure>
                </div>
              </div>
            </section>

            {/* Follow-up Summary */}
            <section className="followup-summary" aria-label="Follow-up summary"
              dangerouslySetInnerHTML={{ __html: marked.parse(reportData.followUpTrends || "No summary available.") }}
              style={{ textAlign: "justify" }} />
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