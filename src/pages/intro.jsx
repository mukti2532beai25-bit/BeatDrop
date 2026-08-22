import React from 'react';
import './intro.css';
import Hero from '../components/intro/Hero';
import About from '../components/intro/About';
import Features from '../components/intro/Features';
import TechStack from '../components/intro/TechStack';
import CTA from '../components/intro/CTA';
import Footer from '../components/intro/Footer';

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