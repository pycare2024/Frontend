import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PsyCareForSchoolsIntro.css';

function PsyCareSchoolsIntro() {

  const navigate = useNavigate();

   const handleStartJourney = () => {
    navigate('/Startschooljourney'); // 👈 your target route
  };
  return (
    <div className="schoolGlass_bgWrapper">
      <div className="schoolGlass_glassCard fadeInUp">
        <h1 className="schoolGlass_heading">Empowering Young Minds: PsyCare for Schools</h1>
        <p className="schoolGlass_tagline">
          A professional, tech-enabled mental wellness program tailored specifically for school ecosystems.
        </p>

        <section className="schoolGlass_section slideInLeft">
          <h2>🧠 Our Vision for Student Mental Health</h2>
          <p>
            At PsyCare, we believe every student deserves to grow emotionally strong and mentally prepared. Our mission is to integrate mental health into the core fabric of education.
          </p>
          <ul>
            <li>🧑‍⚕️ Expert-led counseling & therapy for students</li>
            <li>🏫 Whole-school wellness model involving teachers & parents</li>
            <li>📈 Transparent mental health reporting & insights</li>
            <li>🎓 Structured assessments to identify risk early</li>
          </ul>
        </section>

        <section className="schoolGlass_section slideInRight">
          <h2>🔍 The PsyCare Screening Protocol</h2>
          <p>
            Before any student begins therapy or counseling, we conduct a digital screening test using standardized mental health assessments. This helps us:
          </p>
          <ul>
            <li>✅ Identify signs of anxiety, depression, insomnia & trauma</li>
            <li>📊 Generate personalized mental health scores & reports</li>
            <li>🧭 Match students with appropriate interventions</li>
            <li>📝 Share actionable insights with school authorities (with consent)</li>
          </ul>
        </section>

        <section className="schoolGlass_section slideInLeft">
          <h2>🎯 Key Offerings Tailored for Students</h2>
          <ul>
            <li>👩‍⚕️ 1:1 confidential student counseling (virtual/in-school)</li>
            <li>👫 Group therapy on common school-related stressors</li>
            <li>🧭 Career counseling with psychometric tests</li>
            <li>📂 Academic stress & exam anxiety sessions</li>
            <li>🎯 Anger, bullying, peer pressure & social skills support</li>
          </ul>
        </section>

        <section className="schoolGlass_section slideInRight">
          <h2>👨‍🏫 Empowering Teachers & Parents</h2>
          <ul>
            <li>📚 Teacher training on recognizing emotional red flags</li>
            <li>🗣️ Parent workshops on emotional parenting</li>
            <li>📖 School-wide awareness campaigns & mental health days</li>
            <li>📋 Monthly progress & anonymized reports for stakeholders</li>
          </ul>
        </section>

        <div className="schoolGlass_cta bounceIn">
          <p>
            Let’s collaborate to create a safer, healthier, and more resilient student community.
          </p>
          <button className="schoolGlass_button" onClick={handleStartJourney}>Start My Journey</button>
        </div>
      </div>
    </div>
  );
}

export default PsyCareSchoolsIntro;