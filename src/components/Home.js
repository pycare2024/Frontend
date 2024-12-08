import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        query: "",
    });

    const [boxStates, setBoxStates] = useState([false, false, false, false]); // Track visibility of each box

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://backend-xhl4.onrender.com/QueryRoute/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phno: formData.phone,
                    query: formData.query,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Query submitted successfully! Our team will reach out to you soon.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { fontSize: "1rem", textAlign: "center", fontFamily: "Arial, sans-serif" },
                });
                setFormData({ name: "", email: "", phone: "", query: "" });
                setIsModalOpen(false);
            } else {
                toast.error(`Error: ${result.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error("Error submitting query:", error);
            toast.error("An error occurred. Please try again later.", {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="pageStyle">
            {/* Toast Container */}
            <ToastContainer />

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

            {/* Query Button */}
            <button
                className="queryButton"
                onClick={() => setIsModalOpen(true)}
            >
                Query?
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="closeModalButton" onClick={() => setIsModalOpen(false)}>
                            <i className="fa fa-times" style={{ fontSize: '1.5rem' }}></i>
                        </button>
                        <h2 className="modalTitle">Submit Your Query</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="formField">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="formField">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="formField">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="formField">
                                <label htmlFor="query">Your Query</label>
                                <textarea
                                    id="query"
                                    name="query"
                                    value={formData.query}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Describe your query"
                                    rows="4"
                                />
                            </div>
                            <button type="submit" className="submitButton">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;