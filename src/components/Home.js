import React, { useState, useEffect, useRef } from "react";
import image1 from "./image-1.png";
import image2 from "./image-2.jpeg";
import image3 from "./image-3.png";
import image4 from "./image-4.jpeg";
import image5 from "./image-5.png";
import "./Home.css";

function Home() {
    const sections = [
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    What do Virat Kohli, Maria Sharapova, Deepika Padukone, Chetan Bhagat, Justin Bieber, Manisha Koirala, Prince Harry, Serena Williams, and Michael Phelps have in common? 
                    <br />
                    They all overcame mental health challenges and regained their stardom.
                </>
            ),
            image: image1,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Prolonged anxiety, mood swings, and tension can be signs of underlying mental health conditions.
                </>
            ),
            image: image2,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Every 4th person in the world experiences some form of mental health issue.
                </>
            ),
            image: image3,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    Depression often stems from chemical imbalances in the brain, though triggers may vary.
                </>
            ),
            image: image4,
        },
        {
            text: (
                <>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Do you know?</span>
                    <br />
                    General Anxiety, Depression, and Alcohol Abuse account for 80% of mental disorders and are 100% treatable with medical intervention.
                </>
            ),
            image: image5,
        },
    ];

    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    } else {
                        setVisibleSections((prev) => ({
                            ...prev,
                            [entry.target.id]: false,
                        }));
                    }
                });
            },
            { threshold: 0.3 }
        );

        const refsCopy = sectionRefs.current;

        refsCopy.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            refsCopy.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const pageStyle = {
        margin: 0,
        padding: 0,
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
    };

    return (
        <div style={pageStyle}>
            {/* Image Overlay */}
            <div className="imageOverlay"></div>

            {/* Main Section */}
            <div className="mainSection">
                <h1 className="titleStyle">PsyCare</h1>
                <p className="subtitleStyle">Your path to mental wellness</p>

                {/* Vertical Information Boxes (Right-Aligned) */}
                <div className="infoBoxesStyle">
                    <div className="boxStyle">
                        <h3 style={{color:"#FF8096"}}>Who are we?</h3>
                        <p className="contentStyle">
                            "We're a social startup working to make mental healthcare accessible to everyone, regardless of their socioeconomic status."
                        </p>
                    </div>
                    <div className="boxStyle">
                        <h3 style={{color:"#FF8096"}}>What is our raison d’être?</h3>
                        <p className="contentStyle">
                            In line with our vision and mission statement, we intend to make mental health a right for every individual, take away the stigma associated with it, and bring the means to it within geographic and economic reach of every individual.
                        </p>
                    </div>
                    <div className="boxStyle">
                        <h3 style={{color:"#FF8096"}}>How do we plan to achieve our objective?</h3>
                        <p className="contentStyle">
                            "Anxiety, depression, and substance abuse account for a significant portion of psychological disorders (80%). Our expert psychiatrists provide solutions to alleviate these conditions."
                        </p>
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
                    <div
                        className="imageContainerStyle"
                    >
                        <img
                            src={section.image}
                            alt={`Illustration ${index + 1}`}
                            className="imageStyle"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;