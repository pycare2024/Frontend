import React, { useState, useEffect, useRef } from "react";
import image1 from "./image-1.png";
import image2 from "./image-2.jpeg";
import image3 from "./image-3.png";
import image4 from "./image-4.jpeg";
import image5 from "./image-5.png";
import homeImage from "./home.jpg";
import "./Home.css";

function Home() {
    const sections = [
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    What do Virat Kohli, Maria Sharapova, Deepika Padukone, and others have in common?
                    <br />
                    They all overcame mental health challenges.
                </>
            ),
            image: image1,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Prolonged anxiety and mood swings can indicate underlying mental health conditions.
                </>
            ),
            image: image2,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Every 4th person in the world experiences mental health issues.
                </>
            ),
            image: image3,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Depression often stems from chemical imbalances in the brain.
                </>
            ),
            image: image4,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Anxiety, Depression, and Alcohol Abuse are treatable with medical care.
                </>
            ),
            image: image5,
        },
    ];

    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef([]);
    const [animateBoxes, setAnimateBoxes] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimateBoxes(true);
        }, 3000); // Start animating boxes 3 seconds after page load
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="pageStyle">
            {/* Main Container */}
            <div className="mainContainer">
                {/* Left Boxes */}
                <div className="leftBoxes">
                    <div className={`boxStyle ${animateBoxes ? "animate" : ""}`}>
                        <h3>Who are we?</h3>
                        <p>We're a "Social Enterprise" working to make mental healthcare accessible to everyone.</p>
                    </div>
                    <div className={`boxStyle ${animateBoxes ? "animate" : ""}`}>
                        <h3>What is our raison d’être?</h3>
                        <p>We aim to eliminate the stigma around mental health and make it accessible to all.</p>
                    </div>
                </div>

                {/* Center Content */}
                <div className="centerContent">
                    <h1 className="titleStyle">PsyCare</h1>
                    <p className="subtitleStyle">Your path to mental wellness</p>
                    <div
                        className="imageOverlay"
                        style={{ backgroundImage: `url(${homeImage})` }}
                    ></div>
                </div>

                {/* Right Boxes */}
                <div className="rightBoxes">
                    <div className={`boxStyle ${animateBoxes ? "animate" : ""}`}>
                        <h3>How do we plan to achieve?</h3>
                        <p>Our experts provide solutions for anxiety, depression, and substance abuse.</p>
                    </div>
                    <div className={`boxStyle ${animateBoxes ? "animate" : ""}`}>
                        <h3>What mental conditions do we help with?</h3>
                        <p>We prioritize common disorders like anxiety, depression, and substance abuse.</p>
                    </div>
                </div>
            </div>

            {/* Scrolling Sections */}
            {sections.map((section, index) => (
                <div
                    key={index}
                    id={`section-${index}`}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className={`sectionStyle ${visibleSections[`section-${index}`] ? "visibleStyle" : ""}`}
                >
                    <div className="textContainerStyle">
                        <p>{section.text}</p>
                    </div>
                    <div className="imageContainerStyle">
                        <img src={section.image} alt={`Illustration ${index + 1}`} className="imageStyle" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;