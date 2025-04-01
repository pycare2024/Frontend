import React, { useEffect, useState } from "react";
import "./OperatorDetails.css";

const OperatorDetails = () => {
    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://backend-xhl4.onrender.com/OperatorRoute/get-operators")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch operator details");
                }
                return response.json();
            })
            .then((data) => {
                setOperators(data.operators);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="error-text">Error: {error}</p>;

    return (
        <div className="operator-details-wrapper">
            <h2 className="operator-title">Operator Details</h2>
            <div className="operator-grid">
                {operators.length > 0 ? (
                    operators.map((operator) => (
                        <div key={operator._id} className="operator-card">
                            <h3>{operator.Name}</h3>
                            <p><strong>Login ID:</strong> {operator.loginId}</p>
                            <p><strong>Email:</strong> {operator.email}</p>
                            <p><strong>Mobile:</strong> {operator.mobileNo}</p>
                            <p><strong>DOB:</strong> {new Date(operator.dob).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-operators">No operators found.</p>
                )}
            </div>
        </div>
    );
};

export default OperatorDetails;