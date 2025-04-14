// RechargeCredits.js
import React, { useState } from "react";
import "./RechargeCredits.css";

const RechargeCredits = () => {
    const [companyCode, setCompanyCode] = useState("");
    const [credits, setCredits] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRecharge = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("https://backend-xhl4.onrender.com/CorporateRoute/rechargeCredits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyCode, credits, amount })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(`✅ Recharge link sent successfully to company contact.`);
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (err) {
            setMessage("❌ Error generating payment link.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="recharge-container">
            <h2>Recharge Company Credits</h2>
            <form className="recharge-form" onSubmit={handleRecharge}>
                <input
                    type="text"
                    placeholder="Company Code"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Credits"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount (INR)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Generate Payment Link"}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RechargeCredits;