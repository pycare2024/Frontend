import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import Working from '../Working/Working';
import WhyPsycare from '../WhyPsycare/WhyPsyCare';
import Facts from '../Facts/Facts';
import './LandingPage.css';
import Genie from "./genie.png";
import Intropage from '../Intropage/Intropage';

const LandingPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top of page on mount
  }, []);


  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef();
  const pauseTimeoutRef = useRef(null);

  const slides = [<Intropage /> , <Header />, <Facts />, <WhyPsycare />, <Working />];

  // Auto sliding interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 11000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset slider to beginning
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

  // Handle click to pause/resume
  const handleUserInteraction = () => {
    setIsPaused(true);
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000); // resumes after 5 seconds of no clicks
  };

  return (
    <div className="slider-container" onClick={handleUserInteraction}>
      <div
        className="slider-wrapper"
        ref={wrapperRef}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slides.map((Slide, i) => (
          <div className="slide" key={i}>
            {currentSlide % slides.length === i && (
              <div className="genie-wrapper">
                <img src={Genie} alt="Genie" className="genie-img" />
                <div className="speech-bubble">
                  Click to hold for 10 secs
                </div>
              </div>
            )}
            {Slide}
          </div>
        ))}
        <div className="slide">{slides[0]}</div> {/* Clone of first */}
      </div>

      {/* Dot Indicators */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${currentSlide % slides.length === i ? 'active' : ''}`}
            onClick={() => {
              setCurrentSlide(i);
              setIsPaused(true); // Optional: pause auto-slide when user manually clicks
              clearTimeout(pauseTimeoutRef.current);
              pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 5000); // Resume after 5 sec
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;