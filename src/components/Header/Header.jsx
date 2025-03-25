import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="text-box">
        <div className="content-slider">
          {/* Content Page 1 */}
          <div className="content-page">
            <h1 className="headline">TRUST.<br/> SHARE.<br/> HEAL.</h1>
            <p className="subheadline">
              Online Counselling Therapy With<br /> Top Psychologists<br />
              Anytime, Anywhere, Anydevice.
            </p>
            <button className="cta-button">Get Started</button>
          </div>

          {/* Content Page 2 */}
          <div className="content-page">
            <h1 className="headline">LISTEN.<br/> LEARN.<br/> GROW.</h1>
            <p className="subheadline">
              Personalized Sessions With Expert<br /> Therapists
              Tailored To Your Needs.
            </p>
            <button className="cta-button">Learn More</button>
          </div>

          {/* Content Page 3 */}
          <div className="content-page">
            <h1 className="headline">CONNECT.<br/> SUPPORT.<br/> THRIVE.</h1>
            <p className="subheadline">
              Join Our Community of Mental Wellness<br />
              Support At Your Fingertips.
            </p>
            <button className="cta-button">Join Now</button>
          </div>

          {/* Duplicate of Content Page 1 */}
          <div className="content-page">
            <h1 className="headline">TRUST.<br/> SHARE.<br/> HEAL.</h1>
            <p className="subheadline">
              Online Counselling Therapy With<br/> Top Psychologists<br />
              Anytime, Anywhere, Anydevice.
            </p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
        <div className="pagination-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>
      </div>
    </div>
  );
};

export default Header;