import React, { useEffect, useState } from 'react';
import './StartMyJourney.css';
import { motion, AnimatePresence } from 'framer-motion';
import sadboy from "./sadboy.jpg";
import happyboy from "./happyboy.jpg";
import transition from "./transition.jpg";

export default function StudentJourney() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const images = [sadboy, transition, happyboy];
  const altTexts = ['Sad boy', 'Transition', 'Happy boy'];

  return (
    <div className="glass-container">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-step">1. Enter School & Student ID</div>
        <div className="progress-step">2. Take Screening Test</div>
        <div className="progress-step">3. Choose Therapist</div>
        <div className="progress-step">4. Book Appointment</div>
        <div className="progress-bar-line"></div>
      </div>

      {/* Animated Transformation */}
      <div className="journey-animation">
        <AnimatePresence mode="wait">
          <motion.img
            key={step}
            src={images[step]}
            alt={altTexts[step]}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>

      {/* Form */}
      <div className="id-form">
        <input type="text" placeholder="Enter School ID" />
        <input type="text" placeholder="Enter Student ID" />
        <button>Continue</button>
      </div>
    </div>
  );
}