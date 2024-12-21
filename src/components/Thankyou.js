import React from "react";
import "./thankyou.css"; // Add the CSS file for styling

function Thankyou() {
    return (
        <div className="thank-you-container" style={{height:"100vh",marginTop:"50%"}}>
            <div className="thank-you-message">
                <h1 className="thank-you-title">Thank You!</h1>
                <p className="thank-you-subtitle">
                    You will be contacted by our team shortly!
                </p>
                <div className="checkmark-container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="checkmark-icon"
                    >
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                <button className="cta-button" onClick={() => window.location.href = '/'}>
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default Thankyou;