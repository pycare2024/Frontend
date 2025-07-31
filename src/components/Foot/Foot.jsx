import React from 'react';
import './Foot.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import logo from '../PsyCare.png';

const Foot = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/BookAppointment');
  };

  return (
    <div className='footer-bg-wrapper'>
      <footer className="glass-footer">
      {/* CTA */}
      <div className="glass-cta">
        <h2>Try PsyCare Today</h2>
        <p>Connect and Heal</p>
        <button onClick={handleBookClick} className="glass-cta-button">Book Appointment</button>
      </div>

      {/* Main Footer */}
      <div className="glass-container">
        <div className="glass-column">
          <div className="logo-group">
            <img src={logo} alt="PsyCare Logo" className="footer-logo-img" />
            <span className="footer-logo-text">PsyCare</span>
          </div>
          <ul>
            {/* <li><a href="#connectivity">Get Connected</a></li> */}
            <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="glass-column">
          <h3>Resources</h3>
          <ul>
            <li><Link to="/Articles">Articles</Link></li>
            <li><a href="/#/ABC">Blogs</a></li>
          </ul>
        </div>

        <div className="glass-column">
          <h3>Company</h3>
          <ul>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/About#team">Our Team</Link></li>
            <li><Link to="/Contactus">Contact Us</Link></li>
            <li><Link to="/FAQ">FAQs</Link></li>
          </ul>
        </div>

        <div className="glass-column">
          <h3>Social</h3>
          <ul>
            <li><Link to="https://x.com/Psycare2024"><FaTwitter /> Twitter</Link></li>
            {/* <li><a href="#facebook"><FaFacebook /> Facebook</a></li> */}
            <li><a href="https://www.linkedin.com/company/psyycare/posts/?feedView=all"><FaLinkedin /> LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Foot;