import React, { useState, useEffect, useRef } from "react";
import home from "./home.jpg";
import image1 from "./image-1.png";
import image2 from "./image-2.jpeg";
import image3 from "./image-3.png";
import image4 from "./image-4.jpeg";
import image5 from "./image-5.png";

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

    const imageOverlayStyle = {
        position: "absolute",
        top: "7.5%",
        left: "5%",
        width: "25vw", // Responsive width
        maxWidth: "300px",
        height: "40vh", // Responsive height
        maxHeight: "400px",
        borderRadius: "50px",
        backgroundImage: `url(${home})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        border: "5px solid rgba(255, 255, 255, 0.8)",
        zIndex: 1,
    };

    const mainSectionStyle = {
        padding: "20px 50px 20px calc(35%)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        color: "#333",
        textAlign: "left",
        position: "relative",
        zIndex: 2,
    };

    const titleStyle = {
        fontSize: "3.5rem",
        fontWeight: "700",
        margin: "0 0 10px 0",
        color: "#FF8096",
    };

    const subtitleStyle = {
        fontSize: "1.5rem",
        fontWeight: "300",
        color: "#FF8096",
    };

    const sectionStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "50px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eaeaea",
        flexWrap: "wrap",
        opacity: 0, // Initially hidden
        transform: "translateX(-50px)", // Slide in from left initially
        transition: "opacity 0.8s ease, transform 0.8s ease",
    };

    const textContainerStyle = {
        flex: "1 1 300px",
        padding: "20px",
    };

    const textStyle = {
        fontSize: "1.2rem",
        lineHeight: "1.8",
        color: "#333",
    };

    const imageContainerStyle = {
        flex: "1 1 300px",
        textAlign: "center",
        padding: "20px",
        overflow: "hidden", // Prevent overflow when zooming
    };

    const imageStyle = {
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out", // Smooth zoom transition
    };

    const visibleStyle = {
        opacity: 1,
        transform: "translateX(0)", // Move to its final position
    };

    // Create refs for each image
    const imageRefs = useRef([]);

    return (
        <div style={pageStyle}>
            {/* Image Overlay */}
            <div className="imageOverlay" style={imageOverlayStyle}></div>

            {/* Main Section */}
            <div className="mainSection" style={mainSectionStyle}>
                <h1 style={titleStyle}>PsyCare</h1>
                <p style={subtitleStyle}>Your path to mental Wellness</p>
            </div>

            {/* Scrolling Sections with Animations */}
            {sections.map((section, index) => (
                <div
                    key={index}
                    id={`section-${index}`}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    style={{
                        ...sectionStyle,
                        ...(visibleSections[`section-${index}`] ? visibleStyle : {}),
                    }}
                >
                    <div style={textContainerStyle}>
                        <p style={textStyle}>{section.text}</p>
                    </div>
                    <div
                        style={imageContainerStyle}
                        onMouseEnter={() => {
                            // Apply zoom to the image on hover
                            imageRefs.current[index].style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={() => {
                            // Reset zoom when hover ends
                            imageRefs.current[index].style.transform = "scale(1)";
                        }}
                    >
                        <img
                            src={section.image}
                            alt={`Illustration ${index + 1}`}
                            style={imageStyle}
                            ref={(el) => (imageRefs.current[index] = el)} // Assign ref to each image
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;