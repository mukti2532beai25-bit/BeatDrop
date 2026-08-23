import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <section className="hero-section">
      <Navbar />

      <div className="hero-content">
        
        <div className="hero-text-block">
          <span className="eyebrow">THE NEW ERA OF STREAMING</span>

          <h1 className="hero-title">
            The rhythm inside your head <span>has a playlist now.</span>
          </h1>

          <p className="hero-subtitle">
            BeatDrop turns a simple search into a curated musical journey. No interruptions, no compromises. Just you and the frequencies that move you.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="btn-primary">
              Start listening →
            </Link>
          </div>
        </div>

        <div className="hero-image-block">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=90"
            alt="Concert DJ and Soundwaves"
            className="hero-main-img"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;