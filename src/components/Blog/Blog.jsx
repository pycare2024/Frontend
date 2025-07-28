// Blog.jsx
import React, { useState, useEffect } from 'react';
import './Blog.css';
import blogImage1 from '../Blog/anxiety.jpg';
import blogImage2 from '../Blog/age_grps.jpg';
import blogImage3 from '../Blog/tips.jpg';
import blogs from '../Blog/blogs.jpg';

const blogPosts = [
  {
    title: "Understanding Anxiety",
    category: "MENTAL HEALTH",
    text: "Healthcare workers, creatives, and military professionals often face mental health challenges—but recovery is shaped by workplace support, resilience training, and individual coping strategies.",
    image: blogImage1,
    views: 260,
    likes: 20,
  },
  {
    title: "Mental Illness Across Age Groups",
    category: "SELF-CARE",
    text: "Young adults (18–25) report the highest mental health challenges. Middle-aged adults face work/life pressures, while older adults experience loneliness and cognitive decline.",
    image: blogImage2,
    views: 157,
    likes: 31,
  },
  {
    title: "5 Mindfulness Tips for Beginners",
    category: "SELF-CARE",
    text: "Start with breath awareness, set a timer, observe your thoughts non-judgmentally, practice daily, and be patient. Small steps create lifelong mental clarity.",
    image: blogImage3,
    views: 10,
    likes: 1,
  },
];

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentPost = blogPosts[currentIndex];

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${blogs})` }}>
      <div className="overlay" />
      <h1 className="title">Healing Minds: Your Journey to Mental Wellness</h1>
      <div className="card-wrapper">
        <div className="glass-card" key={currentIndex}>
          <img src={currentPost.image} alt={currentPost.title} />
          <div className="content">
            <p className="category">{currentPost.category}</p>
            <h2>{currentPost.title}</h2>
            <p className="text">{currentPost.text}</p>
            <p className="meta">
              {currentPost.views} views • {currentPost.likes} likes
            </p>
          </div>
        </div>
      </div>
      <div className="dot-container">
        {blogPosts.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;