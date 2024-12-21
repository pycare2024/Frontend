import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ScreenTestForm() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [patientId, setPatientId] = useState(null);  // State to store patient ID
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { patientId } = location.state || {};  // Access patientId passed from previous page
        if (patientId) {
            setPatientId(patientId);
        }
    }, [location]);

    // Fetch all the questions on component mount
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://backend-xhl4.onrender.com/screeningTestRoute/");
                const data = await response.json();
                setQuestions(data);
                setAnswers(new Array(data.length).fill(null));  // Initialize answers array
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Handle answer selection (Yes or No)
    const handleAnswerChange = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/screeningTestRoute/addScreenTestData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patient_id: patientId, answers })
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Screening test saved successfully:", result);
                navigate("/thank-you");  // Redirect after submission
            } else {
                alert("Error submitting answers");
            }
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    return (
        <div style={{ height: "100vh", marginTop: "6%" }}>
            <h1>Screening Test</h1>
            {questions.length > 0 ? (
                <form>
                    <div>
                        {questions.map((question, index) => (
                            <div key={question.no} className="question-item">
                                <h3>{`${question.no}. ${question.eng}`}</h3>
                                <div className="options">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.no}`}
                                            value="Yes"
                                            checked={answers[index] === "Yes"}
                                            onChange={() => handleAnswerChange(index, "Yes")}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.no}`}
                                            value="No"
                                            checked={answers[index] === "No"}
                                            onChange={() => handleAnswerChange(index, "No")}
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                </form>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
}

export default ScreenTestForm;