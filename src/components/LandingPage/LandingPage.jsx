import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import Working from '../Working/Working';
import WhyPsycare from '../WhyPsycare/WhyPsyCare'; // Add this import
import './LandingPage.css';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const wrapperRef = useRef();

  const slides = [<Header />, <Working />, <WhyPsycare />];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === slides.length) {
      const timeout = setTimeout(() => {
        wrapperRef.current.style.transition = 'none';
        wrapperRef.current.style.transform = 'translateX(0)';
        setCurrentSlide(0);
        setTimeout(() => {
          wrapperRef.current.style.transition = 'transform 1s ease-in-out';
        }, 50);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentSlide]);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        ref={wrapperRef}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slides.map((Slide, i) => (
          <div className="slide" key={i}>{Slide}</div>
        ))}
        <div className="slide">{slides[0]}</div> {/* Clone of first */}
      </div>

      {/* Dot Indicators */}
      <div className="dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${currentSlide % slides.length === i ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
