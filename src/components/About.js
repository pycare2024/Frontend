
import "./About.css"; // Separate CSS file for styling

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">About Us</h1>

        {/* About Sections */}
        <section className="about-section">
          <h2 className="section-title">Who are we?</h2>
          <p className="section-text">
            "We're a social startup working to make mental healthcare accessible to everyone, regardless of their socioeconomic status."
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">What is our raison d’être?</h2>
          <p className="section-text">
            In line with our vision and mission statement, we intend to make mental health a right for every individual, 
            take away the stigma associated with it, and bring the means to it within geographic and economic reach of every individual.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">How do we plan to achieve our objective?</h2>
          <p className="section-text">
            "Anxiety, depression, and substance abuse account for a significant portion of psychological disorders (80%). 
            While individual triggers may vary, most of these conditions are linked to underlying chemical imbalances in the brain. 
            Our team of expert psychiatrists provides medication-based solutions to restore this balance and alleviate symptoms."
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">Is it an NGO or a Social Enterprise?</h2>
          <p className="section-text">
            "We're a social startup working to make mental healthcare accessible to everyone, regardless of their socioeconomic status."
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">How do we help?</h2>
          <p className="section-text">
            A simple "Hi" on WhatsApp at <strong>[Insert WhatsApp Number]</strong> is all it takes. We'll gather your details and guide you through a quick self-assessment test. 
            We then connect you with our expert doctors for a 15-minute consultation. Get diagnosed, prescribed, and followed up—all from the comfort of your home.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">What kind of mental conditions do we help with?</h2>
          <p className="section-text">
            While our experts can address a wide range of mental health conditions, we prioritize the most common disorders, which account for 80% of cases: 
            anxiety, depression, and substance abuse.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;