import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScreeningTestDetails.css"; // Import your modern CSS

function ScreeningTestDetails() {
    const { id } = useParams();
    const [screeningTests, setScreeningTests] = useState([]);
    const [error, setError] = useState(null);
    const [openRecordId, setOpenRecordId] = useState(null);

    useEffect(() => {
        const fetchScreeningTests = async () => {
            try {
                const response = await fetch(`https://backend-xhl4.onrender.com/NewScreeningTestRoute/${id}`);
                if (!response.ok) throw new Error("Failed to fetch screening test details");
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
        doc.text(`Screening Test Report`, 14, 10);
        doc.text(`Date of Test: ${new Date(test.DateOfTest).toLocaleDateString()}`, 14, 20);

        const scoreEntries = Object.entries(test.scores || {});
        doc.autoTable({
            head: [["Instrument", "Score"]],
            body: scoreEntries.map(([instrument, score]) => [instrument, score]),
            startY: 30,
        });

        doc.text("AI-Generated Report:", 14, doc.lastAutoTable.finalY + 10);
        doc.text(doc.splitTextToSize(test.report || "No report available", 180), 14, doc.lastAutoTable.finalY + 20);

        doc.autoPrint();
        window.open(doc.output("bloburl"), "_blank");
    };

    return (
        <div className="screening-details-container">
            <h1 className="screening-details-title">Screening Test Records</h1>

            {error && <p className="screening-error-text">{error}</p>}

            {screeningTests.length === 0 ? (
                <p className="screening-no-data-text">No screening test records found.</p>
            ) : (
                <div className="screening-card-grid">
                    {screeningTests.map((test) => (
                        <div key={test._id} className="screening-card">
                            <div className="screening-card-header">
                                <FaCalendarAlt />
                                <strong>Date:</strong>&nbsp;{new Date(test.DateOfTest).toLocaleDateString()}
                            </div>

                            <ul className="screening-score-list">
                                {test.scores &&
                                    Object.entries(test.scores).map(([key, value]) => (
                                        <li key={key}>
                                            <span>{key}</span>
                                            <span className="screening-score-value">{value}</span>
                                        </li>
                                    ))}
                            </ul>

                            <p className="screening-report-preview">
                                {test.report ? test.report.substring(0, 150) + "..." : "No report available."}
                            </p>

                            {openRecordId === test._id && (
                                <div className="screening-full-report">
                                    <strong>Full Report:</strong>
                                    <p>{test.report}</p>
                                </div>
                            )}

                            <div className="screening-button-row">
                                <button
                                    className="screening-card-button screening-open-btn"
                                    onClick={() =>
                                        setOpenRecordId(openRecordId === test._id ? null : test._id)
                                    }
                                >
                                    {openRecordId === test._id ? "Close" : "Open"}
                                </button>

                                <button
                                    className="screening-card-button screening-print-btn"
                                    onClick={() => handlePrint(test)}
                                >
                                    Print
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScreeningTestDetails;