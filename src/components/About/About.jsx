// About.js
import React, { useEffect } from 'react';
import './About.css';
import miss from "./missionAbout.png"
import Dhruv from "./Dhruv.jpg"
import ujj from "./ujj.jpg"
import sir from "./sir1.png"

const About = () => {
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
        <div className="mission-item">
          <div className="mission-icon large">💡</div> {/* Large lightbulb icon */}
          <h2>OUR VISION</h2>
          <div className="line"></div>
          {/* <div className="mission-icon small">💡</div> Small lightbulb icon */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
        <div className="mission-item">
          <div className="mission-icon large">⭐</div> {/* Large star icon */}
          <h2>OUR VALUES</h2>
          <div className="line"></div>
          {/* <div className="mission-icon small">⭐</div> Small star icon */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
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
          <p className="founder-signature">Dr. Vivek Sir<br /><span>Founder & CEO</span></p>
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
          <div className="team-member">
            <img src={Dhruv} alt="Team Member" />
            <h3>Mr.Dhruv Agarwal</h3>
            <p>Operations</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae vitae fugit incidunt, ex repellendus dolorum, maiores illum labore sint fugiat, ipsum ducimus minima minus eos. Officiis reiciendis velit labore in.</p>
          </div>
          
          {/* <div className="team-member">
            <img src="https://via.placeholder.com/150x150.png?text=Team+Member" alt="Team Member" />
            <h3>Ms. Vivek Bhugra</h3>
            <p>Founder</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, ut architecto natus nam culpa quidem, ex iste dicta labore minima deserunt quos unde vero vel facere aspernatur commodi, deleniti odio!</p>
          </div> */}
          <div className="team-member">
            <img src=
            {ujj} alt="Team Member" />
            <h3>Mr. Ujjwal Tomar</h3>
            <p>Frontend</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur maiores repellendus, voluptates veritatis dignissimos praesentium iure, debitis commodi quasi porro tenetur ducimus deserunt ex. Quis hic dolorum voluptas iste atque!</p>
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