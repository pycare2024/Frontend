import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function AppointmentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [modalData, setModalData] = useState(null);
    const [patient, setPatient] = useState("");
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`https://backend-xhl4.onrender.com/patientRoute/${id}`);
                const data = await response.json();
                if (!response.ok) throw new Error("Failed to fetch patient details");
                setPatient(data.patient);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAppointments = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = `https://backend-xhl4.onrender.com/AppointmentRoute/appointments/${id}`;
                if (selectedDate) {
                    url += `?date=${selectedDate}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                if (!response.ok) throw new Error("Appointment not found for the selected date");
                setAppointments(data.appointments || []);
            } catch (err) {
                setError(err.message);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
        fetchAppointments();
    }, [id, selectedDate]);

    const fetchDoctorDetails = async (doctor_id) => {
        try {
            const response = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/${doctor_id}`);
            const data = await response.json();
            if (!response.ok) throw new Error("Failed to fetch doctor details");
            setDoctor(data);
        } catch (error) {
            console.error("Error fetching doctor details:", error);
            setDoctor(null);
        }
    };

    const handleView = async (appointment) => {
        setModalData(appointment);
        setDoctor(null);
        await fetchDoctorDetails(appointment.doctor_id);
    };

    const handleDownloadPDF = (appointment) => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.text("PsyCare Prescription", 20, 20);
        doc.setFont("helvetica", "normal");

        const details = [
            ["Appointment ID", appointment._id],
            ["Date of Appointment", new Date(appointment.DateOfAppointment).toLocaleDateString()],
            ["Weekday", appointment.WeekDay],
            ["Patient Name", patient.Name || "Unknown"],
            ["Doctor", doctor ? doctor.Name : "Loading..."],
        ];

        doc.autoTable({
            startY: 30,
            head: [["Field", "Details"]],
            body: details,
        });

        doc.save(`PsyCare_Prescription_${appointment._id}.pdf`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Appointment Details</h1>
            <p style={styles.text}>Patient Id: <strong>{patient._id || "Loading..."}</strong></p>
            <p style={styles.text}>Patient Name: <strong>{patient.Name || "Loading..."}</strong></p>
            
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={styles.dateInput}
            />
            
            {loading ? (
                <p>Loading appointments...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id}>
                                <td>{new Date(appointment.DateOfAppointment).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleView(appointment)} style={styles.button}>View</button>
                                    <button onClick={() => handleDownloadPDF(appointment)} style={styles.button}>Download</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {modalData && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Appointment Details</h2>
                        <p><strong>Appointment ID:</strong> {modalData._id}</p>
                        <p><strong>Date of Appointment:</strong> {new Date(modalData.DateOfAppointment).toLocaleDateString()}</p>
                        <p><strong>Weekday:</strong> {modalData.WeekDay}</p>
                        <p><strong>Patient Name:</strong> {patient.Name || "Unknown"}</p>
                        <p><strong>Doctor:</strong> {doctor ? doctor.Name : "Loading..."}</p>
                        <button onClick={() => handleDownloadPDF(modalData)} style={styles.button}>Download</button>
                        <button onClick={() => setModalData(null)} style={styles.button}>Close</button>
                    </div>
                </div>
            )}
            
            <button onClick={() => navigate(-1)} style={styles.button}>Go Back</button>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh", // Allows page to expand when content is long
        backgroundColor: "white",
        margin: 0,  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "120px", // Adjust based on your navbar height
    },
    heading: {
        color: "#FF8096",
        fontSize: "2em",
        fontWeight: "bold",
    },
    text: {
        fontSize: "1.2em",
        color: "#333",
        marginTop: "10px",
    },
    table: {
        width: "80%",
        margin: "20px auto",
        borderCollapse: "collapse",
    },
    dateInput: {
        padding: "10px",
        margin: "10px 0",
        fontSize: "1em",
    },
    button: {
        margin: "5px",
        padding: "10px 15px",
        backgroundColor: "#FF8096",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
    }
};

export default AppointmentDetails;
