import React from 'react';
import './CorporateWellness.css';
import { useNavigate } from 'react-router-dom';
import corporateImage from './corporate-wellness.jpg';

const CorporateWellness = () => {
  const navigate = useNavigate();

  return (
    <div className="corporate-wellness-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Corporate Wellness Programs: Empowering Minds at Work</h1>
        <p>
          A mentally healthy workforce drives success. PsyCare offers evidence-based wellness
          solutions tailored to your organization’s goals.
        </p>
        <button onClick={() => navigate('/Contactus')}>Partner With Us</button>
      </section>

      {/* Psychological Support & Counseling */}
      <section className="why-wellness">
        <h2>Why Psychological Support Is Crucial</h2>
        <p>
          Psychological well-being is the foundation of long-term performance. Our counseling
          services help employees manage work-related stress, build emotional resilience,
          and remain focused and engaged at work.
        </p>
      </section>

      {/* Services Offered */}
      <section className="wellness-services">
        <h2>Comprehensive Corporate Services</h2>
        <ul>
          <li><strong>Employee Counseling</strong> – Handle stress, anxiety, and personal challenges.</li>
          <li><strong>Mental Health Workshops</strong> – Build awareness and teach coping strategies.</li>
          <li><strong>Leadership Coaching</strong> – Equip managers to support team wellness.</li>
          <li><strong>Burnout Prevention Plans</strong> – Early intervention through regular check-ins.</li>
          <li><strong>Custom Wellness Roadmaps</strong> – Tailored to your company’s needs and culture.</li>
        </ul>
      </section>

      {/* Why It Matters */}
      <section className="benefits">
        <h2>Impact on Organizational Growth</h2>
        <ol>
          <li>Lower absenteeism and burnout</li>
          <li>Boost in morale and retention rates</li>
          <li>Greater employee engagement and collaboration</li>
          <li>Better work-life balance and job satisfaction</li>
          <li>Enhanced company reputation and culture</li>
        </ol>
      </section>

      {/* Mental Health Culture */}
      <section className="why-wellness">
        <h2>Creating a Culture of Mental Wellness</h2>
        <p>
          Organizations that prioritize mental health cultivate loyal, motivated, and productive
          teams. We help you:
        </p>
        <ul>
          <li>Promote open conversations around mental health</li>
          <li>Train leaders to support psychological safety</li>
          <li>Establish feedback systems for continuous wellness improvement</li>
        </ul>
      </section>

      {/* Future-Ready Support */}
      <section className="why-wellness">
        <h2>The Future of Workplace Wellbeing</h2>
        <p>
          Our hybrid wellness programs integrate traditional and digital mental health care —
          offering flexibility, accessibility, and ongoing employee support.
        </p>
        <ul>
          <li>On-demand virtual therapy and workshops</li>
          <li>Proactive wellness check-ins and preventive care</li>
          <li>Custom dashboards to track progress</li>
        </ul>
      </section>

      {/* Final CTA */}
      <section className="cta" style={{
        backgroundImage: `url(${corporateImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundSize: 'contain'
      }}>
        <h2>Invest in a Thriving Workplace</h2>
        <p>
          Let PsyCare help you design a workplace where well-being is a priority —
          and performance follows.
        </p>
        <button onClick={() => navigate('/Contactus')}>Talk to Our Team</button>
      </section>
    </div>
  );
};

export default CorporateWellness;