import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutCon.css';

const AboutCon = () => {
  const contentRef = useRef(null);

  const navigate = useNavigate();
  
    const handleBookClick = () => {
      navigate('/Landing'); // Replace with your route
    };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div className="Con">
      <div className="tagline-section">
        <span>Choose Help. Not Suffering.</span>
        <div className="underline"></div>
      </div>
      <div className="content-section" ref={contentRef}>

       
        <div className="white-box two"> {/* Added white box for text */}
          <div className="landing-container">
            <div className="landing-content">
              <div className="text-section">
                <h1>Meet Our Experts.</h1>
                <h2>Counselling Therapy Sessions</h2>
                <p>
                  Highly qualified team of some of the best names in psychology who
                  deliver improved well-being to you. Carefully vetted through a
                  rigorous selection process. Trained and experienced in all
                  psychotherapy techniques.
                </p>
                <button className="see-more-btn" onClick={handleBookClick}>See Experts</button>
              </div>
              {/* <div className="image-section">
                <img src={newImg} alt="Therapy Session" />
              </div> */}
            </div>
          </div>

        </div>
      </div>
      {/* <div className="pagination-dots">
        <span className="dot"></span>
        <span className="dot active"></span>
        <span className="dot"></span>
      </div> */}
    </div>
  );
};

export default AboutCon;