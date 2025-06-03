// src/Home.jsx
import React from 'react';
import LandingPage from "../landingpage/LandingPage"
import HowItWorks from '../howitworks/HowItWorks';
import Testimonials from '../testimonials/Testimonials';

const Home = () => {
  return (
    <div>
      <LandingPage/>
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;
