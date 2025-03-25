import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="cta-section">
        <h2 className="cta-title">Ready to improve your mental health?</h2>
        <button className="cta-button">Get Started</button>
      </div>
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-section logo-section">
          <h3 className="footer-logo">Psycare</h3>
          <p className="footer-copyright">© 2025 PsyCare</p>
        </div>

        {/* Customers Section */}
        <div className="footer-section">
          <h4 className="footer-heading">For Users</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Sign Up</a></li>
            <li><a href="#" className="footer-link">Book a Session</a></li>
            <li><a href="#" className="footer-link">Take Assessment</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Careers</a></li>
            <li><a href="#" className="footer-link">Contact Us</a></li>
          </ul>
        </div>

        {/* Further Information Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Further Information</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Terms & Conditions</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;