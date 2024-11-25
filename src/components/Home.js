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

    const [boxStates, setBoxStates] = useState([false, false, false, false]); // Track visibility of each box

    useEffect(() => {
        // Trigger animations with delays
        const timeouts = [];
        boxStates.forEach((_, index) => {
            timeouts.push(
                setTimeout(() => {
                    setBoxStates((prev) => {
                        const newState = [...prev];
                        newState[index] = true; // Make the box visible
                        return newState;
                    });
                }, 2000 * (index + 1)) // Increment delay for each box
            );
        });

        return () => {
            // Clear timeouts on cleanup
            timeouts.forEach(clearTimeout);
        };
    }, []);


    return (
        <div className="pageStyle">
            {/* Main Container */}
            <div className="mainContainer">
                {/* Left Boxes */}
                <div className="leftBoxes">
                    <div className={`boxStyle ${boxStates[0] ? "slideIn" : ""}`}>
                        <p><b>Who are we?</b></p>
                        <p>We're a social enterprise committed to making affordable mental healthcare accessible to everyone from the comfort of their homes !</p>
                    </div>
                </div>

                {/* Center Content */}
                <div className="centerContent">
                    <h1 className="titleStyle">PsyCare</h1>
                    <p className="subtitleStyle">Your path to mental wellness !</p>
                    <div
                        className="imageOverlay"
                        style={{ backgroundImage: `url(${homeImage})` }}
                    ></div>
                </div>

                {/* Right Boxes */}
                {/* Right Boxes */}
                <div className="rightBoxes">
                    <div className={`boxStyle ${boxStates[2] ? "slideIn" : ""}`}>
                        <p><b>What kind of mental conditions do we help with?</b></p>
                        <p>Our experts address the most common disorders such as anxiety, depression and substance abuse, which account for 80% of the mental health cases.</p>
                    </div>
                </div>
            </div>

            <div style={{
                padding: "20px",
                width: "100%",
                background: "linear-gradient(90deg, #FF8096, #FF4B75)",
                color: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "1.6",
                textAlign: "center"
            }}>
                <p style={{ fontSize: "1rem", margin: "0" }}>
                    Just ping us on whatsapp
                    <a
                        href="https://wa.me/918107191657?text=Hi%20I%20need%20assistance"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <i style={{
                            color: "green",
                            margin: "0 5px",
                            fontSize: "1.2rem",
                            cursor: "pointer"
                        }}
                            className="fa-brands fa-whatsapp fa-beat"></i>
                    </a>
                    and we will do the rest!
                </p>
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