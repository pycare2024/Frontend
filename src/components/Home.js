import React from 'react';
import './Home.css'
import Aboutcon from "../components/AboutCon/AboutCon";
import Psyco from "../components/Psyco/Psyco";
import Blog from "../components/Blog/Blog";
import Review from "../components/Review/Review";
import LandingPage from "../components/LandingPage/LandingPage";
import Foot from "../components/Foot/Foot";


const Home = () => {
  return (
    <div>
      <LandingPage/>
      <Aboutcon/>
      <Psyco/>
      <Blog/>
      <Review/>
      <Foot/>
    </div>
  );
}

export default Home;