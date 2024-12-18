import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ScreeningTestDetails() {
    const { id } = useParams();
    const [screeningTests, setScreeningTests] = useState([]);
    const [error, setError] = useState(null);
    const [hoveredQuestion, setHoveredQuestion] = useState(null); // Store hovered question
    const [questionsCache, setQuestionsCache] = useState({}); // Cache fetched questions
    const [fetchError, setFetchError] = useState(null); // To handle fetch errors for individual questions

    // Fetch screening tests
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

    // Fetch a single question on hover
    const fetchQuestionOnHover = async (questionNumber) => {
        if (questionsCache[questionNumber]) {
            // If already fetched, use cached question
            setHoveredQuestion(questionsCache[questionNumber]);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:4000/ScreeningTestRoute/${questionNumber}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch Question ${questionNumber}`);
            }
            const data = await response.json();
            setQuestionsCache((prevCache) => ({
                ...prevCache,
                [questionNumber]: data.eng, // Assuming you're using `eng` field from the question data
            }));
            setHoveredQuestion(data.eng); // Display the English question text
        } catch (error) {
            setFetchError(`Failed to fetch Question ${questionNumber}`);
            setHoveredQuestion(null);
        }
    };

    const handlePrint = (test) => {
        const doc = new jsPDF();
        const questionsAnswers = Array.from({ length: 18 }, (_, index) => {
            const questionNumber = (index + 1).toString();
            return [
                `Question ${questionNumber}`,
                test[questionNumber] || "No answer provided",
            ];
        });

        doc.text(
            `Screening Test Details - ${new Date(
                test.DateOfTest
            ).toLocaleDateString()}`,
            14,
            10
        );
        doc.autoTable({
            head: [["Question", "Answer"]],
            body: questionsAnswers,
            startY: 30,
            theme: "grid",
        });
        doc.autoPrint();
        window.open(doc.output("bloburl"), "_blank");
    };

    return (
        <div
            style={{
                margin: "5% auto",
                padding: "40px",
                maxWidth: "1100px",
                fontFamily: "'Open Sans', Arial, sans-serif",
                backgroundColor: "#F8F9FA",
                borderRadius: "12px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#333",
                    fontSize: "2.2rem",
                    fontWeight: "600",
                    marginBottom: "30px",
                    letterSpacing: "1px",
                }}
            >
                Screening Test Details
            </h1>
            {error && (
                <p style={{ color: "#E74C3C", textAlign: "center", fontSize: "1.1rem" }}>
                    {error}
                </p>
            )}

            {screeningTests.length > 0 ? (
                screeningTests.map((test) => (
                    <div
                        key={test._id}
                        style={{
                            backgroundColor: "#ffffff",
                            padding: "25px",
                            marginBottom: "25px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Date Section */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "20px",
                                fontSize: "1.1rem",
                                color: "#555",
                                fontWeight: "500",
                            }}
                        >
                            <FaCalendarAlt style={{ marginRight: "8px" }} />
                            <span>
                                {new Date(test.DateOfTest).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Questions and Answers Table */}
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                backgroundColor: "#ffffff",
                                borderRadius: "5px",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#007BFF",
                                        color: "#ffffff",
                                        textAlign: "center",
                                        fontWeight: "600",
                                    }}
                                >
                                    <th style={{ padding: "12px" }}>Question</th>
                                    <th style={{ padding: "12px" }}>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 18 }, (_, index) => {
                                    const questionNumber = (index + 1).toString();
                                    return (
                                        <tr
                                            key={`${test._id}-${questionNumber}`}
                                            style={{
                                                borderBottom: "1px solid #ddd",
                                                backgroundColor:
                                                    index % 2 === 0 ? "#F9FAFB" : "#FFFFFF",
                                            }}
                                            onMouseOver={(e) =>
                                                (e.target.style.backgroundColor =
                                                    "#F1F3F5")
                                            }
                                            onMouseOut={(e) =>
                                                (e.target.style.backgroundColor =
                                                    index % 2 === 0 ? "#F9FAFB" : "#FFFFFF")
                                            }
                                        >
                                            <td
                                                style={{
                                                    padding: "12px",
                                                    fontSize: "1rem",
                                                    fontWeight: "500",
                                                    color: "#333",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    position: "relative",
                                                }}
                                                onMouseEnter={() =>
                                                    fetchQuestionOnHover(questionNumber)
                                                }
                                                onMouseLeave={() =>
                                                    setHoveredQuestion(null)
                                                }
                                            >
                                                <FaQuestionCircle
                                                    style={{
                                                        marginRight: "10px",
                                                        color: "#007BFF",
                                                    }}
                                                />
                                                Question {questionNumber}

                                                {/* Tooltip */}
                                                {hoveredQuestion &&
                                                    hoveredQuestion ===
                                                        questionsCache[questionNumber] && (
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: "100%",
                                                                left: "10%",
                                                                backgroundColor: "#333",
                                                                color: "#fff",
                                                                padding: "10px",
                                                                borderRadius: "6px",
                                                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                                                                zIndex: 10,
                                                                fontSize: "0.9rem",
                                                                maxWidth: "300px",
                                                            }}
                                                        >
                                                            {questionsCache[questionNumber]}
                                                        </div>
                                                    )}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "12px",
                                                    fontSize: "1rem",
                                                    textAlign: "center",
                                                    color: "#555",
                                                }}
                                            >
                                                {test[questionNumber] || "No answer provided"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Print Button */}
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "30px",
                            }}
                        >
                            <button
                                onClick={() => handlePrint(test)}
                                style={{
                                    padding: "12px 30px",
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "#0056b3")
                                }
                                onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "#007BFF")
                                }
                            >
                                Print Screening Test
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p
                    style={{
                        color: "#6c757d",
                        textAlign: "center",
                        fontSize: "1.1rem",
                    }}
                >
                    No screening test details found.
                </p>
            )}
        </div>
    );
}

export default ScreeningTestDetails;