import React from 'react';
import './Working.css';

import Img1 from './1.webp';
import Img2 from './2.webp';
import Img3 from './3.webp';
import Img4 from './4.webp';
import Img5 from './5.webp';
import Img6 from './6.webp';

const steps = [
  {
    id: 1,
    image: Img1,
  },
  {
    id: 2,
    image: Img2,
  },
  {
    id: 3,
    image: Img3,
  },
  {
    id: 4,
    image: Img4,
  },
  {
    id: 5,
    image: Img5,
  },
  {
    id: 6,
    image: Img6,
  },
];

const Working = () => {
  return (
    <div className="how-to-use-container">
      <h1 className="how-to-use-title">How to use PsyCare?</h1>
      <p className="how-to-use-subtitle">
        A step-by-step guide to get started with Psycare and improve your mental well-being
      </p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={step.id} className="step-wrapper">
            <div className="step-number">Step {index + 1}</div>
            <div className="step-card no-padding">
              <img src={step.image} alt={step.title} className="step-img-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Working;