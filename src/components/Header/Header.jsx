import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/BookAppointment');
  };

  return (
    <div className="hero-container">
      <div className="glass-panel">
        <h1 className="hero-title">PsyCare</h1>
        <h2 className="hero-subtitle">We’re here to help</h2>
        <p className="hero-text">
          Your mind matters. As an end-to-end service provider, PsyCare helps you understand, heal, and grow through smart screening, expert care, and support that’s just a message away.
          <br />
          Just say 'Hello' to us on Whatsapp/website and we do the rest for you!
        </p>
        <button className="book-btn" onClick={handleBookClick} style={{backgroundColor:"#003384"}}>Book Now</button>
      </div>
    </div>
  );
};

export default Header;