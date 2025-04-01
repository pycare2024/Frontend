import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import "./Contact.css";

const Contactus = () => {
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
              Uppal southend, sohna road<br />
              sector-29 , Gurgaon HARYANA 122018
            </p>
            <p className="subtext">Drop in between 10 AM - 8 PM on any weekday !</p>
          </div>

          <div className="contact-box">
            <Phone size={40} className="icon" />
            <h4>CALL US AT</h4>
            <p className="contact-detail">+91 98182 96388</p>
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

