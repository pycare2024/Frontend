import React from 'react';
import './Working.css';

const Working = () => {
  return (
    <div className="how-to-use-container">
      <h1 className="how-to-use-title">How to Use Psycare?</h1>
      <p className="how-to-use-subtitle">
        A step-by-step guide to get started with Psycare and improve your mental well-being
      </p>
      <div className="steps-container">
        {/* Step 1 */}
        <div className="step-card step-card-with-bg step1">
          <div className="hover-text">
              <h3 className="step-title">Sign Up</h3>
                <p className="step-description">
                  Create your Psycare account by providing your details securely.
                </p>
          </div>
          
        </div>

        {/* Step 2 */}
        <div className="step-card step-card-with-bg step2">
          <div className="hover-text">
            <h3 className="step-title">Take Assessment</h3>
              <p className="step-description">
              Complete a quick mental health assessment to understand your needs.
              </p>
          </div>

          
        </div>

        {/* Step 3 */}
        <div className="step-card  step-card-with-bg step3">
          <div className="hover-text">
            <h3 className="step-title">Book Appointment</h3>
            <p className="step-description">
            Schedule a session with a licensed therapist at your convenience.
            </p>
            </div>
        </div>

       

        {/* Step 4 */}
        <div className="step-card step-card-with-bg step4">
          <div className="hover-text">
            <h3 className="step-title">Start Therapy</h3>
            <p className="step-description">
              Begin your journey to better mental health with professional support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;