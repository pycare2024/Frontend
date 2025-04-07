import React from 'react';
import './IndividualTherapy.css';
import { useNavigate } from 'react-router-dom';

const IndividualTherapy = () => {
  const navigate = useNavigate();

  return (
    <div className="therapy-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Heal. Grow. Thrive.</h1>
        <p>Individual therapy designed to support your mental health journey.</p>
        <button onClick={() => navigate('/BookAppointment')}>Book a Session</button>
      </section>

      {/* What is Individual Therapy */}
      <section className="about-therapy">
        <h2>Best Individual Counselling and Therapy Gurgaon</h2>
        <p>
          Do you feel stressed out or anxious, or do you have any issues that make you upset?
          That is why we provide mental well-being or individual counselling services in Gurgaon to clients.
          Our psychologist aims to empower you in the area of your psychological well-being.
        </p>
        <p>
          With the help of professional one-on-one counselling in Gurgaon, you can begin to find yourself again.
          So, let’s get started to find a solution with our therapist to make a positive change in your life.
          We are here for you – step by step. If you are fighting with anxiety, grief, or self-doubts,
          the psychologist of PsyCare will assist you in finding your stability in Gurgaon.
        </p>
      </section>

      {/* Therapy Approach */}
      <section className="therapy-helps">
        <h2>One-on-One Therapy for Personal Growth and Healing</h2>
        <p>
          In this particular strategy, our therapy sessions work the best. We allow people to be who they are.
          We welcome you to talk about how you feel, what you think, and what you experience without judgment.
        </p>
        <ul>
          <li>Recognize behavioral patterns that limit your well-being</li>
          <li>Break through emotional barriers and past trauma</li>
          <li>Build confidence, stability, and emotional clarity</li>
        </ul>
      </section>

      {/* Why Choose PsyCare */}
      <section className="why-psycare">
        <h2>Why Choose PsyCare?</h2>
        <p>
          The idea that we hold is that everyone is special. That is why we do not generalize our patients.
          Our personal counselling offers individual attention tailored to your needs.
        </p>
        <ul>
          <li>Personalized therapy with compassionate experts</li>
          <li>Effective practices addressing personal & professional challenges</li>
          <li>Safe, confidential environment for healing and growth</li>
          <li>Support in English, Hindi & more</li>
          <li>Rated 4.9/5 by over 10,000+ users</li>
        </ul>
      </section>

      {/* How We Support You */}
      <section className="how-it-works">
        <h2>Supporting You Every Step of the Way</h2>
        <p>
          You don’t have to go through it alone. Our best psychotherapy psychologist provides constant encouragement,
          helps define clear objectives, and celebrates every victory with you.
        </p>
        <ol>
          <li>Initial Consultation with a licensed therapist</li>
          <li>Tailor-made treatment plan designed for your journey</li>
          <li>100% confidential sessions (online or in-person)</li>
          <li>Ongoing support and progress monitoring</li>
        </ol>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>Your well-being matters. Let’s take the first step together.</p>
        <button onClick={() => navigate('/BookAppointment')}>Book Appointment</button>
      </section>
    </div>
  );
};

export default IndividualTherapy;