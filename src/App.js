import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
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
// import Footer from "./components/Footer/Footer";
import FAQ from './components/FAQ';
import ScreeningTest from './components/ScreeningTest';
import StartScreeningTest from './components/StartScreeningTest';
import ScreenTestForm from './components/ScreenTestForm';
import DoctorSchedule from './components/DoctorsSchedule';
import ModifyDoctorSchedule from './components/ModifyDoctorSchedule';
import AppointmentDetails from './components/AppointmentDetails';
import GeminiApi from './components/GeminiApi';
import Appointments from './components/Appointments';
import Contactus from "./components/Contactus/Contactus";
import AddOperator from './components/AddOperator';
import OperatorDetails from './components/OperatorDetails';
import OperatorLogin from './components/OperatorLogin';
import About from "./components/About/About";
import BookAppointment from './components/BookAppointment';
import DoctorProfile from "./components/DoctorProfile";
import AppointmentsTab from './components/AppointmentTab';
import AccountsTab from './components/AccountsTab';
import CompanyAccountsTab from './components/CompanyAccountsTab';
import RegisterPatient from './components/RegisterPatient';
import Landing from "./components/Landing/Landing";
import IndividualTherapy from './components/IndividualTherapy';
import CorporateWellness from './components/CorporateWellness';
import Articles from './components/Articles';
import ABC from "./components/ABC/ABC";
import PrivacyPolicy from './components/PrivacyPolicy';
import RegisterCorporate from './components/Corporates/RegisterCorporate';
import RegisterCorporateEmployee from './components/Corporates/RegisterCorporateEmployee';
import RegisterFamilyMember from './components/Corporates/RegisterFamilyMember';
import RechargeCredits from './components/Corporates/RechargeCredits';
import EmailPanel from './components/EmailUtility/EmailPanel';
import CorporateScreeningSummary from './components/Corporates/CorporateScreeningSummary';
import DemographicInsights from './components/Corporates/DemographicInsights';
import ClinicalImpactReport from './components/Corporates/ClinicalImpactReport';
import FeedbackPage from './components/Feedback/FeedbackPage';
import ORSFeedback from './components/Feedback/ORSFeedback';
import AdminFeedbackSender from './components/Feedback/AdminFeedbackSender';
import Intropage from './components/Intropage/Intropage';
import Marketplace from './components/Marketplace/Marketplace';
import DoctorBookingPage from './components/Marketplace/DoctorBookingPage';
import DoctorOwnSchedule from './components/DoctorOwnSchedule';
import MarketPlaceIntro from './components/Marketplace/MarketPlaceIntro';
import PsyCareForSchoolsIntro from './components/Schools/PsyCareForSchoolsIntro';
import StartMyJourney from './components/Schools/StartMyJourney';
import CorporateBooking from './components/Corporates/CorporateBooking';
import CorporateFullReport from './components/Corporates/CorporateFullReport';


