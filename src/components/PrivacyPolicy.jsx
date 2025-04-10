import React, { useEffect } from "react";
import "./PrivacyPolicy.css";
import logo from "./PsyCare.png";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <div className="privacy-policy-wrapper">
            <div className="privacy-header">
                <img src={logo} alt="PsyCare Logo" className="privacy-logo" />
                <h1 className="privacy-title">Privacy Policy</h1>
                <p className="effective-date">Effective Date: April 2025</p>
            </div>

            {/* Table of Contents */}
            <div className="toc">
                <strong>Contents</strong>
                <p onClick={() => document.getElementById('definitions').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    1. Definitions
                </p>
                <p onClick={() => document.getElementById('data-collection').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    2. Information We Collect
                </p>
                <p onClick={() => document.getElementById('usage').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    3. How We Use Your Data
                </p>
                <p onClick={() => document.getElementById('storage').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    4. Data Storage & Security
                </p>
                <p onClick={() => document.getElementById('sharing').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    5. Data Sharing
                </p>
                <p onClick={() => document.getElementById('rights').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    6. User Rights
                </p>
                <p onClick={() => document.getElementById('compliance').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    7. Legal Compliance
                </p>
                <p onClick={() => document.getElementById('cookies').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    8. Cookies & Analytics
                </p>
                <p onClick={() => document.getElementById('links').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    9. Links to Other Sites
                </p>
                <p onClick={() => document.getElementById('changes').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    10. Changes to This Policy
                </p>
                <p onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} style={{ color: "#4285F4", cursor: "pointer" }}>
                    11. Contact Us
                </p>
            </div>

            <div className="privacy-content">
                <p>
                    At PsyCare, your privacy is our priority. We are committed to maintaining the confidentiality,
                    integrity, and security of your personal and health information. This Privacy Policy outlines how we
                    collect, use, store, and safeguard your data when you access our services through our website,
                    WhatsApp chatbot, or any associated platforms.
                </p>
                <div className="privacy-divider"></div>

                <h2 id="definitions">1. Definitions</h2>
                <p>
                    <strong>"PsyCare"</strong> / <strong>"we"</strong> / <strong>"our"</strong> refers to our organization and service. <br />
                    <strong>"User"</strong> / <strong>"you"</strong> means any individual accessing PsyCare’s services. <br />
                    <strong>"Platform"</strong> includes the PsyCare website, chatbot, appointment forms, and other digital mediums.
                </p>
                <div className="privacy-divider"></div>

                <h2 id="data-collection">2. Information We Collect</h2>
                <ul>
                    <li>Full name</li>
                    <li>Age</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Location (City)</li>
                    <li>Health and wellness details</li>
                </ul>
                <p>This data may be collected through:</p>
                <ul>
                    <li>WhatsApp chatbot conversations</li>
                    <li>Appointment booking forms on our platform</li>
                </ul>
                <div className="privacy-divider"></div>

                <h2 id="usage">3. How We Use Your Data</h2>
                <ul>
                    <li>To schedule and manage appointments</li>
                    <li>To personalize services and enhance your experience</li>
                    <li>To perform analytics for service improvement</li>
                    <li>To notify you about important updates</li>
                </ul>
                <div className="privacy-divider"></div>

                <h2 id="storage">4. Data Storage & Security</h2>
                <ul>
                    <li>Your data is securely stored in encrypted MongoDB databases</li>
                    <li>We use firewalls, secure login, and role-based access</li>
                    <li>Chatbot conversations are not recorded or stored</li>
                </ul>
                <div className="privacy-divider"></div>

                <h2 id="sharing">5. Data Sharing</h2>
                <ul>
                    <li>We do not sell, rent, or share your data with third parties</li>
                    <li>Only authorized PsyCare professionals can access your data</li>
                </ul>
                <div className="privacy-divider"></div>

                <h2 id="rights">6. User Rights</h2>
                <ul>
                    <li>You may request access or correction to your personal data</li>
                    <li>You may request deletion by emailing us at <a href="mailto:contactus@psy-care.in">support@psy-care.in</a></li>
                </ul>
                <div className="privacy-divider"></div>

                <h2 id="compliance">7. Legal Compliance</h2>
                <p>We are aligning our practices with regulations including:</p>
                <ul>
                    <li>HIPAA (U.S.)</li>
                    <li>GDPR (Europe)</li>
                    <li>India’s DPDP Act</li>
                </ul>
                <div className="privacy-divider"></div>

                <h2 id="cookies">8. Cookies & Analytics</h2>
                <p>
                    We may use cookies to enhance performance and user experience. These can be disabled via your browser settings.
                </p>
                <div className="privacy-divider"></div>

                <h2 id="links">9. Links to Other Sites</h2>
                <p>
                    PsyCare may link to external websites. We are not responsible for the privacy practices of these third-party sites.
                </p>
                <div className="privacy-divider"></div>

                <h2 id="changes">10. Changes to This Policy</h2>
                <p>
                    This policy may be updated periodically. Significant changes will be communicated on our website.
                </p>
                <div className="privacy-divider"></div>

                <h2 id="contact">11. Contact Us</h2>
                <p>
                    For questions, requests, or complaints<br />
                    <div className="note-box">
                        You can contact our <a href="/Contactus">Grievance Officer</a> at
                    </div>
                    <a href="mailto:support@psy-care.in">contactus@psy-care.in</a><br />
                    PsyCare Health Technologies Pvt. Ltd.
                </p>
                <div className="privacy-divider"></div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;