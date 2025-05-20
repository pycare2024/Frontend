// PatientSeverityTable.js
import React from "react";
import "./PatientSeverityTable.css";

const categories = [
  "Severe", "Moderate", "Mild", "Minimal",
  "Subthreshold", "No issues", "Unknown",
  "Clinically Significant", "Not Clinically Significant", "Moderately Severe"
];

const PatientSeverityTable = ({ data }) => {
  return (
    <div className="heatmap-container print-safe">
      <h2>Patient Severity Heatmap</h2>
      <table className="heatmap-table">
        <thead>
          <tr>
            <th>Patient</th>
            {categories.map((cat) => (
              <th key={cat}>{cat}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.name || patient.patient_id}</td>
              {categories.map((cat) => (
                <td
                  key={cat}
                  className={patient[cat] > 0 ? "heat-cell" : ""}
                  style={{ backgroundColor: patient[cat] > 0 ? `rgba(255,0,0,${Math.min(patient[cat]/5, 1)})` : "" }}
                >
                  {patient[cat] || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientSeverityTable;