import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GeminiApi() {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [testReport, setTestReport] = useState("");

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        if (!query) {
            toast.error("Please enter a question.");
            return;
        }
        
        setLoading(true);
        setResponse("Thinking...");
        
        try {
            const res = await fetch("https://backend-xhl4.onrender.com/GeminiRoute/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: query })
            });
            
            const data = await res.json();
            setResponse(data.response || "No response received.");
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Error fetching response.");
        }
        
        setLoading(false);
    };

    const generateTestReport = async () => {
        setLoading(true);
        setTestReport("Generating test report...");
        
        try {
            const res = await fetch("https://backend-xhl4.onrender.com/GeminiRoute/generateReport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    depression: 0,
                    anxiety: 0,
                    ocd: 40,
                    ptsd: 0,
                    sleep: 28
                })
            });
            
            const data = await res.json();
            setTestReport(data.report || "No report generated.");
        } catch (error) {
            console.error("Error generating report:", error);
            setTestReport("Error generating report.");
        }
        
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Test Gemini API</h2>
            <input
                type="text"
                placeholder="Ask Gemini AI..."
                value={query}
                onChange={handleSearchChange}
                style={{
                    width: "50%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem"
                }}
            />
            <button onClick={handleSearchSubmit} style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}>
                Ask
            </button>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{loading ? "Loading..." : response}</p>
            
            <h2>Generate Test Report</h2>
            <button onClick={generateTestReport} style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}>
                Generate Report
            </button>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{loading ? "Generating..." : testReport}</p>
            
            <ToastContainer />
        </div>
    );
}

export default GeminiApi;