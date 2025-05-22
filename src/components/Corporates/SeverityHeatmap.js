import React from 'react';
import './SeverityHeatmap.css';

const severityColors = {
  minimal: '#E0F7F1',
  mild: '#FFF5CC',
  moderate: '#FFE3A9',
  moderately_severe: '#FFBC8A',
  severe: '#FF8A80',
  extreme: '#D32F2F'
};

const severityLabels = [
  { level: 'Minimal', color: severityColors.minimal },
  { level: 'Mild', color: severityColors.mild },
  { level: 'Moderate', color: severityColors.moderate },
  { level: 'Moderately Severe', color: severityColors.moderately_severe },
  { level: 'Severe', color: severityColors.severe },
  { level: 'Extreme', color: severityColors.extreme }
];

const SeverityHeatmap = ({ evaluations }) => {
  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-legend">
        {severityLabels.map(({ level, color }) => (
          <div key={level} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: color }}></span>
            <span className="legend-label">{level}</span>
          </div>
        ))}
      </div>

      <div className="heatmap-grid">
        {evaluations.map((entry, index) => (
          <div
            key={index}
            className="heatmap-cell"
            style={{
              backgroundColor:
                severityColors[entry.overallSeverity?.toLowerCase()] || '#ccc'
            }}
            title={`Patient ID: ${entry.patient_id}\nSeverity: ${entry.overallSeverity}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SeverityHeatmap;