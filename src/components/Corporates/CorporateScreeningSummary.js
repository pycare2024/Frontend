import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
            <html>
            <head>
                <title>Screening Report</title>
                <style>
                    * {
                        pointer-events: none;
                        user-select: none;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h2 {
                        color: #4285F4;
                    }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
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
                    <h2>Summary for {companyCode}</h2>
                    <p>Date Range: {startDate} to {endDate}</p>

                    {/* Cases Pie Chart */}
                    <h3 style={{ marginTop: "2rem" }}>Cases Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={casesPieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {casesPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Department Bar Chart */}
                    <h3 style={{ marginTop: "2rem" }}>Department Scores</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={departmentBarData}>
                            <XAxis dataKey="department" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="GAD-7" fill="#4285F4" />
                            <Bar dataKey="PCL-5" fill="#EA4335" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default CorporateScreeningSummary;