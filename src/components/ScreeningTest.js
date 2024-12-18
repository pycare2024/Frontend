import React, { useState, useEffect } from "react";

function ScreeningTest() {
    const [questions, setQuestions] = useState([]); // State to store questions
    const [loading, setLoading] = useState(true);   // Loading state
    const [error, setError] = useState(null);       // Error state

    // Form states for new question
    const [newQuestionEng, setNewQuestionEng] = useState("");
    const [newQuestionHin, setNewQuestionHin] = useState("");
    const [formVisible, setFormVisible] = useState(false);

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://backend-xhl4.onrender.com/ScreeningTestRoute");
                if (!response.ok) {
                    throw new Error("Failed to fetch questions.");
                }

                const data = await response.json();
                setQuestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Function to handle form submission
    const handleAddQuestion = async (e) => {
        e.preventDefault();

        const newQuestion = {
            no: questions.length + 1, // Auto-generate the question number
            eng: newQuestionEng,
            hin: newQuestionHin,
        };

        try {
            const response = await fetch("http://localhost:4000/ScreeningTestRoute/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newQuestion),
            });

            if (!response.ok) {
                throw new Error("Failed to add question.");
            }

            // Update the question list with the newly added question
            setQuestions([...questions, newQuestion]);

            // Clear input fields and hide the form
            setNewQuestionEng("");
            setNewQuestionHin("");
            setFormVisible(false);
        } catch (err) {
            setError(err.message);
        }
    };

    // Styles object for better readability and organization
    const styles = {
        container: {
            marginTop: "5%",
            padding: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: "white",
            minHeight: "100vh",
        },
        header: {
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "2.5rem",
            color: "#FF4B75",
        },
        questionList: {
            listStyle: "none",
            padding: 0,
            maxWidth: "800px",
            margin: "20px auto",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        listItem: {
            padding: "15px 20px",
            borderBottom: "1px solid #eee",
            fontSize: "1.2rem",
            color: "#555",
        },
        button: {
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        form: {
            maxWidth: "500px",
            margin: "30px auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        input: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
        },
        submitButton: {
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Screening Test Questions</h1>

            {/* Loading and error states */}
            {loading ? (
                <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#555" }}>Loading questions...</p>
            ) : error ? (
                <p style={{ textAlign: "center", color: "red", fontSize: "1.2rem" }}>{error}</p>
            ) : (
                <>
                    {/* Question List */}
                    <ul style={styles.questionList}>
                        {questions.map((item) => (
                            <li key={item.no} style={styles.listItem}>
                                <strong>{item.no}. {item.eng}</strong>
                                <p style={{ marginTop: "5px", color: "#777" }}>{item.hin}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Toggle Add Form Button */}
                    <div style={{ textAlign: "center", margin: "20px" }}>
                        <button
                            onClick={() => setFormVisible(!formVisible)}
                            style={{
                                ...styles.button,
                                ...(formVisible ? { backgroundColor: "#dc3545" } : {}),
                            }}
                        >
                            {formVisible ? "Cancel" : "Add Question"}
                        </button>
                    </div>

                    {/* Add Question Form */}
                    {formVisible && (
                        <form onSubmit={handleAddQuestion} style={styles.form}>
                            <label>
                                <strong>Question in English:</strong>
                                <input
                                    type="text"
                                    value={newQuestionEng}
                                    onChange={(e) => setNewQuestionEng(e.target.value)}
                                    style={styles.input}
                                    required
                                />
                            </label>

                            <label>
                                <strong>Question in Hindi:</strong>
                                <input
                                    type="text"
                                    value={newQuestionHin}
                                    onChange={(e) => setNewQuestionHin(e.target.value)}
                                    style={styles.input}
                                    required
                                />
                            </label>

                            <button type="submit" style={styles.submitButton}>Add Question</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}

export default ScreeningTest;