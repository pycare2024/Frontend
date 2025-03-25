import React from 'react';
import styled from 'styled-components';

import blogImage1 from '../Blog/pag2img1.jpg';
import blogImage2 from '../Blog/pag2img1.jpg';
import blogImage3 from '../Blog/pag2img1.jpg';

// Sample images (replace with actual image URLs for Psycare)
// const blogImage1 = "/pag2img1.jpg"; 
// import blogImage2 from 'pag2img1.jpg'; 
// import blogImage3 from './pag2img1.jpg'; 

const Blog = () => {
  return (
    <BlogContainer>
      <BlogTitle>Healing Minds: Your Journey to Mental Wellness</BlogTitle>
      <BlogGrid>
        {/* Blog Post 1 */}
        <BlogCard className="large">
          <BlogImage src={blogImage1} alt="Blog Post 1" />
          <BlogContent>
            <BlogCategory>MENTAL HEALTH</BlogCategory>
            <BlogHeading>Understanding Anxiety: Distribution of mental health overcomers by profession</BlogHeading>
            <BlogText>
            The distribution of mental health overcomers varies across professions, with some careers facing higher mental health challenges due to stress, workload, and work-life balance. Studies show that healthcare workers, first responders, and corporate professionals report higher recovery rates due to workplace support programs and therapy access. Creative professionals and entrepreneurs often rely on self-care and peer support, while athletes and military personnel benefit from structured mental resilience training. Overall, the journey to overcoming mental health struggles is influenced by access to resources, social support, and individual coping mechanisms.
            </BlogText>
            <BlogMeta>
              <span>260 views</span> • <span>20 likes</span>
            </BlogMeta>
          </BlogContent>
        </BlogCard>

        {/* Blog Post 2 */}
        <BlogCard className="medium">
          <BlogImage src={blogImage2} alt="Blog Post 2" />
          <BlogContent>
            <BlogCategory>SELF-CARE</BlogCategory>
            <BlogHeading>Mental Illness Across Age Groups</BlogHeading>
            <BlogText>
            Mental illness is most common in young adults (18-25) due to life stressors. Middle-aged adults (26-49) face work and family pressures, while older adults (50+) experience lower reported rates but may struggle with depression and cognitive decline.
            </BlogText>
            <BlogMeta>
              <span>157 views</span> • <span>31 likes</span>
            </BlogMeta>
          </BlogContent>
        </BlogCard>

        {/* Blog Post 3 */}
        <BlogCard className="small">
          <BlogImage src={blogImage3} alt="Blog Post 3" />
          <BlogContent>
            <BlogCategory>SELF-CARE</BlogCategory>
            <BlogHeading>5 Mindfulness Tips for Beginners</BlogHeading>
            <BlogText>
            Starting a mindfulness practice can be transformative. Here are five simple tips to help you stay present and reduce stress in your daily life.
            </BlogText>
            <BlogMeta>
              <span>10 views</span> • <span>1 like</span>
            </BlogMeta>
          </BlogContent>
        </BlogCard>
      </BlogGrid>
    </BlogContainer>
  );
};

// Styled Components (CSS)
const BlogContainer = styled.div`
  padding: 50px 20px;
  background-color: #4285F4; /* Light gray background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 40px;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &.large {
    grid-column: span 2;
    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }

  &.medium {
    grid-column: span 1;
  }

  &.small {
    grid-column: span 1;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogCategory = styled.p`
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const BlogHeading = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  font-family: 'Arial', sans-serif;
`;

const BlogText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const BlogMeta = styled.div`
  font-size: 0.9rem;
  color: #888;
  display: flex;
  gap: 10px;
`;

export default Blog;