import { useState, useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDocLoggedIn, setIsDocLoggedIn] = useState(false);
    const [isOperatorLoggedIn, setIsOperatorLoggedIn] = useState(localStorage.getItem("operator") ? true : false);

    const [doctor, setDoctor] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [operator, setOperator] = useState(JSON.parse(localStorage.getItem("operator")) || null);
    const [paddingTop, setPaddingTop] = useState("70px");

    const navigate = useNavigate();

    useEffect(() => {
        const updatePadding = () => {
          setPaddingTop(window.innerWidth < 1440 ? "70px" : "0px");
        };
      
        updatePadding(); // initial call
        window.addEventListener("resize", updatePadding);
      
        return () => window.removeEventListener("resize", updatePadding);
      }, []);

    useEffect(() => {
        setIsOperatorLoggedIn(!!operator);
    }, [operator]);

    const handleLogin = (adminData) => {
        setAdmin(adminData);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setAdmin(null);
        setIsLoggedIn(false);
        setDoctor(null);
        setIsDocLoggedIn(false);
        setOperator(null);
        setIsOperatorLoggedIn(false);
        localStorage.removeItem("operator");
        navigate("/"); // Navigate to the home page after logout
    };

    const handleDoctorLogin = (doctorData) => {
        setDoctor(doctorData);
        setIsDocLoggedIn(true);
        navigate("/DoctorDashboard"); // Navigate to the dashboard for doctor
    };

    const handleOperatorLogin = (operatorData) => {
        setOperator(operatorData);
        setIsOperatorLoggedIn(true);
        localStorage.setItem("operator", JSON.stringify(operatorData));
        navigate("/"); // Redirect operator to the home page
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?36544";
        script.async = true;
        script.onload = () => {
          if (window.CreateWhatsappChatWidget) {
            window.CreateWhatsappChatWidget({
              enabled: true,
              chatButtonSetting: {
                backgroundColor: "#00e785",
                ctaText: "Chat with us",
                borderRadius: "25",
                marginLeft: "0",
                marginRight: "20",
                marginBottom: "20",
                ctaIconWATI: false,
                position: "right",
              },
              brandSetting: {
                brandName: "PsyCare",
                brandSubTitle: "undefined",
                brandImg: "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
                welcomeText: "",
                messageText: "Hi",
                backgroundColor: "#00e785",
                ctaText: "Chat with us",
                borderRadius: "25",
                autoShow: false,
                phoneNumber: "919818296388"
              },
            });
          }
        };
        document.body.appendChild(script);
      }, []);
      
    return (
        <>
         <Nav
            isLoggedIn={isLoggedIn}
            isDocLoggedIn={isDocLoggedIn}
            isOperatorLoggedIn={isOperatorLoggedIn}
            onLogout={handleLogout}
        />
        <div className="container-fluid full-screen" style={{ paddingTop }}>
            <Nav isLoggedIn={isLoggedIn} isDocLoggedIn={isDocLoggedIn} isOperatorLoggedIn={isOperatorLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
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
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/ScreeningTest" element={<ScreeningTest />} />
                <Route path="/StartScreeningTest" element={<StartScreeningTest />} />
                <Route path="/ScreenTestForm" element={<ScreenTestForm />} />
                <Route path="/DoctorSchedule" element={<DoctorSchedule />} />
                <Route path="/ModifyDoctorSchedule" element={<ModifyDoctorSchedule />} />
                <Route path="/PatientInfo/:id/AppointmentDetails" element={<AppointmentDetails />} />
                <Route path="/GeminiApi" element={<GeminiApi />} />
                <Route path="/Appointments" element={<Appointments />} />
                <Route path="/Contactus" element={<Contactus />} />
                <Route path="/AddOperator" element={<AddOperator />} />
                <Route path="/OperatorDetails" element={<OperatorDetails />} />
                <Route path="/OperatorLogin" element={<OperatorLogin onLogin={handleOperatorLogin} />} />
                <Route path="/About" element={<About />} />
                <Route path="/BookAppointment" element={<BookAppointment />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="/AppointmentsTab" element={<AppointmentsTab />} />
                <Route path="/AccountsTab" element={<AccountsTab />} />
                <Route path="/CompanyAccountsTab" element={<CompanyAccountsTab />} />
                <Route path="/RegisterPatient" element={<RegisterPatient />} />
                <Route path="/Landing" element={<Landing />} />
                <Route path="/IndividualTherapy" element={<IndividualTherapy />} />
                <Route path="/CorporateWellness" element={<CorporateWellness />} />
                <Route path="/Articles" element={<Articles />} />
                <Route path="/ABC" element={<ABC />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/RegisterCorporate" element={<RegisterCorporate />} />
                <Route path="/RegisterCorporateEmployee" element={<RegisterCorporateEmployee />} />
                <Route path="/RegisterFamilyMember" element={<RegisterFamilyMember />} />
                <Route path="/RechargeCredits" element={<RechargeCredits />} />
                <Route path="/EmailPanel" element={<EmailPanel />} />
                <Route path="/CorporateScreeningSummary" element={<CorporateScreeningSummary />} />
                <Route path="/DemographicInsights" element={<DemographicInsights />} />
                <Route path="/ClinicalImpactReport" element={<ClinicalImpactReport />} />
                <Route path="/FeedbackPage" element={<FeedbackPage />} />
                <Route path="/ORSFeedback" element={<ORSFeedback />} />
                <Route path="/AdminFeedbackSender" element={<AdminFeedbackSender />} />
                <Route path="/Intropage" element={<Intropage />} />
                <Route path="/Marketplace" element={<Marketplace />} />
                <Route path="/marketplace/:doctorId" element={<DoctorBookingPage />} />
                <Route path="/DoctorOwnSchedule" element={<DoctorOwnSchedule />} />
                <Route path="/marketplacemain" element={<MarketPlaceIntro />} />
                <Route path="/School" element={<PsyCareForSchoolsIntro />} />
                <Route path="/Startschooljourney" element={<StartMyJourney />} />
                <Route path="/CorporateBooking" element={<CorporateBooking />} />
                <Route path="/CorporateFullReport" element={<CorporateFullReport />} />
            </Routes>
            {/* <Footer/> */}
        </div>
        </>
    );
}

export default function AppWrapper() {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    );
}