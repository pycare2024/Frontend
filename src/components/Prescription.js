import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Prescription.css';

function Prescription() {
    const { id } = useParams();
    const [prescription, setPrescription] = useState(null);
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/record/${id}`);
                if (!response.ok) throw new Error("Failed to fetch prescription data");
                const data = await response.json();
                setPrescription(data);

                const patientResponse = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/${data.patient_id}`);
                if (!patientResponse.ok) throw new Error("Failed to fetch patient data");
                const patientData = await patientResponse.json();
                setPatient(patientData.patient);

                const doctorResponse = await fetch(`https://backend-xhl4.onrender.com/DoctorRoute/${data.doctor_id}`);
                if (!doctorResponse.ok) throw new Error("Failed to fetch doctor data");
                const doctorData = await doctorResponse.json();
                setDoctor(doctorData);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrescription();
    }, [id]);

    const handlePrint = () => {
        if (prescription && prescription.signed) {
            window.print(); 
        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (loading) return <div className="loading-container"><p>Loading prescription...</p></div>;
    if (error) return <div className="error-container"><p>Error: {error}</p></div>;

    return (
        <div className="prescription-container">
            <div className="header">
                <h1>PsyCare</h1>
                <p className="timestamp">{new Date().toLocaleString()}</p>
            </div>

            <h2 className="section-title">Prescription Details</h2>

            {prescription && patient && doctor ? (
                <div className="prescription-details">
                    <table className="prescription-table">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Patient Name:</strong></td>
                                <td>{patient.Name}</td>
                            </tr>
                            <tr>
                                <td><strong>Patient Age:</strong></td>
                                <td>{patient.Age}</td>
                            </tr>
                            <tr>
                                <td><strong>Consulting Doctor:</strong></td>
                                <td>{doctor.Name}</td>
                            </tr>
                            <tr>
                                <td><strong>Date of Visit:</strong></td>
                                <td>{new Date(prescription.DOV).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Diagnosis:</strong></td>
                                <td>{prescription.diagnosis}</td>
                            </tr>
                            <tr>
                                <td><strong>Prescription:</strong></td>
                                <td>{prescription.prescription}</td>
                            </tr>
                            <tr>
                                <td><strong>Notes:</strong></td>
                                <td>{prescription.notes}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="signature-section">
                        {prescription.signed ? (
                            <>
                                <p><strong>Doctor's Signature:</strong> {doctor.Name}</p>
                                <div className="signature-line"></div>
                                <p className="signature-date">Date: {new Date().toLocaleDateString()}</p>
                            </>
                        ):
                        (
                            <>
                                <p><strong>Doctor's Signature:</strong></p>
                                <div className="signature-line"></div>
                                <p className="signature-date">Date: {new Date().toLocaleDateString()}</p>
                            </>
                        )}
                    </div>

                    {prescription.signed && (
                        <div className="watermark">
                            <span>Verified</span>
                        </div>
                    )}

                    <div className="print-button-container">
                        <button onClick={handlePrint} className="print-button">Print Prescription</button>
                    </div>
                </div>
            ) : (
                <p>No prescription data found.</p>
            )}

            {/* Modal for unsigned prescription warning */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Notice</h2>
                        <p>This prescription is not valid for printing until signed.</p>
                        <button onClick={closeModal} className="modal-close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Prescription;