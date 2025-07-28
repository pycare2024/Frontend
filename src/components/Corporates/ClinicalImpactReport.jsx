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

            <section className="chart-section page-break" aria-label="Overview charts">

              <div className="chart-vertical">
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
             
            </div>

          </div>
        )}
      </div>
    </div>
  );
}