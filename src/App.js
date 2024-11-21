import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Patients from './components/Patients';
import Doctors from './components/Doctors';
import DoctorLogin from './components/DoctorLogin';
import PatientInfo from './components/PatientInfo';
import ForgotPassword from './components/ForgotPassword';
import ForgotPwDoctor from './components/ForgotPwDoctor';
import ScreeningTestDetails from './components/ScreeningTestDetails';
import Prescription from './components/Prescription';
import Footer from './components/Footer';

import { useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDocLoggedIn, setIsDocLoggedIn] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [admin, setAdmin] = useState(null);

    const navigate = useNavigate();

    const handleLogin = (adminData) => {
        setAdmin(adminData);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setAdmin(null);
        setIsLoggedIn(false);
        setDoctor(null);
        setIsDocLoggedIn(false);
        navigate("/"); // Navigate to the home page after logout
    };

    const handleDoctorLogin = (doctorData) => {
        setDoctor(doctorData);
        setIsDocLoggedIn(true);
        navigate("/DoctorDashboard"); // Navigate to the dashboard for doctor
    };

    return (
        <div className="container-fluid full-screen">
            <Nav isLoggedIn={isLoggedIn} isDocLoggedIn={isDocLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                <Route path="/Dashboard" element={<Dashboard admin={admin} />} />
                <Route path="/DoctorDashboard" element={<DoctorDashboard doctor={doctor} />} />
                <Route path="/Patients" element={<Patients />} />
                <Route path="/Doctors" element={<Doctors />} />
                <Route path="/DoctorLogin" element={<DoctorLogin onLogin={handleDoctorLogin} />} />
                <Route path="/PatientInfo/:id" element={<PatientInfo />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/ForgotPwDoctor" element={<ForgotPwDoctor />} />
                <Route path="/PatientInfo/:id/screeningTests" element={<ScreeningTestDetails />} />
                <Route path="Prescription/:id" element={<Prescription />} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    );
}