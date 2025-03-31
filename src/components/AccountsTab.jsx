
import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";

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

  const handleFilter = () => {
    fetchData();
  };

  const handlePrint = () => {
    const element = reportRef.current;
    const options = {
      margin: 10,
      filename: `Doctor_Account_Report_${new Date().toLocaleDateString()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  if (loading) return <p>Loading account info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div style={{
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        <div>
          <label style={{ fontWeight: "bold" }}>Start Date:</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginLeft: "5px"
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>End Date:</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginLeft: "5px"
            }}
          />
        </div>

        <button
          onClick={handleFilter}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          🔍 Apply Filter
        </button>
      </div>
      <div
        ref={reportRef}
        style={{ fontFamily: "Arial, sans-serif", backgroundColor: "white", padding: "20px", borderRadius: "10px", color: "#333" }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 0 }}>PsyCare</h1>
        <p style={{ textAlign: "center", marginTop: "5px", fontStyle: "italic" }}>Your Path to Mental Wellness</p>
        <hr />
        <h2 style={{ textAlign: "center" }}>Accounts Report</h2>
        <p><strong>Doctor:</strong> Dr. {doctorName}</p>
        <p><strong>Period:</strong> {dateRange.start || "Start"} to {dateRange.end || "End"}</p>

        <h3>Account Summary</h3>
        <ul>
          <li><strong>Total Earnings:</strong> {formatCurrency(summary.totalEarnings)}</li>
          <li><strong>Total Withdrawn:</strong> {formatCurrency(summary.totalWithdrawn)}</li>
          <li><strong>Current Balance:</strong> {formatCurrency(summary.currentBalance)}</li>
          <li><strong>Last Updated:</strong> {new Date(summary.lastUpdated).toLocaleString()}</li>
        </ul>

        <h3>Transaction History</h3>
        {transactions.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #aaa", textAlign: "left", padding: "5px" }}>Date</th>
                <th style={{ borderBottom: "1px solid #aaa", textAlign: "left", padding: "5px" }}>Amount</th>
                <th style={{ borderBottom: "1px solid #aaa", textAlign: "left", padding: "5px" }}>Appointment Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, idx) => (
                <tr key={idx}>
                  <td style={{ padding: "5px" }}>{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "5px" }}>{formatCurrency(txn.amount)}</td>
                  <td style={{ padding: "5px" }}>{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions available for the selected date range.</p>
        )}

        <p style={{ textAlign: "center", marginTop: "40px", fontSize: "12px" }}>
          Report generated on {new Date().toLocaleString()}
        </p>
      </div>

      <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
        <button onClick={handlePrint} style={{ padding: "6px 12px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none" }}>
          📄 Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default AccountsTab;
