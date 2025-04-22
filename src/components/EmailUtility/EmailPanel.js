import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPaperPlane, FaFileExcel, FaFileUpload, FaEnvelopeOpenText } from "react-icons/fa";
import "./EmailPanel.css";

const EmailPanel = () => {
  const [subject, setSubject] = useState("");
  const [template, setTemplate] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [results, setResults] = useState([]);
  const [sending, setSending] = useState(false);

  const handleExcelChange = (e) => setExcelFile(e.target.files[0]);
  const handleAttachmentsChange = (e) => setAttachments(Array.from(e.target.files));

  const handleSend = async () => {
    if (!subject || !template || !excelFile) {
      alert("Please provide subject, template, and an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("template", template);
    formData.append("excelFile", excelFile);
    attachments.forEach((file) => formData.append("attachments", file));

    setSending(true);
    setResults([]);

    try {
      const response = await fetch("https://backend-xhl4.onrender.com/EmailRoute/send-bulk", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSending(false);
      if (data.results) setResults(data.results);
      alert(data.message || "Emails processed");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send emails.");
      setSending(false);
    }
  };

  return (
    <div className="email-panel-container">
      <h2><FaEnvelopeOpenText /> Email Automation Panel</h2>

      <div className="form-group">
        <label>📧 Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>

      <div className="form-group">
        <label>📝 Template</label>
        <ReactQuill
          value={template}
          onChange={setTemplate}
          placeholder="Write your email template with placeholders like {{name}}"
          theme="snow"
        />
      </div>

      <div className="form-group">
        <label><FaFileExcel /> Upload Excel File</label>
        <input type="file" accept=".xlsx,.xls" onChange={handleExcelChange} />
      </div>

      <div className="form-group">
        <label><FaFileUpload /> Attachments (optional)</label>
        <input type="file" multiple onChange={handleAttachmentsChange} />
      </div>

      <button className="send-button" onClick={handleSend} disabled={sending}>
        <FaPaperPlane style={{ marginRight: 8 }} /> {sending ? "Sending..." : "Send Bulk Emails"}
      </button>

      {results.length > 0 && (
        <div className="results">
          <h3>📬 Results</h3>
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
                <tr key={index} className={r.status === "sent" ? "success" : "failure"}>
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