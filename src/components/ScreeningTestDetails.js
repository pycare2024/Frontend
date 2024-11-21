import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa"; // Import icons
import jsPDF from "jspdf";
import "jspdf-autotable";

function ScreeningTestDetails() {
    const { id } = useParams();
    const [screeningTests, setScreeningTests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScreeningTests = async () => {
            try {
                const response = await fetch(`https://backend-xhl4.onrender.com/PatientRoute/${id}/screeningTests`);
                if (!response.ok) {
                    throw new Error("Failed to fetch screening test details");
                }
                const data = await response.json();
                setScreeningTests(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchScreeningTests();
    }, [id]);

    const handlePrint = (test) => {
        const doc = new jsPDF();
        const questionsAnswers = Array.from({ length: 18 }, (_, index) => {
            const questionNumber = (index + 1).toString();
            return [
                `Question ${questionNumber}`,
                test[questionNumber] || "No answer provided"
            ];
        });

        doc.text(`Screening Test Details - ${new Date(test.DateOfTest).toLocaleDateString()}`, 14, 10);
        doc.autoTable({
            head: [['Question', 'Answer']],
            body: questionsAnswers,
            startY: 30,
            theme: 'grid',
        });
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#007bff", marginBottom: "30px" }}>Screening Test Details</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {screeningTests.length > 0 ? (
                screeningTests.map((test) => (
                    <div key={test._id} style={{
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        {/* Date Section */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                            fontSize: "1.2em",
                            color: "#007bff",
                            fontWeight: "bold",
                        }}>
                            <FaCalendarAlt style={{ marginRight: "8px" }} />
                            <span>{new Date(test.DateOfTest).toLocaleDateString()}</span>
                        </div>

                        {/* Questions and Answers Table */}
                        <table style={{ width: "100%", backgroundColor: "#ffffff", borderRadius: "5px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#007bff", color: "white", fontWeight: "bold" }}>
                                    <th style={{ padding: "10px" }}>Question</th>
                                    <th style={{ padding: "10px" }}>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 18 }, (_, index) => {
                                    const questionNumber = (index + 1).toString();
                                    return (
                                        <tr key={`${test._id}-${questionNumber}`} style={{
                                            borderBottom: "1px solid #ddd",
                                            backgroundColor: index % 2 === 0 ? "#f1f3f5" : "#ffffff"
                                        }}>
                                            <td style={{
                                                padding: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: "bold",
                                                color: "#495057"
                                            }}>
                                                <FaQuestionCircle style={{ marginRight: "8px", color: "#17a2b8" }} />
                                                Question {questionNumber}
                                            </td>
                                            <td style={{
                                                padding: "10px",
                                                color: "#495057"
                                            }}>
                                                {test[questionNumber] || "No answer provided"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Print Button */}
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <button
                                onClick={() => handlePrint(test)}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Print Screening Test
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ color: "#6c757d", textAlign: "center" }}>No screening test details found.</p>
            )}
        </div>
    );
}

export default ScreeningTestDetails;