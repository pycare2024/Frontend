import React, { useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import "./Contact.css";

const Contactus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <section className="glass-card contact-header">
        <h1>Contact Us</h1>
        <p>Facing any query? Let us know.</p>
      </section>

      <section className="glass-card contact-card">
        <h2>
          Have a question? <span className="highlight">Talk to us.</span>
        </h2>

        <div className="contact-options">
          <div className="contact-box">
            <Mail size={36} className="icon" />
            <h4>EMAIL US AT</h4>
            <p className="contact-detail">contactus@psy-care.in</p>
            <p className="subtext">We’ll get back to you within 24 hours.</p>
          </div>

          <div className="contact-box">
            <MapPin size={36} className="icon" />
            <h4>VISIT US AT</h4>
            <p className="contact-detail">
              PsyCare<br />
              D31 Ground floor,<br />
              Uppal Southend, Sohna Road<br />
              Sector-49, Gurgaon, Haryana 122018
            </p>
          </div>

          <div className="contact-box">
            <Phone size={36} className="icon" />
            <h4>CALL US AT</h4>
            <p className="contact-detail">+91 98715 35106</p>
            <p className="subtext">Available from 10 AM to 7 PM</p>
          </div>
        </div>
      </section>

      <section className="glass-card contact-form-section">
        <div className="form-content">
          <h2>We’d love to hear from you!</h2>
          <p>Drop us a message and we’ll get back to you.</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name*" required />
          <input type="email" placeholder="Email Address*" required />
          <div className="phone-input">
            <input type="text" value="+91" className="country-code" readOnly />
            <input type="tel" placeholder="Mobile Number*" required />
          </div>
          <textarea placeholder="Your Message*" rows="4" required></textarea>
          <button type="submit">SUBMIT</button>
        </form>
      </section>
    </div>
  );
};

export default Contactus;