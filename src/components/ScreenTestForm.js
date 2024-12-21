import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScreenTestForm.css"; // Import the CSS file for custom styles

function ScreenTestForm() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [patientId, setPatientId] = useState(null); // State to store patient ID
    const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
    const [language, setLanguage] = useState(null); // Store selected language
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { patientId } = location.state || {}; // Access patientId passed from previous page
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
                setAnswers(new Array(data.length).fill(null)); // Initialize answers array
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

    // Check if the form is completely filled before submitting
    const isFormComplete = answers.every((answer) => answer !== null);

    // Handle form submission
    const handleSubmit = async () => {
        if (!isFormComplete) {
            alert("Please answer all the questions before submitting.");
            return;
        }

        if (!patientId) {
            alert("Patient ID is missing.");
            return;
        }

        setIsSubmitting(true); // Set submitting state to true
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/screeningTestRoute/addScreenTestData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patient_id: patientId, answers })
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Screening test saved successfully:", result);
                navigate("/thank-you"); // Redirect after submission
            } else {
                alert("Error submitting answers");
            }
        } catch (error) {
            console.error("Error submitting answers:", error);
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    // Function to display language selection
    const handleLanguageSelection = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    return (
        <div className="screen-test-form-container">
            <h1 className="screen-test-title">Screening Test</h1>

            {/* Language selection step */}
            {!language ? (
                <div className="language-selection-container">
                    <h2 className="language-selection-title">Select Your Preferred Language</h2>
                    <div className="language-buttons">
                        <button
                            onClick={() => handleLanguageSelection("english")}
                            className="language-button english-button"
                        >
                            English
                        </button>
                        <button
                            onClick={() => handleLanguageSelection("hindi")}
                            className="language-button hindi-button"
                        >
                            हिंदी
                        </button>
                    </div>
                </div>
            ) : (
                // Display questions after language is selected
                <form className="screen-test-form">
                    <div className="questions-container">
                        {questions.map((question, index) => (
                            <div key={question.no} className="question-item">
                                <h3 className="question-text">
                                    {`${question.no}. `}
                                    {language === "english" ? question.eng : question.hin}
                                </h3>
                                <div className="options">
                                    <label className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${question.no}`}
                                            value="Yes"
                                            checked={answers[index] === "Yes"}
                                            onChange={() => handleAnswerChange(index, "Yes")}
                                            className="radio-input"
                                            disabled={isSubmitting} // Disable radio buttons during submission
                                        />
                                        Yes
                                    </label>
                                    <label className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${question.no}`}
                                            value="No"
                                            checked={answers[index] === "No"}
                                            onChange={() => handleAnswerChange(index, "No")}
                                            className="radio-input"
                                            disabled={isSubmitting} // Disable radio buttons during submission
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="submit-button"
                        disabled={isSubmitting || !isFormComplete} // Disable button if not ready
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default ScreenTestForm;