import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-slider">
        {/* Page 1 */}
        <div className="header header1">
          <div className="text-box">
            <h1 className="headline">TRUST.<br/> SHARE.<br/> HEAL.</h1>
            <p className="subheadline">
              Online Counselling Therapy With<br /> Top Psychologists<br />
              Anytime, Anywhere, Anydevice.
            </p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>

        {/* Page 2 */}
        <div className="header header2">
          <div className="text-box">
            <h1 className="headline">LISTEN.<br/> LEARN.<br/> GROW.</h1>
            <p className="subheadline">
              Personalized Sessions With Expert<br /> Therapists
              Tailored To Your Needs.
            </p>
            <button className="cta-button">Learn More</button>
          </div>
        </div>

        {/* Duplicate of Page 1 */}
        <div className="header header1">
          <div className="text-box">
            <h1 className="headline">TRUST.<br/> SHARE.<br/> HEAL.</h1>
            <p className="subheadline">
              Online Counselling Therapy With<br /> Top Psychologists<br />
              Anytime, Anywhere, Anydevice.
            </p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>

        {/* Duplicate of Page 2 */}
        <div className="header header2">
          <div className="text-box">
            <h1 className="headline">LISTEN.<br/> LEARN.<br/> GROW.</h1>
            <p className="subheadline">
              Personalized Sessions With Expert<br /> Therapists
              Tailored To Your Needs.
            </p>
            <button className="cta-button">Learn More</button>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="pagination-dots">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
      </div>
    </div>
  );
};

export default Header;