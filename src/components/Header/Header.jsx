import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/BookAppointment'); // Replace with your route
  };

  return (
    <div className="hero-container">
      <div className="hero-left">
        {/* <div className="logo">
          <span className="logo-bold">COOL</span>LOGO
          <div className="slogan">YOUR SLOGAN</div>
        </div> */}
        <h1 className="hero-title">PsyCare</h1>
        <h2 className="hero-subtitle">We’re here to help</h2>
        <p className="hero-text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
          dolore magna aliquam erat volutpat. Ut wisi
        </p>
        <button className="book-btn" onClick={handleBookClick}>Book Now</button>
      </div>
    </div>
  );
};

export default Header;
