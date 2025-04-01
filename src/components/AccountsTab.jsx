import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import "./AccountsTab.css";

const AccountsTab = ({ doctorId, doctorName }) => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const reportRef = useRef();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const summaryRes = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/getDoctorAccountSummary/${doctorId}`);
      const summaryData = await summaryRes.json();
      if (!summaryData.success) throw new Error(summaryData.message || "Failed to fetch summary");
      setSummary(summaryData.data);

      const query = [];
      if (dateRange.start) query.push(`startDate=${dateRange.start}`);
      if (dateRange.end) query.push(`endDate=${dateRange.end}`);
      const queryString = query.length ? `?${query.join("&")}` : "";

      const txnRes = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/getDoctorTransactions/${doctorId}${queryString}`);
      const txnData = await txnRes.json();
      if (!txnData.success) throw new Error(txnData.message || "Failed to fetch transactions");
      setTransactions(txnData.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [doctorId]);

  const handleFilter = () => fetchData();

  const handlePrint = () => {
    const element = reportRef.current;
    const options = {
      margin: 10,
      filename: `PsyCare_Accounts_Report_${doctorName}_${new Date().toLocaleDateString()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  if (loading) return <p>Loading account info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="accounts-tab-container">
      {/* Filter */}
      <div className="date-filter-controls">
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </div>
        <button onClick={handleFilter} className="filter-button">🔍 Apply Filter</button>
      </div>

      {/* Report Section */}
      <div className="report-header" ref={reportRef}>
        <h1 style={{color:"#4285F4",fontWeight:"bold"}}>PsyCare</h1>
        <p className="subtitle">Your Path to Mental Wellness</p>
        <hr />
        <h2 style={{ textAlign: "center" }}>Accounts Report</h2>
        <p><strong>Doctor:</strong> Dr. {doctorName}</p>
        <p><strong>Period:</strong> {dateRange.start || "Start"} to {dateRange.end || "End"}</p>

        <h3 className="section-title">Account Summary</h3>
        <ul className="summary-list">
          <li><strong>Total Earnings:</strong> {formatCurrency(summary.totalEarnings)}</li>
          <li><strong>Total Withdrawn:</strong> {formatCurrency(summary.totalWithdrawn)}</li>
          <li><strong>Current Balance:</strong> {formatCurrency(summary.currentBalance)}</li>
          <li><strong>Last Updated:</strong> {new Date(summary.lastUpdated).toLocaleString()}</li>
        </ul>

        <h3 className="section-title">Transaction History</h3>
        {transactions.length > 0 ? (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Reference ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, idx) => (
                <tr key={idx}>
                  <td>{txn.sno}</td>
                  <td>{txn.date}</td>
                  <td className={txn.type === "credit" ? "transaction-type-credit" : "transaction-type-debit"}>
                    {txn.type === "credit" ? "Credit" : "Debit"}
                  </td>
                  <td>{formatCurrency(txn.amount)}</td>
                  <td>{txn.description}</td>
                  <td>{txn.referenceId || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions available for the selected date range.</p>
        )}

        <p className="footer-note">Report generated on {new Date().toLocaleString()}</p>
      </div>

      {/* Download */}
      <button onClick={handlePrint} className="download-btn">
        📄 Download PDF Report
      </button>
    </div>
  );
};

export default AccountsTab;