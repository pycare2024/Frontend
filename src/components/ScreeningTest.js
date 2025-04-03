//PAGE TO VIEW ALL SCREENING TEST QUESTIONS ASKED FROM PATIENT(FOR ADMIN USE ONLY)

import React, { useState, useEffect } from "react";
import "./ScreeningTest.css";

function ScreeningTest() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://backend-xhl4.onrender.com/NewScreeningTestRoute/getQuestions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="screening-container">
      <h1 className="screening-header">Screening Test Questions</h1>

      {loading ? (
        <p className="loading">Loading questions...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="screening-list">
          {questions.map((item) => (
            <li key={item.order} className="screening-item">
              <div className="section-label">{item.section} - Q{item.order}</div>
              <span className="question-text">{item.question}</span>
              <ul className="option-list">
                {item.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScreeningTest;
