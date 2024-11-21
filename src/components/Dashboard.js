import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
    const location = useLocation();
    const admin = location.state?.admin; // Retrieve admin data from location state

    return (
        <div>
            {admin ? (
                <h1 className="bg-warning p-3">Welcome, {admin.name} !</h1> // Display admin's name
            ) : (
                <h1>Welcome!</h1>
            )}
        </div>
    );
}

export default Dashboard;