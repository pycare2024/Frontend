import React, { useState, useEffect } from "react";
import "./CorporateDashBoard.css";
import {
  Calendar,
  CreditCardIcon,
  Users,
  Building2,
  AlertCircle,
} from "lucide-react";

const CorporateDashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [companyCode, setCompanyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Sample data - replace with actual API calls
  const [corporateData, setCorporateData] = useState({});

  const [activeTab, setActiveTab] = useState("employees");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://backend-xhl4.onrender.com/CorporateRoute/corporate/${companyCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Calculate derived metrics from fetched data, not from state
        const totalEmployees = data.associatedPatients.length;

        const bookedAppointments = data.associatedPatients.reduce(
          (total, emp) => total + emp.visits.length,
          0
        );

        // Add these metrics to corporateData
        setCorporateData({
          ...data,
          totalEmployees,
          bookedAppointments,
        });

        setShowDashboard(true);
      } else {
        setError("Company doesn't exist. Please check your company code.");
      }
    } catch (err) {
      setError("Company doesn't exist. Please check your company code.");
    }

    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (!showDashboard) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <Building2 size={48} />
            </div>
            <h1>Corporate Dashboard</h1>
            <p>Enter company code to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="companyCode">Company Code</label>
              <input
                type="text"
                id="companyCode"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                placeholder="Enter company code"
                required
                className="form-input"
              />
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !companyCode.trim()}
              className="submit-button"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Loading...</span>
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show Dashboard after successful company code entry
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Corporate Dashboard</h1>
        <div className="company-name">
          <span>{corporateData.companyName}</span>
        </div>
      </header>

      {/* Metrics Cards */}
      <div className="metrics-container">
        <div className="metric-card credits">
          <div className="metric-icon">
            <CreditCardIcon />
          </div>
          <div className="metric-content">
            <h3>Remaining Credits</h3>
            <span className="metric-value">{corporateData.totalCredits}</span>
          </div>
        </div>

        <div className="metric-card employees">
          <div className="metric-icon">
            <Users />
          </div>
          <div className="metric-content">
            <h3>Total Employees</h3>
            <span className="metric-value">{corporateData.totalEmployees}</span>
            <p className="metric-subtitle">Registered employees</p>
          </div>
        </div>

        <div className="metric-card appointments">
          <div className="metric-icon">
            <Calendar />
          </div>
          <div className="metric-content">
            <h3>Booked Appointments</h3>
            <span className="metric-value">
              {corporateData.bookedAppointments}
            </span>
            <p className="metric-subtitle">Total appointments</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs-container">
        <div className="tabs-navigation">
          <button
            className={`tab-button ${
              activeTab === "employees" ? "active" : ""
            }`}
            onClick={() => setActiveTab("employees")}
          >
            Employees
          </button>
          <button
            className={`tab-button ${activeTab === "recharge" ? "active" : ""}`}
            onClick={() => setActiveTab("recharge")}
          >
            Recharge History
          </button>
          <button
            className={`tab-button ${activeTab === "refunds" ? "active" : ""}`}
            onClick={() => setActiveTab("refunds")}
          >
            Refund History
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "employees" && (
            <div className="table-container">
              <h3>Associated Employees</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Family Members</th>
                    <th>Total Visits</th>
                    <th>Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {corporateData.associatedPatients.map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.empId}</td>
                      <td>{employee.employeePhone}</td>
                      <td>{employee.department}</td>
                      <td>
                        <span className="family-count">
                          {employee.familyMembers.length}
                        </span>
                        <div className="family-tooltip">
                          {employee.familyMembers.map((member, index) => (
                            <div key={index} className="family-member">
                              <strong>{member.name}</strong> ({member.relation})
                              <br />
                              <small>{member.mobile}</small>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>{employee.visits.length}</td>
                      <td>
                        {employee.visits.length > 0
                          ? formatDate(
                              employee.visits[employee.visits.length - 1].date
                            )
                          : "No visits"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "recharge" && (
            <div className="table-container">
              <h3>Recharge History</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Credits</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {corporateData.rechargeHistory.map((recharge) => (
                    <tr key={recharge._id}>
                      <td>{formatDate(recharge.date)}</td>
                      <td>
                        <span className="credits-badge">
                          +{recharge.credits}
                        </span>
                      </td>
                      <td>{formatCurrency(recharge.amount)}</td>
                      <td>
                        <span className="status-badge success">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "refunds" && (
            <div className="table-container">
              <h3>Refund History</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Credits</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {corporateData.refundHistory.map((refund) => (
                    <tr key={refund._id}>
                      <td>{formatDate(refund.date)}</td>
                      <td>
                        <span className="credits-badge refund">
                          +{refund.credits}
                        </span>
                      </td>
                      <td>{refund.reason}</td>
                      <td>
                        <span className="status-badge processed">
                          Processed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateDashboard;
