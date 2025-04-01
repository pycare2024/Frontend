import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import "./CompanyAccountsTab.css";

const CompanyAccountsTab = () => {
  const [summary, setSummary] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const reportRef = useRef();

  const fetchCompanySummary = async () => {
    const query = [];
    if (startDate) query.push(`startDate=${startDate}`);
    if (endDate) query.push(`endDate=${endDate}`);
    const queryString = query.length ? `?${query.join("&")}` : "";

    const res = await fetch(`https://backend-xhl4.onrender.com/AdminRoute/companyAccountsSummary${queryString}`);
    const data = await res.json();
    if (data.success) setSummary(data.data);
  };

  useEffect(() => {
    fetchCompanySummary();
  }, []);

  const handleFilter = () => {
    fetchCompanySummary();
  };

  const handlePrint = () => {
    const element = reportRef.current;
    const options = {
      margin: 10,
      filename: `Company_Account_Report_${new Date().toLocaleDateString()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  return (
    <div className="company-tab-wrapper">
      <div className="company-filter-bar">
        <div className="company-date-input">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="company-date-input">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={handleFilter} className="btn filter-btn">
          🔍 Apply Filter
        </button>
      </div>

      <div ref={reportRef} className="company-report">
        <h1 className="company-title">PsyCare</h1>
        <p className="company-tagline">Your Path to Mental Wellness</p>

        <h2 className="section-heading">Company Accounts Report</h2>
        <p className="report-period">Period: {startDate || 'Start'} to {endDate || 'End'}</p>

        {summary && (
          <div className="summary-block">
            <h3 className="sub-heading">Summary</h3>
            <ul className="summary-list">
              <li>Total Earnings: {formatCurrency(summary.totalEarnings)}</li>
              <li>Total Withdrawn: {formatCurrency(summary.totalWithdrawn)}</li>
              <li>Total Appointments Booked: {summary.appointmentCount}</li>
              <li>Total Sessions(completed + no-show by Patient): {summary.sessionCount}</li>
              <li>Total Cancelled Appointments(cancelled by doctor + doctor doesn't show): {summary.cancelledCount}</li>
            </ul>
          </div>
        )}

        {summary?.doctorBreakdown?.length > 0 && (
          <div className="doctor-table-wrapper">
            <h3 className="sub-heading">Doctor Breakdown</h3>
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Total Appointments</th>
                  <th>Total Sessions</th>
                  <th>Total Cancelled</th>
                  <th>Earnings</th>
                  <th>Withdrawn</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {summary.doctorBreakdown.map((doc, idx) => (
                  <tr key={idx}>
                    <td>{doc.name}</td>
                    <td>{doc.appointmentsBooked}</td>
                    <td>{doc.sessionsCompleted}</td>
                    <td>{doc.cancelledAppointments}</td>
                    <td>{formatCurrency(doc.earnings)}</td>
                    <td>{formatCurrency(doc.withdrawn)}</td>
                    <td>{formatCurrency(doc.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="report-footer">
          Report generated on {new Date().toLocaleString()}
        </p>
      </div>

      <div className="print-btn-wrapper">
        <button onClick={handlePrint} className="btn print-btn">
          📄 Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default CompanyAccountsTab;