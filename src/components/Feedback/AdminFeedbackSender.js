import React, { useState, useEffect } from 'react';

const AdminFeedbackSender = () => {
    const [formType, setFormType] = useState(null);
    const [userType, setUserType] = useState(null);
    const [corporates, setCorporates] = useState([]);
    const [selectedCorporate, setSelectedCorporate] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

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

    // console.log("Patients->", patients);

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

        // console.log("Payload=>",payload);

        const res = await fetch('https://backend-xhl4.onrender.com/FeedbackRoute/sendFeedbackForms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        // console.log("Status Data -> ",status);
        setLoading(false);
        setStatus(data);
    };

    useEffect(() => {
        console.log("Selected Patients:", selectedPatients);
    }, [selectedPatients]);

    useEffect(() => {
        console.log("Selected Patients (re-render trigger):", selectedPatients);
    }, [selectedPatients]);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-semibold">Send Feedback Form</h1>

            {!formType && (
                <div className="space-x-4">
                    <button onClick={() => handleFormType('SRS')} className="btn">Send SRS Form</button>
                    <button onClick={() => handleFormType('ORS')} className="btn">Send ORS Form</button>
                </div>
            )}

            {formType && !userType && (
                <div className="space-x-4">
                    <button onClick={() => handleUserType('corporate')} className="btn">Corporate Patients</button>
                    <button onClick={() => handleUserType('retail')} className="btn">Retail Patients</button>
                </div>
            )}

            {userType === 'corporate' && corporates.length > 0 && (
                <div className="mt-4">
                    <label className="block mb-2 font-medium">Select Corporate:</label>
                    <select onChange={(e) => handleCorporateSelect(e.target.value)} className="border p-2 rounded w-full">
                        <option value="">-- Choose --</option>
                        {corporates.map((corp) => (
                            <option key={corp._id} value={corp._id}>
                                {corp.companyName}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {patients.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-medium mb-2">Select Patients to Send Form:</h2>
                    <div className="max-h-64 overflow-y-auto border p-2 rounded">
                        {patients.map((patient) => (
                            <div key={patient._id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedPatients.some((p) => p._id === patient._id)}
                                    onChange={() => togglePatient(patient)}
                                    className="mr-2"
                                />
                                <span>{patient.Name} ({patient.Mobile})</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h2>Debug Selected Patients: {selectedPatients.length}</h2>
                {selectedPatients.length > 0 ? (
                    <div>
                        <button
                            onClick={sendForms}
                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                            {loading ? 'Sending...' : 'Send Form'}
                        </button>
                    </div>
                ) : (
                    <p>No patients selected</p>
                )}
            </div>

            {status && (
                <div className="mt-4">
                    <h3 className="font-semibold text-lg">Send Status:</h3>
                    <ul className="list-disc pl-5">
                        {status.results.map((r, i) => (
                            <li key={i} className={r.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                                {r.phone}: {r.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminFeedbackSender;