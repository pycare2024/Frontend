import React from 'react';
import './Foot.css';
import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../PsyCare.png";

const Foot = () => {

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/BookAppointment'); // Replace with your route
  };

  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <p className="cta-text">Try PsyCare today.</p>
          <p className="cta-subtext">
            Connect and heal
          </p>
          <div className="cta-buttons">
            {/* <button className="cta-btn sign-up-btn">Book Appointment</button> */}
            <button className="cta-btn contact-sales-btn" onClick={handleBookClick}>Book Appointment</button>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="PsyCare Logo" className="footer-logo-img" />
              <span className="footer-logo-text">PsyCare</span>
            </div>
            <ul>
              <li><a href="#connectivity">Get Connected</a></li>
              <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
              {/* <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#iot">IoT SIM Card</a></li>
              <li><a href="#hologram-hyper">Hologram Hyper</a></li>
              <li><a href="#hologram-nova">Hologram Nova</a></li> */}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/Articles">Articles</Link></li>
              <li><a href="#support">Blogs</a></li>

            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link to="/About">About Us</Link></li>
              <li><Link to="/About">Our Team</Link></li>
              <li><Link to="/Contactus">Contact Us</Link></li>
              <li><Link to="/FAQ">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Social</h3>
            <ul>
              <li><a href="#twitter"><FaTwitter />Twitter</a></li>
              <li><a href="#facebook"><FaFacebook />Facebook</a></li>
              <li><a href="#linkedin"><FaLinkedin />LinkedIn</a></li>
              {/* <li><a href="#github"><FaGithub/> GitHub</a></li> */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;