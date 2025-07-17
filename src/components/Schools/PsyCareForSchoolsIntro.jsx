import React from 'react';
import './PsyCareForSchoolsIntro.css';

function PsyCareSchoolsIntro() {
  return (
    <div className="schoolGlass_bgWrapper">
      <div className="schoolGlass_glassCard fadeInUp">
        <h1 className="schoolGlass_heading">Welcome to PsyCare for Schools</h1>
        <p className="schoolGlass_tagline">
          Building emotionally resilient students through professional mental health care.
        </p>

        <section className="schoolGlass_section slideInLeft">
          <h2>🌟 Why Choose PsyCare?</h2>
          <ul>
            <li>🧠 Mental wellness programs tailored for students</li>
            <li>📊 Screening, assessments & reports for stakeholders</li>
            <li>👨‍🏫 Sensitization for teachers & parents</li>
            <li>🗣️ On-demand counseling & therapy</li>
          </ul>
        </section>

        <section className="schoolGlass_section slideInRight">
          <h2>🎓 What We Offer</h2>
          <ul>
            <li>📋 1:1 student counseling</li>
            <li>👥 Group sessions for common concerns</li>
            <li>🎯 Career guidance & aptitude tests</li>
            <li>📈 Data reports for schools</li>
          </ul>
        </section>

        <div className="schoolGlass_cta bounceIn">
          <p>Let’s make mental wellness a priority in your school.</p>
          <button className="schoolGlass_button">Request a Demo</button>
        </div>
      </div>
    </div>
  );
}

export default PsyCareSchoolsIntro;