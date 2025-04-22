import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./EmailPanel.css";

const EmailPanel = () => {
    const [subject, setSubject] = useState("");
    const [template, setTemplate] = useState("");
    const [excelFile, setExcelFile] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [results, setResults] = useState([]);
    const [sending, setSending] = useState(false);

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleExcelChange = (e) => {
        setExcelFile(e.target.files[0]);
    };

    const handleSend = async () => {
        if (!subject || !template || !excelFile) {
            alert("Please provide subject, template, and an Excel file.");
            return;
        }

        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("template", template);
        formData.append("excelFile", excelFile);
        if (attachment) {
            formData.append("attachment", attachment);
        }

        setSending(true);
        setResults([]);

        try {
            const response = await fetch("https://backend-xhl4.onrender.com/EmailRoute/send-bulk", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setSending(false);
            if (data.results) {
                setResults(data.results);
            }
            alert(data.message || "Emails sent!");
        } catch (err) {
            console.error("Error sending email:", err);
            alert("Failed to send emails.");
            setSending(false);
        }
    };

    return (
        <div className="email-panel-container">
            <h2>Email Automation Panel</h2>

            <label>Subject</label>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
            />

            <label>Template (Rich Editor)</label>
            <ReactQuill
                theme="snow"
                value={template}
                onChange={setTemplate}
                placeholder="Write your email here with {{placeholders}}"
            />

            <label>Upload Excel File</label>
            <input type="file" accept=".xlsx,.xls" onChange={handleExcelChange} />

            <label>Attachment (optional)</label>
            <input type="file" onChange={handleAttachmentChange} />

            <button onClick={handleSend} disabled={sending}>
                {sending ? "Sending..." : "Send Bulk Emails"}
            </button>

            {results.length > 0 && (
                <div className="results">
                    <h3>Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Message ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, index) => (
                                <tr key={index}>
                                    <td>{r.email}</td>
                                    <td>{r.status}</td>
                                    <td>{r.messageId || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmailPanel;
