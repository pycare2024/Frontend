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
          <h3 className="feature-title">Integrated Mental Healthcare</h3>
          <p className="feature-description">
            Access self-care tools, community support, and in-person or online therapy and psychiatry services.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon grounded-in-science"></div>
          <h3 className="feature-title">Grounded in Science</h3>
          <p className="feature-description">
            Our mental healthcare options are based on scientifically proven treatments and clinically validated approaches.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon personalized-support"></div>
          <h3 className="feature-title">Personalized Support</h3>
          <p className="feature-description">
            Our treatment plans are tailored to your unique needs, so you can get the right care at the right time.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon round-the-clock"></div>
          <h3 className="feature-title">Round the Clock Support</h3>
          <p className="feature-description">
            Our mental healthcare offerings and services can be accessed from wherever you might be, all 7 days a week.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyPsyCare;
