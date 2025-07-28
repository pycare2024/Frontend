import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Bar as ChartJSBar } from "react-chartjs-2";
import {
    BarChart,
    Bar as BarRecharts,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    CartesianGrid,
    Label
} from "recharts";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip as ChartTooltip,
    Legend,
} from "chart.js";
import "chart.js/auto";
import "./CorporateFullReport.css";
import logo from "../PsyCare.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import 'jspdf-autotable'; // For better table rendering

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTooltip,
    Legend,
    ChartDataLabels
);

const severityColors = {
    minimal: '#D4EDDA',
    mild: '#FFE57F',
    moderate: '#FFCC80',
    moderately_severe: '#FFAB91',
    severe: '#EF9A9A',
    extreme: '#CE93D8'
};

const assessmentTools = [
    { tool: "PHQ-9", fullForm: "Patient Health Questionnaire-9", area: "Depression Severity", risk: "Mild–Moderate" },
    { tool: "GAD-7", fullForm: "General Anxiety Disorder-7", area: "Anxiety Levels", risk: "Moderate" },
    { tool: "ISI", fullForm: "Insomnia Severity Index", area: "Sleep Difficulty", risk: "Mild–Moderate" },
    { tool: "PCL-5", fullForm: "PTSD Checklist (DSM-5)", area: "PTSD Symptoms", risk: "Low–Normal" },
    { tool: "BDI-II", fullForm: "Beck Depression Inventory-II", area: "Depression Severity", risk: "Mild" },
    { tool: "BAI", fullForm: "Beck Anxiety Inventory", area: "Anxiety Severity", risk: "Moderate" },
    { tool: "Y-BOCS", fullForm: "Yale-Brown OCD Scale", area: "OCD Severity", risk: "Low" },
];

export default function CorporateFullReport() {
    const [companyCode, setCompanyCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [demographicData, setDemographicData] = useState(null);
    const [clinicalData, setClinicalData] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [summaryData, setSummaryData] = useState(null);
    const [barChartData, setBarChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Refs for individual chart components and sections for precise PDF rendering
    const ageChartRef = useRef(null);
    const genderChartRef = useRef(null);
    const locationChartRef = useRef(null);
    const departmentChartRef = useRef(null);
    const clinicalSeverityChartRef = useRef(null);
    const heatmapRef = useRef(null);
    const assessmentToolsRef = useRef(null);

    const fetchReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const base = "https://backend-xhl4.onrender.com";
            const commonParams = { companyCode, startDate, endDate };

            const [d1, d2, d3, d4] = await Promise.all([
                axios.get(`${base}/CorporateRoute/demographic-insights/${commonParams.companyCode}`),
                axios.get(`${base}/CorporateRoute/${commonParams.companyCode}/clinical-impact?startDate=${commonParams.startDate}&endDate=${commonParams.endDate}`),
                axios.post(`${base}/CorporateRoute/categorize-overall-severity`, commonParams),
                axios.get(`${base}/CorporateRoute/${commonParams.companyCode}/screening-summary?startDate=${commonParams.startDate}&endDate=${commonParams.endDate}`)
            ]);

            setDemographicData(d1.data);
            setClinicalData(d2.data);
            setEvaluations(d3.data.evaluations || []);
            setSummaryData(d4.data);

            const departmentRawScores = d4.data?.departmentScores || {};
            const transformedBarChart = Object.keys(departmentRawScores).map((dept) => {
                const tests = departmentRawScores[dept];
                const totalScreenings = Object.values(tests).reduce((sum, testArray) => sum + (Array.isArray(testArray) ? testArray.length : 0), 0);
                return { department: dept, score: totalScreenings };
            }).sort((a, b) => b.score - a.score);
            setBarChartData(transformedBarChart);

        } catch (err) {
            console.error("Error fetching reports:", err);
            setError("Failed to fetch report. Please check the company code and date range.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to convert an HTML element to a high-res image
    const captureElementAsImage = async (elementRef, scale = 3) => {
        if (!elementRef || !elementRef.current) return null;
        const canvas = await html2canvas(elementRef.current, {
            scale: scale,
            useCORS: true,
            logging: false,
            // Attempt to capture hidden parts if scrollable, though for charts this isn't usually an issue
            // windowWidth: elementRef.current.scrollWidth,
            // windowHeight: elementRef.current.scrollHeight,
        });
        return canvas.toDataURL('image/png', 1.0);
    };

    const handleDownloadPDF = async () => {
        setLoading(true);
        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15; // Margin from the edge of the page
        let yPos = margin; // Current Y position on the PDF

        const addPageIfNeeded = (elementHeight) => {
            if (yPos + elementHeight > pageHeight - margin) {
                doc.addPage();
                yPos = margin;
            }
        };

        // --- Add Report Title and Logo ---
        doc.addImage(logo, 'PNG', pageWidth / 2 - 30, yPos, 60, 20); // Center logo
        yPos += 25;
        doc.setFontSize(22);
        doc.text("Corporate Mental Health Screening & Clinical Report", pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Empowering Minds, Transforming Lives", pageWidth / 2, yPos, { align: 'center' });
        yPos += 20;

        // --- Demographic Data ---
        if (demographicData) {
            addPageIfNeeded(10); // Estimate for title
            doc.setFontSize(18);
            doc.setTextColor(44, 62, 80);
            doc.text("Demographic Insights", margin, yPos);
            yPos += 10;
            doc.setFontSize(12);
            doc.setTextColor(51);
            doc.text(`Total Screenings: ${demographicData.totalPatients}`, margin, yPos);
            yPos += 10;

            // Age Group Chart
            const ageChartImg = await captureElementAsImage(ageChartRef);
            if (ageChartImg) {
                const imgProps = doc.getImageProperties(ageChartImg);
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                addPageIfNeeded(imgHeight + 20); // Space for chart + title + table below
                doc.setFontSize(14);
                doc.setTextColor(52, 152, 219);
                doc.text("Age Group Distribution", margin, yPos);
                yPos += 7;
                doc.addImage(ageChartImg, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;

                // Age Group Table
                doc.setFontSize(12);
                doc.setTextColor(51);
                doc.text("Percentage Breakdown", margin, yPos);
                yPos += 7;
                const ageTableData = calculatePercentages(demographicData.ageGroups, demographicData.totalPatients).map(item => [item.label, `${item.percentage}%`]);
                doc.autoTable({
                    startY: yPos,
                    head: [['Age Group', 'Percentage (%)']],
                    body: ageTableData,
                    margin: { left: margin, right: margin },
                    styles: { fontSize: 10, cellPadding: 3, halign: 'left', valign: 'middle' },
                    headStyles: { fillColor: [248, 249, 250], textColor: 51, fontStyle: 'bold' },
                    bodyStyles: { textColor: 51 },
                    alternateRowStyles: { fillColor: [253, 253, 253] },
                    didDrawPage: (data) => { yPos = data.cursor.y; }
                });
                yPos += 10; // Extra space after table
            }

            // Gender Split Chart
            const genderChartImg = await captureElementAsImage(genderChartRef);
            if (genderChartImg) {
                const imgProps = doc.getImageProperties(genderChartImg);
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                addPageIfNeeded(imgHeight + 20);
                doc.setFontSize(14);
                doc.setTextColor(171, 71, 188); // Purple color
                doc.text("Gender Split", margin, yPos);
                yPos += 7;
                doc.addImage(genderChartImg, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;

                // Gender Split Table
                doc.setFontSize(12);
                doc.setTextColor(51);
                doc.text("Percentage Breakdown", margin, yPos);
                yPos += 7;
                const genderTableData = calculatePercentages(demographicData.genderSplit, demographicData.totalPatients).map(item => [item.label, `${item.percentage}%`]);
                doc.autoTable({
                    startY: yPos,
                    head: [['Gender Split', 'Percentage (%)']],
                    body: genderTableData,
                    margin: { left: margin, right: margin },
                    styles: { fontSize: 10, cellPadding: 3, halign: 'left', valign: 'middle' },
                    headStyles: { fillColor: [248, 249, 250], textColor: 51, fontStyle: 'bold' },
                    bodyStyles: { textColor: 51 },
                    alternateRowStyles: { fillColor: [253, 253, 253] },
                    didDrawPage: (data) => { yPos = data.cursor.y; }
                });
                yPos += 10;
            }

            // Location Participation Chart
            const locationChartImg = await captureElementAsImage(locationChartRef);
            if (locationChartImg) {
                const imgProps = doc.getImageProperties(locationChartImg);
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width; // Adjust height based on content
                addPageIfNeeded(imgHeight + 20);
                doc.setFontSize(14);
                doc.setTextColor(102, 187, 106); // Green color
                doc.text("Location Participation", margin, yPos);
                yPos += 7;
                doc.addImage(locationChartImg, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;

                // Location Table
                doc.setFontSize(12);
                doc.setTextColor(51);
                doc.text("Percentage Breakdown", margin, yPos);
                yPos += 7;
                const locationTableData = calculatePercentages(demographicData.locationParticipation, demographicData.totalPatients).map(item => [item.label, `${item.percentage}%`]);
                doc.autoTable({
                    startY: yPos,
                    head: [['Locations', 'Percentage (%)']],
                    body: locationTableData,
                    margin: { left: margin, right: margin },
                    styles: { fontSize: 10, cellPadding: 3, halign: 'left', valign: 'middle' },
                    headStyles: { fillColor: [248, 249, 250], textColor: 51, fontStyle: 'bold' },
                    bodyStyles: { textColor: 51 },
                    alternateRowStyles: { fillColor: [253, 253, 253] },
                    didDrawPage: (data) => { yPos = data.cursor.y; }
                });
                yPos += 10;
            }
        }

        // --- Department-wise Screening Insights ---
        if (summaryData && barChartData.length > 0) {
            addPageIfNeeded(40); // For title and description
            doc.addPage(); // Start a new page for this major section
            yPos = margin; // Reset yPos for new page

            doc.setFontSize(18);
            doc.setTextColor(44, 62, 80);
            doc.text("Department-wise Screening Insights", margin, yPos);
            yPos += 8;
            doc.setFontSize(10);
            doc.setTextColor(102);
            doc.text("Total number of mental health screenings conducted per department.", margin, yPos);
            yPos += 10;

            const departmentChartImg = await captureElementAsImage(departmentChartRef);
            if (departmentChartImg) {
                const imgProps = doc.getImageProperties(departmentChartImg);
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                addPageIfNeeded(imgHeight + 20);
                doc.addImage(departmentChartImg, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            }
        }

        // --- Clinical Severity Breakdown ---
        if (clinicalData) {
            addPageIfNeeded(40);
            doc.addPage(); // Start a new page for this major section
            yPos = margin;

            doc.setFontSize(18);
            doc.setTextColor(44, 62, 80);
            doc.text("Clinical Severity Breakdown", margin, yPos);
            yPos += 8;
            doc.setFontSize(10);
            doc.setTextColor(102);
            doc.text("Distribution of overall mental health severity across the organization.", margin, yPos);
            yPos += 10;

            const clinicalChartImg = await captureElementAsImage(clinicalSeverityChartRef);
            if (clinicalChartImg) {
                const imgProps = doc.getImageProperties(clinicalChartImg);
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                addPageIfNeeded(imgHeight + 20);
                doc.addImage(clinicalChartImg, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            }

            // Severity Heatmap
            addPageIfNeeded(10);
            doc.setFontSize(14);
            doc.setTextColor(52, 73, 94);
            doc.text("Severity Heatmap", margin, yPos);
            yPos += 7;
            doc.setFontSize(10);
            doc.setTextColor(102);
            doc.text("Visual representation of individual overall severity levels.", margin, yPos);
            yPos += 10;

            // Capture heatmap as a whole div because it's non-chart visual
            const heatmapImg = await captureElementAsImage(heatmapRef);
            if (heatmapImg) {
                const imgProps = doc.getImageProperties(heatmapImg);
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                addPageIfNeeded(imgHeight + 10);
                doc.addImage(heatmapImg, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } else {
                addPageIfNeeded(10);
                doc.setFontSize(12);
                doc.setTextColor(136);
                doc.text("No individual evaluation data available for the selected period.", margin, yPos);
                yPos += 10;
            }
        }

        // --- Assessment Tools Summary ---
        addPageIfNeeded(40);
        doc.addPage(); // New page for this section
        yPos = margin;

        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Assessment Tools Summary", margin, yPos);
        yPos += 8;
        doc.setFontSize(10);
        doc.setTextColor(102);
        doc.text("Overview of the mental health assessment tools utilized.", margin, yPos);
        yPos += 10;

        // Use autoTable for the assessment tools table
        const toolTableData = assessmentTools.map(tool => [tool.tool, tool.fullForm, tool.area, tool.risk]);
        doc.autoTable({
            startY: yPos,
            head: [['Tool', 'Full Form', 'Area of Assessment', 'Typical Risk Level']],
            body: toolTableData,
            margin: { left: margin, right: margin },
            styles: { fontSize: 10, cellPadding: 3, halign: 'left', valign: 'middle' },
            headStyles: { fillColor: [248, 249, 250], textColor: 51, fontStyle: 'bold' },
            bodyStyles: { textColor: 51 },
            alternateRowStyles: { fillColor: [253, 253, 253] },
            didDrawPage: (data) => { yPos = data.cursor.y; }
        });
        yPos = doc.autoTable.previous.finalY + 10; // Update yPos after autoTable

        setLoading(false);
        doc.save(`PsyCare_Corporate_Report_${companyCode}_${new Date().toLocaleDateString('en-CA')}.pdf`); // 'en-CA' for YYYY-MM-DD
    };

    const calculatePercentages = (groupObj, total) =>
        groupObj && total
            ? Object.entries(groupObj).map(([label, count]) => ({
                label,
                percentage: ((count / total) * 100).toFixed(2),
            }))
            : [];

    return (
        <div id="report-container" className="report-container">
            <div className="header-section">
                <img src={logo} alt="PsyCare Logo" className="company-logo" />
                <h1 className="report-main-title">Corporate Mental Health Screening & Clinical Report</h1>
                <p className="tagline">Empowering Minds, Transforming Lives</p>
            </div>

            <div className="filters-section">
                <input
                    placeholder="Company Code"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="filter-input"
                />
                <button onClick={fetchReport} className="generate-button" disabled={loading}>
                    {loading ? "Generating..." : "Generate Report"}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Render sections conditionally. These are the visible elements on the webpage. */}
            {demographicData && (
                <div className="section-block demographic-section">
                    <h2 className="section-title">Demographic Insights</h2>
                    <p className="total-patients">Total Screenings: <strong>{demographicData.totalPatients}</strong></p>
                    <div className="chart-grid">
                        <div className="chart-card">
                            <h3>Age Group Distribution</h3>
                            {/* Ref added here for direct capture */}
                            <div ref={ageChartRef} className="chart-for-pdf">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={Object.entries(demographicData.ageGroups).map(([name, value]) => ({ name, value }))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={60} />
                                        <YAxis allowDecimals={false} label={{ value: 'Number of Individuals', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <BarRecharts dataKey="value" fill="#42A5F5">
                                            <LabelList dataKey="value" position="top" />
                                        </BarRecharts>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <h4 className="sub-section-title">Percentage Breakdown</h4>
                            <table className="data-table">
                                <thead><tr><th>Age Group</th><th>Percentage (%)</th></tr></thead>
                                <tbody>
                                    {calculatePercentages(demographicData.ageGroups, demographicData.totalPatients).map(
                                        (item, idx) => (<tr key={idx}><td>{item.label}</td><td>{item.percentage}%</td></tr>)
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="chart-card">
                            <h3>Gender Split</h3>
                            <div ref={genderChartRef} className="chart-for-pdf">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={Object.entries(demographicData.genderSplit).map(([name, value]) => ({ name, value }))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis allowDecimals={false} label={{ value: 'Number of Individuals', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <BarRecharts dataKey="value" fill="#AB47BC">
                                            <LabelList dataKey="value" position="top" />
                                        </BarRecharts>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <h4 className="sub-section-title">Percentage Breakdown</h4>
                            <table className="data-table">
                                <thead><tr><th>Gender Split</th><th>Percentage (%)</th></tr></thead>
                                <tbody>
                                    {calculatePercentages(demographicData.genderSplit, demographicData.totalPatients).map(
                                        (item, idx) => (<tr key={idx}><td>{item.label}</td><td>{item.percentage}%</td></tr>)
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="chart-card full-width-chart">
                        <h3>Location Participation</h3>
                        <div ref={locationChartRef} className="chart-for-pdf">
                            <ResponsiveContainer width="100%" height={Math.max(300, Object.keys(demographicData.locationParticipation).length * 40)}>
                                <BarChart layout="vertical" data={Object.entries(demographicData.locationParticipation).map(([name, value]) => ({ name, value }))}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" label={{ value: 'Number of Individuals', position: 'insideBottom', offset: -5 }} />
                                    <YAxis dataKey="name" type="category" width={150} />
                                    <Tooltip />
                                    <BarRecharts dataKey="value" fill="#66BB6A">
                                        <LabelList dataKey="value" position="right" />
                                    </BarRecharts>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <h4 className="sub-section-title">Percentage Breakdown</h4>
                        <table className="data-table">
                            <thead><tr><th>Locations</th><th>Percentage (%)</th></tr></thead>
                            <tbody>
                                {calculatePercentages(demographicData.locationParticipation, demographicData.totalPatients).map(
                                    (item, idx) => (<tr key={idx}><td>{item.label}</td><td>{item.percentage}%</td></tr>)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {summaryData && (
                <div className="section-block screening-insights-section">
                    <h2 className="section-title">Department-wise Screening Insights</h2>
                    <p className="section-description">Total number of mental health screenings conducted per department.</p>
                    <div ref={departmentChartRef} className="chart-for-pdf">
                        <ResponsiveContainer width="100%" height={Math.max(300, barChartData.length * 50)}>
                            <BarChart layout="vertical" data={barChartData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 'dataMax + 5']}>
                                    <Label value="Number of Screenings" position="insideBottom" offset={-10} style={{ textAnchor: "middle" }} />
                                </XAxis>
                                <YAxis type="category" dataKey="department" width={180}>
                                    <Label value="Department Names" angle={-90} position="insideLeft" offset={-10} style={{ textAnchor: "middle" }} />
                                </YAxis>
                                <Tooltip />
                                <BarRecharts dataKey="score" fill="#1E88E5" barSize={25}>
                                    <LabelList dataKey="score" position="right" style={{ fill: "#000", fontSize: 14 }} />
                                </BarRecharts>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {clinicalData && (
                <div className="section-block clinical-impact-section">
                    <h2 className="section-title">Clinical Severity Breakdown</h2>
                    <p className="section-description">Distribution of overall mental health severity across the organization.</p>
                    <div className="chart-card">
                        <div ref={clinicalSeverityChartRef} className="chart-for-pdf">
                            <ChartJSBar
                                data={{
                                    labels: ["Mild", "Moderate", "Moderately Severe", "Severe"],
                                    datasets: [{
                                        label: "Number of Cases",
                                        data: [
                                            clinicalData.severityBreakdown.mild,
                                            clinicalData.severityBreakdown.moderate,
                                            clinicalData.severityBreakdown.moderately_severe,
                                            clinicalData.severityBreakdown.severe,
                                        ],
                                        backgroundColor: ["#8BC34A", "#FFC107", "#FF9800", "#F44336"],
                                        borderColor: ["#689F38", "#FFA000", "#FB8C00", "#D32F2F"],
                                        borderWidth: 1,
                                    }],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        datalabels: {
                                            anchor: 'end',
                                            align: 'top',
                                            formatter: (value) => value > 0 ? value : '',
                                            color: '#333',
                                            font: { weight: 'bold' }
                                        },
                                        legend: { display: false },
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    let label = context.dataset.label || '';
                                                    if (label) label += ': ';
                                                    if (context.parsed.y !== null) label += context.parsed.y;
                                                    return label;
                                                }
                                            }
                                        }
                                    },
                                    scales: {
                                        y: { beginAtZero: true, title: { display: true, text: 'Number of Cases' } },
                                        x: { title: { display: true, text: 'Severity Level' } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <h3 className="sub-section-title">Severity Heatmap</h3>
                    <p className="section-description">Visual representation of individual overall severity levels.</p>
                    <div ref={heatmapRef} className="heatmap-grid">
                        {evaluations.length > 0 ? (
                            evaluations.map((entry, idx) => (
                                <div
                                    key={idx}
                                    className="heat-box"
                                    style={{ backgroundColor: severityColors[entry.overallSeverity?.toLowerCase()] || '#E0E0E0' }}
                                    title={`Patient ID: ${entry.patient_id}\nOverall Severity: ${entry.overallSeverity?.replace(/_/g, ' ')}`}
                                >
                                    <span className="severity-label">
                                        {entry.overallSeverity?.replace(/_/g, ' ') || 'N/A'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="no-data-message">No individual evaluation data available for the selected period.</p>
                        )}
                    </div>
                </div>
            )}

            <div className="section-block assessment-tools-section">
                <h2 className="section-title">Assessment Tools Summary</h2>
                <p className="section-description">Overview of the mental health assessment tools utilized.</p>
                {/* No ref needed here as we use jsPDF-Autotable directly */}
                <table className="data-table tool-table">
                    <thead>
                        <tr>
                            <th>Tool</th>
                            <th>Full Form</th>
                            <th>Area of Assessment</th>
                            <th>Typical Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessmentTools.map((tool, idx) => (
                            <tr key={idx}>
                                <td>{tool.tool}</td>
                                <td>{tool.fullForm}</td>
                                <td>{tool.area}</td>
                                <td>{tool.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button id="download-button" onClick={handleDownloadPDF} className="download-button" disabled={loading}>
                {loading ? "Preparing PDF..." : "📥 Download PDF Report"}
            </button>
        </div>
    );
}