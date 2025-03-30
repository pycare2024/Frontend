import React, { useEffect, useState } from "react";

const AccountsTab = ({ doctorId }) => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`https://backend-xhl4.onrender.com/AccountsRoute/summary?doctorId=${doctorId}`);
        const data = await res.json();
        if (res.ok) {
          setAccountData(data);
        } else {
          setError(data.message || "Failed to load account details");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [doctorId]);

  if (loading) return <p>Loading account info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ backgroundColor: "#f1f9f9", padding: "20px", borderRadius: "10px" }}>
      <h3 style={{ color: "#333" }}>Accounts Summary</h3>
      <p><strong>Total Paid:</strong> ₹{accountData.paid}</p>
      <p><strong>Pending Amount:</strong> ₹{accountData.pending}</p>

      {accountData.lastPaymentDate && (
        <p><strong>Last Payment Date:</strong> {new Date(accountData.lastPaymentDate).toLocaleDateString()}</p>
      )}

      {accountData.paymentHistory?.length > 0 && (
        <>
          <h4 style={{ marginTop: "1rem" }}>Payment History</h4>
          <ul>
            {accountData.paymentHistory.map((entry, index) => (
              <li key={index}>
                ₹{entry.amount} on {new Date(entry.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AccountsTab;