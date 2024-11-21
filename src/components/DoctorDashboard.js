import React from "react";
import { useLocation } from "react-router-dom";

function DoctorDashboard() {
    const location = useLocation();
    const doctor = location.state?.doctor; // Retrieve doctor data from location state

    return (
        <div>
            {doctor ? (
                <h1 className="bg-warning p-3">Welcome, Dr. {doctor.name} !</h1> // Display doctor's name
            ) : (
                <h1>Welcome!</h1>
            )}
        </div>
    );
}

export default DoctorDashboard;