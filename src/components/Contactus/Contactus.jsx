import React from "react";
import { useEffect } from 'react';
import { Mail, MapPin, Phone } from "lucide-react";
import "./Contact.css";

const Contactus = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top of page on mount
  }, []);
  
  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1 style={{color:"white"}}>Contact Us</h1>
        <p style={{color:"white"}}>
          {/* Do you have any concerns or questions you would like to address?
          Our client care team is happy to help you. */}
          Facing any queary! Let Us Know<br/>
          
        </p>
      </section>

      <section className="contact-card">
        <h2>
          Have a question? <span className="highlight">Talk to us.</span>
        </h2>

        <div className="contact-options">
          <div className="contact-box">
            <Mail size={40} className="icon" />
            <h4>EMAIL US AT</h4>
            <p className="contact-detail">contactus@psy-care.in</p>
            <p className="subtext">and we’ll get back to you within 24 hours</p>
          </div>

          <div className="contact-box">
            <MapPin size={40} className="icon" />
            <h4>VISIT US AT</h4>
            <p className="contact-detail">
              PsyCare<br />
              D31 Ground floor,<br />
              Uppal Southend, Sohna road<br />
              Sector-49 , Gurgaon Haryana 122018
            </p>
          </div>

          <div className="contact-box">
            <Phone size={40} className="icon" />
            <h4>CALL US AT</h4>
            <p className="contact-detail">+91 98715 35106</p>
            <p className="subtext">between 10 AM to 7 PM</p>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="form-content">
          <h2>We’d love to hear from you!</h2>
          <p>Drop us a message by filling this form and we’ll get back to you.</p>
        </div>

        <form className="contact-form">
          <input  type="text" placeholder="Your Name*" required />
          <input type="email" placeholder="Email Address*" required />
          <div className="phone-input">
            <input type="text" value="+91" className="country-code" readOnly />
            <input type="tel" placeholder="Mobile Number*" required />
          </div>
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">SUBMIT</button>
        </form>
      </section>
    </div>
  );
};

export default Contactus;

