import React, { useEffect, useRef } from 'react';
import './AboutCon.css';

const AboutCon = () => {
  const contentRef = useRef(null);

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

        <div className="white-box one"> {/* Added white box for text */}
          <div className="text-column">
            <h1 className="headline">Counselling Therapy Sessions with Licensed & Verified Experts</h1>
            <p className="description">
              Highly qualified team of some of the best names in psychology who deliver improved well-being to you. Carefully vetted through a rigorous selection process. Trained and experienced in all psychotherapy techniques.
            </p>
            <div className="session-types">
              <div className="session-type">
                <div className="session-icon video"></div>
                <span>Video Session</span>
              </div>
              <div className="session-type">
                <div className="session-icon audio"></div>
                <span>Audio Session</span>
              </div>
              <div className="session-type">
                <div className="session-icon chat"></div>
                <span>Chat Session</span>
              </div>
            </div>
            <p className="language-support">English and All Regional Indian Languages</p>
            <p className="privacy-info">100% Private & Secure Platform</p>
            <p className="support-info">24/7 Support</p>
            <button className="view-counsellors-btn">View All Counsellors</button>
          </div>
        </div>
        <div className="white-box two"> {/* Added white box for text */}
          <div className="text-column">
            <h1 className="headline">Counselling Therapy Sessions with Licensed & Verified Experts</h1>
            <p className="description">
              Highly qualified team of some of the best names in psychology who deliver improved well-being to you. Carefully vetted through a rigorous selection process. Trained and experienced in all psychotherapy techniques.
            </p>
            <div className="session-types">
              <div className="session-type">
                <div className="session-icon video"></div>
                <span>Video Session</span>
              </div>
              <div className="session-type">
                <div className="session-icon audio"></div>
                <span>Audio Session</span>
              </div>
              <div className="session-type">
                <div className="session-icon chat"></div>
                <span>Chat Session</span>
              </div>
            </div>
            <p className="language-support">English and All Regional Indian Languages</p>
            <p className="privacy-info">100% Private & Secure Platform</p>
            <p className="support-info">24/7 Support</p>
            <button className="view-counsellors-btn">View All Counsellors</button>
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