import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";

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
    <div className="p-6 bg-white rounded-lg shadow-md" style={{marginTop:"5%"}}>
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="font-semibold">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block mt-1 border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="font-semibold">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block mt-1 border px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🔍 Apply Filter
        </button>
      </div>

      <div ref={reportRef} className="bg-gray-50 p-6 rounded-md">
        <h1 className="text-3xl font-bold text-center">PsyCare</h1>
        <p className="text-center italic text-gray-600 mb-6">Your Path to Mental Wellness</p>

        <h2 className="text-xl font-semibold mb-2">Company Accounts Report</h2>
        <p className="mb-2 font-medium">Period: {startDate || 'Start'} to {endDate || 'End'}</p>

        {summary && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <ul className="list-disc pl-6">
              <li>Total Earnings: {formatCurrency(summary.totalEarnings)}</li>
              <li>Total Withdrawn: {formatCurrency(summary.totalWithdrawn)}</li>
              <li>Total Sessions: {summary.sessionCount}</li>
            </ul>
          </div>
        )}

        {summary?.doctorBreakdown?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Doctor Breakdown</h3>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Doctor</th>
                  <th className="p-2 border">Total appointments booked</th>
                  <th className="p-2 border">Total Sessions</th>
                  <th className="p-2 border">Earnings</th>
                  <th className="p-2 border">Withdrawn</th>
                  <th className="p-2 border">Balance</th>
                </tr>
              </thead>
              <tbody>
                {summary.doctorBreakdown.map((doc, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{doc.name}</td>
                    <td className="p-2 border">{doc.appointmentsBooked}</td>
                    <td className="p-2 border">{doc.sessionsCompleted}</td>
                    <td className="p-2 border">{formatCurrency(doc.earnings)}</td>
                    <td className="p-2 border">{formatCurrency(doc.withdrawn)}</td>
                    <td className="p-2 border">{formatCurrency(doc.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-sm text-center mt-10 text-gray-500">
          Report generated on {new Date().toLocaleString()}
        </p>
      </div>

      <div className="text-right mt-6">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📄 Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default CompanyAccountsTab;
