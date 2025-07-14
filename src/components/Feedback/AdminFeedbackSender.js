import React, { useState, useEffect } from 'react';
import './AdminFeedbackSender.css';

const AdminFeedbackSender = () => {
    const [formType, setFormType] = useState(null);
    const [userType, setUserType] = useState(null);
    const [corporates, setCorporates] = useState([]);
    const [selectedCorporate, setSelectedCorporate] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFormType = (type) => {
        setFormType(type);
        setUserType(null);
        setPatients([]);
        setSelectedCorporate(null);
        setSelectedPatients([]);
        setStatus(null);
    };

    const handleUserType = async (type) => {
        setUserType(type);
        setPatients([]);
        setSelectedCorporate(null);
        setSelectedPatients([]);

        if (type === 'corporate') {
            const res = await fetch('https://backend-xhl4.onrender.com/FeedbackRoute/getCorporates');
            const data = await res.json();
            setCorporates(data);
        } else {
            const res = await fetch('https://backend-xhl4.onrender.com/FeedbackRoute/getRetailPatients');
            const data = await res.json();
            setPatients(data);
        }
    };

    const handleCorporateSelect = async (id) => {
        setSelectedCorporate(id);
        const res = await fetch(`https://backend-xhl4.onrender.com/FeedbackRoute/getCorporatePatients/${id}`);
        const data = await res.json();
        setPatients(data);
    };

    const togglePatient = (patient) => {
        setSelectedPatients((prev) =>
            prev.find((p) => p._id === patient._id)
                ? prev.filter((p) => p._id !== patient._id)
                : [...prev, patient]
        );
    };

    const sendForms = async () => {
        setLoading(true);
        setStatus(null);

        const payload = {
            formType,
            patients: selectedPatients.map((p) => ({
                name: p.Name,
                phone: p.Mobile,
            })),
        };

        const res = await fetch('https://backend-xhl4.onrender.com/FeedbackRoute/sendFeedbackForms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        setLoading(false);
        setStatus(data);
    };

    return (
        <div className='feedback-sender-main'>
            <div className="feedback-sender-wrapper">
                <h1 className="feedback-sender-title">Send Feedback Form</h1>

                {!formType && (
                    <div className="feedback-button-group">
                        <button onClick={() => handleFormType('SRS')} className="feedback-button">Send SRS Form</button>
                        <button onClick={() => handleFormType('ORS')} className="feedback-button">Send ORS Form</button>
                    </div>
                )}

                {formType && !userType && (
                    <div className="feedback-button-group">
                        <button onClick={() => handleUserType('corporate')} className="feedback-button">Corporate Patients</button>
                        <button onClick={() => handleUserType('retail')} className="feedback-button">Retail Patients</button>
                    </div>
                )}

                {userType === 'corporate' && corporates.length > 0 && (
                    <div>
                        <label className="feedback-select-label">Select Corporate:</label>
                        <select onChange={(e) => handleCorporateSelect(e.target.value)} className="feedback-select">
                            <option value="">-- Choose --</option>
                            {corporates.map((corp) => (
                                <option key={corp._id} value={corp._id}>
                                    {corp.companyName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Search client by name..."
                    className="feedback-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {patients.length > 0 && (
                    <div className="feedback-patient-section">
                        <h2 className="feedback-sender-title">Select Clients to Send Form:</h2>
                        <div className="feedback-patient-list">
                            {patients
                                .filter((p) =>
                                    p.Name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((patient) => (
                                    <div key={patient._id} className="feedback-patient-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedPatients.some((p) => p._id === patient._id)}
                                            onChange={() => togglePatient(patient)}
                                        />
                                        <span>{patient.Name} ({patient.Mobile})</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: "1rem" }}>
                    <h2>Selected Clients: {selectedPatients.length}</h2>
                    {selectedPatients.length > 0 ? (
                        <button
                            onClick={sendForms}
                            className="feedback-send-button"
                        >
                            {loading ? 'Sending...' : 'Send Form'}
                        </button>
                    ) : (
                        <p>No clients selected</p>
                    )}
                </div>

                {status && (
                    <div className="feedback-status">
                        <h3 className="feedback-sender-title">Send Status:</h3>
                        <ul className="feedback-status-list">
                            {status.results.map((r, i) => (
                                <li
                                    key={i}
                                    className={r.status === 'success'
                                        ? 'feedback-status-success'
                                        : 'feedback-status-fail'}
                                >
                                    {r.phone}: {r.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFeedbackSender;