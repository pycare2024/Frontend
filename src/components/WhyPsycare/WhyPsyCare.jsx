import React from 'react';
import './WhyPsyCare.css'

const WhyPsyCare = () => {

  return (
    <div className="care">
      <div className="header-section2">
        <h1 className="headline2">Why PsyCare?</h1>
        <p className="subheadline2">
          Our platform is built by psychologists, therapists, and mental health experts with immense global experience.
        </p>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <div className="icon integrated-mental-health"></div>
          <h3 className="feature-title">End-to-End Service</h3>
          <p className="feature-description">
          Once you reach out to us, our experts guide you through every step of your mental health journey. Whether you need medical intervention, therapeutic sessions, or a combination of both, we help you determine the best course of action and duration tailored to your needs.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon grounded-in-science"></div>
          <h3 className="feature-title">Technology-Driven Convenience</h3>
          <p className="feature-description">
          PsyCare uses advanced technology to make mental health support accessible. From virtual consultations to personalized care plans, we ensure help is just a click away, eliminating the need for in-person visits.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon personalized-support"></div>
          <h3 className="feature-title">Compassionate and Professional Support</h3>
          <p className="feature-description">
          Our certified mental health professionals provide personalized care with empathy and confidentiality. We ensure you feel safe and supported throughout your journey to wellness.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon round-the-clock"></div>
          <h3 className="feature-title">Socially Responsible Mission</h3>
          <p className="feature-description">
          While a for-profit organization, PsyCare’s primary goal is to create a positive social impact. We strive to improve mental well-being and help individuals reintegrate into society.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyPsyCare;
