import React from 'react';
import './Review.css';

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    text: "Psycare helped me find balance in my life. The therapists truly care.",
    rating: 5
  },
  {
    id: 2,
    name: "Rohan Mehta",
    text: "I’ve learned to manage my anxiety better with their amazing support system.",
    rating: 4
  },
  {
    id: 3,
    name: "Priya Nair",
    text: "Their compassionate approach made me feel heard and understood.",
    rating: 5
  },
  {
    id: 4,
    name: "Aarav Khanna",
    text: "I never thought therapy could be so life-changing. Thank you Psycare!",
    rating: 5
  },
  {
    id: 5,
    name: "Simran Kaur",
    text: "Every session has brought me closer to peace. Highly recommended.",
    rating: 4
  },
  {
    id: 6,
    name: "Dev Patel",
    text: "Professional, kind, and effective. My mental health is in a better place now.",
    rating: 5
  },
  {
    id: 7,
    name: "Neha Joshi",
    text: "Psycare gave me the tools to heal and grow. I’m forever grateful.",
    rating: 5
  },
  {
    id: 8,
    name: "Ishaan Verma",
    text: "The support I received here changed the way I view myself and my struggles.",
    rating: 5
  }
];


const Review = () => {
  return (
    <div className="psycare-container">
      {/* <div className="content-box">
        <h1>Welcome to Psycare</h1>
        <p>Your mental health matters</p>
        <button className="cta-button">Get Help Now</button>
      </div> */}

      <div className="testimonial-section">
        <h2 className="testimonial-heading">
          <span className="highlight">100+</span> Verified Reviews and Counting
        </h2>
        <div className="testimonial-grid">
          {reviews.map((review) => (
            <div key={review.id} className="testimonial-card">
            <p className="testimonial-quote">“{review.text}”</p>
            <div className="testimonial-stars">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p className="testimonial-name">{review.name}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;