// PsyCareBlog.jsx
import React, { useEffect } from 'react';
import './ABC.css';
import Aarav from './AaravS.jpg'
import Nikita from "./NikitaP.jpg";
import Rahul from "./Rahulm.jpg";
import Sneha from "./SnehaK.jpg";
import Imran from "./Imran.jpg";
import Dir from "./Dir.jpg";
import Yash from "./Yash.jpg";


const reviews = [
  { name: "Aarav S.", image: Aarav, title: "How PsyCare Helped Me Rebuild My Confidence", text: "After experiencing burnout at work, I turned to PsyCare as a last resort. What I found was a platform that not only provided professional support but also helped me reflect and rebuild my confidence. I shared my journey in my personal blog, hoping it helps others take that first step." },
  { name: "Nikita P.", image: Nikita, title: "Therapy That Feels Like Talking to a Friend", text: "In my blog I described how therapy often felt clinical—until I found PsyCare. The therapist I was connected to brought empathy and structure into our sessions. I shared my experience with PsyCare on my wellness blog to inspire others who may be hesitant to try online therapy." },
  { name: "Rahul M.", image: Rahul, title: "Mental Health Made Accessible", text: "I've always advocated for accessible mental health support, and PsyCare’s WhatsApp chatbot blew me away. On my tech-health blog, I wrote about how this simple interface could bridge the gap for thousands of people uncomfortable with traditional platforms." },
  { name: "Sneha K.", image: Sneha, title: "Why I Recommend PsyCare to Every Working Mom", text: "As a mother juggling work and home, I rarely found time for myself. In my parenting blog, I wrote about how PsyCare’s screening test and quick appointments helped me prioritize mental wellness without disrupting my routine." },
  { name: "Imran A.", image: Imran, title: "Creating Safe Mental Health Spaces Online", text: "Through my blog on men’s mental health, I talk about breaking stigmas and accessing support. PsyCare’s respectful and confidential process inspired me to share my story publicly and encourage more men to open up." },
  { name: "Drishti G.", image: Dir, title: "From Doubt to Trust: My Journey with Online Therapy", text: "I was skeptical of online therapy. But after trying PsyCare, I was compelled to write about the transformation on my blog. It was the first time I felt listened to, supported, and guided—all virtually." },
  { name: "Yash R.", image: Yash, title: "Affordable Therapy for Students Like Me", text: "In my student wellness blog, I detailed my struggle balancing studies and mental health. PsyCare offered a solution that was both affordable and impactful. Their platform proved that quality mental health support doesn’t need to come with a huge price tag." },
];

const tips = [
  {
    title: "How to Support a Friend Through Mental Stress",
    text: "Recognize signs of distress and create a non-judgmental space."
  },
  {
    title: "Daily Habits That Help With Anxiety",
    text: "Meditation, journaling, and routine go a long way."
  },
  {
    title: "Therapy Isn’t Taboo",
    text: "Let’s normalize therapy and talk about why it matters."
  }
];

const ABC = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top of page on mount
  }, []);

  return (
    <div className="blog-container">
      <section className="hero">
        <h1>Blogs & Insights</h1>
        <p>Real feedback. Real experiences. Real impact.</p>
      </section>

      <section className="reviews-section">
        {reviews.map((r, i) => (
          <div key={i} className={`review-card card-${(i % 4) + 1}`}>
            <img src={r.image} alt={r.name} />
            <h3>{r.name}</h3>
            <h4 className="blog-title" style={{textAlign:"justify"}}>{r.title}</h4>
            <p style={{textAlign:"justify"}}>{r.text}</p>
          </div>
        ))}
      </section>

      <section className="tips-section">
        <h2>Wellness Reads</h2>
        <div className="tips-wrapper">
          {tips.map((tip, index) => (
            <div className="tip-card" key={index}>
              <h4 style={{textAlign:"justify"}}>{tip.title}</h4>
              <p style={{textAlign:"justify"}}>{tip.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ABC;