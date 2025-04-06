// About.js
import React, { useEffect } from 'react';
import './About.css';
import miss from "./missionAbout.png"
import Dhruv from "./Dhruv.jpg"
import ujj from "./ujj.jpg"
import sir from "./sir1.png"

import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.slide-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => elements.forEach((element) => observer.unobserve(element));
  }, []);

  return (

    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section slide-in">
        {/* <h1>About PsyCare</h1>
        <p>Providing compassionate mental health support to empower balanced, fulfilling lives.</p> */}
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-item">
            <div className="mission-icon large">🎯</div> {/* Large target icon */}
            <h2>OUR MISSION</h2>
            <div className="line"></div>
            {/* <div className="mission-icon small">🎯</div> Small target icon */}
            <p>
            At PsyCare, our mission is to make mental health support accessible, affordable, and stigma-free for everyone. We aim to empower individuals through compassionate care, innovative technology, and a community-driven approach to well-being.
            </p>
          </div>
          <div className="mission-item">
            <div className="mission-icon large">💡</div> {/* Large lightbulb icon */}
            <h2>OUR VISION</h2>
            <div className="line"></div>
            {/* <div className="mission-icon small">💡</div> Small lightbulb icon */}
            <p>
            To become a global leader in mental wellness by harnessing the power of technology and empathy creating a world where seeking support is as natural as offering it, and every individual thrives with access to holistic mental health care.
            </p>
          </div>
          <div className="mission-item">
            <div className="mission-icon large">⭐</div> {/* Large star icon */}
            <h2>OUR VALUES</h2>
            <div className="line"></div>
            {/* <div className="mission-icon small">⭐</div> Small star icon */}
            <p>
            Our values are the foundation of everything we do. We prioritize compassion, ensuring that every person who reaches out is met with empathy and understanding. We are committed to innovation, using technology to create accessible mental health solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section slide-in">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Individual Therapy</h3>
            <p>Personalized sessions for your unique challenges.</p>
          </div>
          <div className="service-card">
            <h3>Group Therapy</h3>
            <p>Supportive sessions for connection and healing.</p>
          </div>
          <div className="service-card">
            <h3>Corporate Wellness</h3>
            <p>Enhancing workplace mental health.</p>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="founder-section slide-in">
        <div className="founder-content">
          <h2>Founder's Note</h2>
          <blockquote>
            "Early access to quality mental health services is critical for lasting recovery in India."
          </blockquote>
          <p>At PsyCare, we provide trusted care across India and online, 365 days a year, ensuring accessibility and real outcomes.</p>
          <p className="founder-signature">Dr. Vivek Bhugra<br /><span>Founder & CEO, PsyCare</span></p>
        </div>
        <div className="founder-image">
          <div className="blue-circle">
            <img src={sir} alt="Vivek Sir" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section slide-in">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-card-inner">
              <div className="team-card-front">
                <img src={Dhruv} alt="Dhruv Agarwal" />
                <h3>Mr. Dhruv Agarwal</h3>
                <p>Head of IT, PsyCare</p>
              </div>
              <div className="team-card-back">
                <p>
                  At PsyCare, we believe technology is not just a tool—it’s a bridge to better mental health.
                  Our mission in IT is to create seamless, secure, and smart digital experiences that empower
                  individuals to access care effortlessly. By combining innovation with compassion, we’re
                  building systems that connect people to support when they need it most. It’s an honor to
                  lead this technological journey that touches lives every day.
                </p>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-card-inner">
              <div className="team-card-front">
                <img src={ujj} alt="Ujjwal Tomar" />
                <h3>Mr. Ujjwal Tomar</h3>
                <p>IT Department, PsyCare</p>
              </div>
              <div className="team-card-back">
                <p>
                  Being part of the PsyCare IT team means more than just writing code. It’s about contributing
                  to a vision that truly makes a difference in people’s lives. Every feature we build is
                  designed to make mental health care more accessible, inclusive, and reliable. I’m proud to
                  support this mission alongside a passionate team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="get-in-touch-section slide-in">
        <h2>Get in Touch</h2>
        <div className="get-in-touch-grid">
          <div className="get-in-touch-item">
            <div className="icon puzzle-icon"></div>
            <h3>Find Mental Health Support</h3>
            <p className="get-in-touch-link">Connect with Us</p>
          </div>
          <div className="get-in-touch-item">
            <div className="icon handshake-icon"></div>
            <h3>Support Your Organization</h3>
            <p className="get-in-touch-link">Partner with Us</p>
          </div>
          <div className="get-in-touch-item">
            <div className="icon question-icon"></div>
            <h3>Join Our Team</h3>
            <p className="get-in-touch-link">Work with Us</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section slide-in">
        <h2>Client Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"PsyCare helped me manage my anxiety with care."</p>
            <h4>- Sarah K.</h4>
          </div>
          <div className="testimonial">
            <p>"Group therapy gave me a supportive community."</p>
            <h4>- Arjun M.</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About PsyCare</h3>
            <p>Leading mental health and wellness services globally.</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>+91 98765 43210<br />support@psycare.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© PsyCare 2024</p>
        </div>
      </footer> */}
    </div>
  );
};

export default About;