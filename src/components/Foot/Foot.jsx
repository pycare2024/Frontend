import React from 'react';
import './Foot.css';
import { useNavigate } from 'react-router-dom';



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
            <h3 className="footer-logo">PsyCare</h3>
            <ul>
              <li><a href="#connectivity">Get Connected</a></li>
              {/* <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#iot">IoT SIM Card</a></li>
              <li><a href="#hologram-hyper">Hologram Hyper</a></li>
              <li><a href="#hologram-nova">Hologram Nova</a></li> */}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#using">Articles</a></li>
              <li><a href="#docs">Videos</a></li>
              <li><a href="#support">Blogs</a></li>
              
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Our Team</a></li>
              <li><a href="#partnerships">Contact Us</a></li>
              <li><a href="#careers">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Social</h3>
            <ul>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#github">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;