import React, { useEffect, useState } from "react";

const OperatorDetails = () => {
    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://backend-xhl4.onrender.com/OperatorRoute/get-operators") // Ensure correct backend URL
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

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4" style={{height:"100vh" ,marginTop:"20%",marginBottom:"5%"}}>
            <h2 className="text-2xl font-bold text-center mb-4">Operator Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {operators.length > 0 ? (
                    operators.map((operator) => (
                        <div key={operator._id} className="border p-4 rounded shadow-lg">
                            <h3 className="text-lg font-semibold">{operator.Name}</h3>
                            <p><strong>Login ID:</strong> {operator.loginId}</p>
                            <p><strong>Email:</strong> {operator.email}</p>
                            <p><strong>Mobile:</strong> {operator.mobileNo}</p>
                            <p><strong>DOB:</strong> {new Date(operator.dob).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No operators found.</p>
                )}
            </div>
        </div>
    );
};

export default OperatorDetails;
