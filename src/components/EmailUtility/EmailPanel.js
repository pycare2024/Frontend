import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPaperPlane, FaFileExcel, FaFileUpload, FaEnvelopeOpenText } from "react-icons/fa";
import * as XLSX from "xlsx";
import "./EmailPanel.css";

const EmailPanel = () => {
  const [fromEmail, setFromEmail] = useState("");
  const [fromPassword, setFromPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [template, setTemplate] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelPreview, setExcelPreview] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [results, setResults] = useState([]);
  const [sending, setSending] = useState(false);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedTemplates")) || [];
    setTemplates(saved);
  }, []);

  const handleExcelChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet);
      setExcelPreview(parsed.slice(0, 5));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAttachmentsChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleSaveTemplate = () => {
    const saved = JSON.parse(localStorage.getItem("savedTemplates")) || [];
    const newTemplate = { subject, template };
    const updated = [newTemplate, ...saved.filter(t => t.subject !== subject)].slice(0, 5);
    localStorage.setItem("savedTemplates", JSON.stringify(updated));
    setTemplates(updated);
  };

  const handleSelectTemplate = (e) => {
    const selected = templates.find(t => t.subject === e.target.value);
    if (selected) {
      setSubject(selected.subject);
      setTemplate(selected.template);
    }
  };

  const handleSend = async () => {
    if (!fromEmail || !fromPassword || !subject || !template || !excelFile) {
      alert("Please fill in all required fields including sender credentials.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const recipients = XLSX.utils.sheet_to_json(sheet);

      setSending(true);
      setResults(recipients.map(r => ({ email: r.email, status: "pending", messageId: "-" })));

      for (let i = 0; i < recipients.length; i++) {
        const formData = new FormData();
        formData.append("fromEmail", fromEmail);
        formData.append("fromPassword", fromPassword);
        formData.append("subject", subject);
        formData.append("template", template);
        formData.append("recipient", JSON.stringify(recipients[i]));
        attachments.forEach((file) => formData.append("attachments", file));

        try {
          const res = await fetch("https://backend-xhl4.onrender.com/EmailRoute/send-single", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          setResults(prev =>
            prev.map((r, index) =>
              index === i ? { ...r, status: data.status, messageId: data.messageId || "-" } : r
            )
          );
        } catch (err) {
          setResults(prev =>
            prev.map((r, index) =>
              index === i ? { ...r, status: "failed", messageId: "-" } : r
            )
          );
        }
      }

      setSending(false);
      alert("Emails processed");
    };

    reader.readAsArrayBuffer(excelFile);
  };

  return (
    <div className="email-panel-container">
      <h2><FaEnvelopeOpenText /> Email Automation Panel</h2>

      <div className="form-group">
        <label>📨 From Email (PsyCare domain)</label>
        <input type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} placeholder="e.g. ceo@psy-care.in" />
      </div>

      <div className="form-group">
        <label>🔐 Email Password</label>
        <input type="password" value={fromPassword} onChange={(e) => setFromPassword(e.target.value)} placeholder="Enter email password" />
      </div>

      <div className="form-group">
        <label>📧 Subject (supports placeholders like {"{{name}}"})</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter email subject" />
      </div>

      <div className="form-group">
        <label>📝 Template</label>
        <ReactQuill value={template} onChange={setTemplate} placeholder="Use placeholders like {{name}}, {{company}}" theme="snow" />
        <button style={{ marginTop: "8px" }} onClick={handleSaveTemplate}>💾 Save Template</button>
      </div>

      {templates.length > 0 && (
        <div className="form-group">
          <label>📂 Load Saved Template</label>
          <select onChange={handleSelectTemplate} defaultValue="">
            <option value="">Select a saved template</option>
            {templates.map((t, idx) => (
              <option key={idx} value={t.subject}>{t.subject}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label><FaFileExcel /> Upload Excel File</label>
        <input type="file" accept=".xlsx,.xls" onChange={handleExcelChange} />
      </div>

      {excelPreview.length > 0 && (
        <div className="excel-preview">
          <h4>📊 Excel Preview (first 5 rows)</h4>
          <table>
            <thead>
              <tr>{Object.keys(excelPreview[0]).map((col, idx) => <th key={idx}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {excelPreview.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="form-group">
        <label><FaFileUpload /> Attachments (optional)</label>
        <input type="file" multiple onChange={handleAttachmentsChange} />
        {attachments.length > 0 && <p style={{ marginTop: 4 }}>📎 {attachments.map(a => a.name).join(", ")}</p>}
      </div>

      <button className="send-button" onClick={handleSend} disabled={sending}>
        <FaPaperPlane style={{ marginRight: 8 }} /> {sending ? "Sending..." : "Send Bulk Emails"}
      </button>

      {results.length > 0 && (
        <div className="results">
          <h3>📬 Results</h3>
          <table>
            <thead>
              <tr><th>Email</th><th>Status</th><th>Message ID</th></tr>
            </thead>
            <tbody>
              {results.map((r, index) => (
                <tr key={index} className={r.status === "sent" ? "success" : "failure"}>
                  <td>{r.email}</td>
                  <td>
                    {r.status === "sent" ? (
                      <span className="status-sent">✅ Sent</span>
                    ) : r.status === "failed" ? (
                      <span className="status-failed">❌ Failed</span>
                    ) : (
                      <span className="status-pending">⏳ Sending...</span>
                    )}
                  </td>
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