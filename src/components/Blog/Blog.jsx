import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import blogImage1 from '../Blog/anxiety.jpg';
import blogImage2 from '../Blog/age_grps.jpg';
import blogImage3 from '../Blog/tips.jpg';
import blogs from "../Blog/blogs.jpg";

const blogPosts = [
  {
    title: "Understanding Anxiety",
    category: "MENTAL HEALTH",
    text: "The distribution of mental health overcomers varies across professions, with some careers facing higher mental health challenges due to stress, workload, and work-life balance. Studies show that healthcare workers, first responders, and corporate professionals report higher recovery rates due to workplace support programs and therapy access. Creative professionals and entrepreneurs often rely on self-care and peer support, while athletes and military personnel benefit from structured mental resilience training. Overall, the journey to overcoming mental health struggles is influenced by access to resources, social support, and individual coping mechanisms.",
    image: blogImage1,
    views: 260,
    likes: 20,
  },
  {
    title: "Mental Illness Across Age Groups",
    category: "SELF-CARE",
    text: "Mental illness is most common in young adults (18-25) due to life stressors. Middle-aged adults (26-49) face work and family pressures, while older adults (50+) experience lower reported rates but may struggle with depression and cognitive decline.",
    image: blogImage2,
    views: 157,
    likes: 31,
  },
  {
    title: "5 Mindfulness Tips for Beginners",
    category: "SELF-CARE",
    text: "Starting a mindfulness practice can be transformative. Here are five simple tips to help you stay present and reduce stress in your daily life.",
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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentPost = blogPosts[currentIndex];

  return (
    <PageWrapper>
      <h1>Healing Minds: Your Journey to Mental Wellness</h1>
      <Circle>
        <AnimatedWrapper key={currentIndex}>
          <Card>
            <img src={currentPost.image} alt={currentPost.title} />
            <div className="content">
              <p className="category">{currentPost.category}</p>
              <h2>{currentPost.title}</h2>
              <p className="text">{currentPost.text}</p>
              <p className="meta">
                <span>{currentPost.views} views</span> • <span>{currentPost.likes} likes</span>
              </p>
            </div>
          </Card>
        </AnimatedWrapper>
      </Circle>
      <DotContainer>
        {blogPosts.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </DotContainer>
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  background-image: url(${blogs});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: scroll; /* or 'fixed' if you want parallax effect */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 3rem;
    font-family: 'Segoe UI', sans-serif;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3); /* optional for readability */
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Circle = styled.div`
  width: 520px;
  height: 520px;
  border-radius: 10%;
  background: rgba(255, 255, 255, 0.25); /* translucent background */
  backdrop-filter: blur(10px); /* blur effect */
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: glow 3s infinite ease-in-out;

  @keyframes glow {
    0% { box-shadow: 0 0 15px rgba(66, 133, 244, 0.2); }
    50% { box-shadow: 0 0 30px rgba(66, 133, 244, 0.4); }
    100% { box-shadow: 0 0 15px rgba(66, 133, 244, 0.2); }
  }

  @media (max-width: 500px) {
    width: 90vw;
    height: 90vw;
  }
`;

const Card = styled.div`
  width: 100%;
  max-height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
  }

  .content {
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }

    .category {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 8px;
      font-weight: 600;
    }

    h2 {
      font-size: 1.3rem;
      color: #222;
      margin: 0.6rem 0;
      font-weight: 600;
    }

    .text {
      font-size: 0.95rem;
      color: #444;
      line-height: 1.5;
      max-height: 120px;
      overflow-y: auto;
      text-align: justify;
    }

    .meta {
      font-size: 0.85rem;
      color: #666;
      margin-top: 0.8rem;
      font-style: italic;
    }
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#fff' : '#ccc')};
  margin: 0 5px;
  transition: background-color 0.3s;
`;

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedWrapper = styled.div`
  animation: ${fadeSlide} 0.6s ease-out;
  width: 100%;
  height: 100%;
`;

export default Blog;  