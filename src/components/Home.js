import React from "react";
import homeImage from "./home.jpg";
import logo from "./logo.jpeg"; // Replace with your logo file path
import image1 from "./image-1.png";
import image2 from "./image-2.jpeg";
import image3 from "./image-3.png";
import image4 from "./image-4.jpeg";
import image5 from "./image-5.png";

function Home() {
    const sections = [
        {
            text: "What do Virat Kohli, Maria Sharapova, Deepika Padukone, Chetan Bhagat, Justin Bieber, Manisha Koirala, Prince Harry, Serena Williams, and Michael Phelps have in common? They all overcame mental health challenges and regained their stardom.",
            image: image1,
        },
        {
            text: "Prolonged anxiety, mood swings, and tension can be signs of underlying mental health conditions.",
            image: image2,
        },
        {
            text: "Every 4th person in the world experiences some form of mental health issue.",
            image: image3,
        },
        {
            text: "Depression often stems from chemical imbalances in the brain, though triggers may vary.",
            image: image4,
        },
        {
            text: "General Anxiety, Depression, and Alcohol Abuse account for 80% of mental disorders and are 100% treatable with medical intervention.",
            image: image5,
        },
    ];

    const pageStyle = {
        margin: 0,
        padding: 0,
        fontFamily: "'Roboto', sans-serif",
    };

    const mainSectionStyle = {
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
    };

    const logoStyle = {
        width: "120px",
        marginBottom: "20px",
        borderRadius: "50%", // Circular logo
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Subtle shadow
    };

    const titleStyle = {
        fontSize: "3.5rem",
        fontWeight: "700",
        margin: "0 0 10px 0",
    };

    const subtitleStyle = {
        fontSize: "1.5rem",
        fontWeight: "300",
    };

    const sectionStyle = (alignRight) => ({
        display: "flex",
        flexDirection: alignRight ? "row-reverse" : "row",
        alignItems: "center",
        padding: "50px",
        backgroundColor: alignRight ? "#f9f9f9" : "#ffffff",
        borderBottom: "1px solid #eaeaea",
        animation: alignRight ? "fadeInRight 1s ease" : "fadeInLeft 1s ease",
    });

    const textContainerStyle = {
        flex: 1,
        padding: "20px",
    };

    const textStyle = {
        fontSize: "1.2rem",
        lineHeight: "1.8",
        color: "#333",
    };

    const imageContainerStyle = {
        flex: 1,
        textAlign: "center",
        padding: "20px",
    };

    const imageStyle = {
        width: "90%",
        maxWidth: "300px",
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
        transition: "transform 0.3s ease",
    };

    return (
        <div style={pageStyle}>
            {/* Main Section */}
            <div style={mainSectionStyle}>
                <img src={logo} alt="PsyCare Logo" style={logoStyle} />
                <h1 style={titleStyle}>PsyCare</h1>
                <p style={subtitleStyle}>Your Trusted Partner in Mental Well-Being</p>
            </div>

            {/* Scrolling Sections */}
            {sections.map((section, index) => (
                <div
                    key={index}
                    style={sectionStyle(index % 2 !== 0)} // Alternate alignment
                >
                    <div style={textContainerStyle}>
                        <p style={textStyle}>{section.text}</p>
                    </div>
                    <div style={imageContainerStyle}>
                        <img
                            src={section.image}
                            alt={`Illustration ${index + 1}`}
                            style={imageStyle}
                            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;