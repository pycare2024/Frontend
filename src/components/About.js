import "./About.css";
import { FaHeart, FaUsers, FaBullseye, FaEye } from "react-icons/fa"; // Font Awesome Icons

function About() {
  return (
    <div className="about-container" style={{height:"100%"}}>
      <div className="about-content">
        <h1 className="about-heading">About Us</h1>

        {/* About Psycare Section */}
        <section className="about-section">
          <h2 className="section-title">
            <FaHeart className="icon" /> About Psycare
          </h2>
          <p className="section-text">
            Psycare is a mental health initiative designed to make psychiatric support accessible and inclusive for all, breaking down barriers of stigma and affordability. 
            We believe mental well-being is a fundamental right and strive to provide evidence-based care across the globe.
          </p>
        </section>

        {/* Team Section */}
        <section className="about-section">
          <h2 className="section-title">
            <FaUsers className="icon" /> Our Team
          </h2>
          <p className="section-text">
            Our team consists of dedicated psychiatrists, mental health professionals, and compassionate individuals committed to improving lives. Together, we aim to address 
            mental health challenges with a holistic and personalized approach.
          </p>
        </section>

        {/* Mission Section */}
        <section className="about-section">
          <h2 className="section-title">
            <FaBullseye className="icon" /> Our Mission
          </h2>
          <p className="section-text">
            "To reduce the global impact of mental health disorders by providing accessible support, raising awareness, and fostering a connected community. 
            We aim to decrease suicide rates, address the harms of substance abuse, and mitigate productivity losses by championing a holistic approach to mental well-being 
            that reaches across demographics and geographies."
          </p>
        </section>

        {/* Vision Section */}
        <section className="about-section">
          <h2 className="section-title">
            <FaEye className="icon" /> Our Vision
          </h2>
          <p className="section-text">
            "To cultivate a world where mental well-being is a universal right, free from stigma, and mental health resources are accessible to all, 
            empowering every individual to thrive personally and contribute meaningfully to society."
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;