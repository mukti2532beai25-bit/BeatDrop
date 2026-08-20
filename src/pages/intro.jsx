import React from 'react';
import './home.css';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Features from './components/home/Features';
import TechStack from './components/home/TechStack';
import CTA from './components/home/CTA';
import Footer from './components/home/Footer';

const BeatDropLanding = () => {
  return (
    <div className="landing-container">
      <Hero />
      <About />
      <Features />
      <TechStack/>
      <CTA/>
      <Footer/>
    </div>
  );
};

export default BeatDropLanding;