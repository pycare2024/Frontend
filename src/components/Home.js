import React from 'react';
import './Home.css'
import Header from "../components/Header/Header";
import WhyPsyCare from "../components/WhyPsycare/WhyPsyCare";
import Aboutcon from "../components/AboutCon/AboutCon";
import Psyco from "../components/Psyco/Psyco";
import Blog from "../components/Blog/Blog";
import Working from "../components/Working/Working";
import Review from "../components/Review/Review";


const Home = () => {
  return (
    <div>
      <Header/>
      <WhyPsyCare/>
      <Aboutcon/>
      <Psyco/>
      <Blog/>
      <Working/>
      <Review/>
    </div>
  );
}

export default Home;