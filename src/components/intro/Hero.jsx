import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <section className="hero-section">
      <Navbar />

      <div className="hero-content">

        {/* LEFT SIDE */}
        <div className="hero-text-block">
          <span className="eyebrow">
            THE NEW ERA OF STREAMING
          </span>

          <h1 className="hero-title">
            The rhythm inside your head{' '}
            <span>has a playlist now.</span>
          </h1>

          <p className="hero-subtitle">
            BeatDrop turns a simple search into a curated musical journey.
            No interruptions, no compromises. Just you and the frequencies
            that move you.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="btn-primary">
              Start listening →
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="hero-cards">

          <div className="hero-feature-card dark-card">
            <span className="live-badge">
              LIVE
            </span>

            <div className="card-info">
              <p className="card-title">
                Spatial Audio Stream
              </p>

              <p className="card-subtitle">
                Lossless • 320 kbps
              </p>
            </div>
          </div>

          <div className="hero-feature-card lime-card">
            <p className="big-number">
              50M+
            </p>

            <p className="card-title">
              Tracks
            </p>

            <p className="card-subtitle">
              18.4k Live Tuning In
            </p>
          </div>

          <div className="hero-feature-card light-card">
            <span className="card-icon">
              ♪
            </span>

            <div>
              <p className="card-title">
                Your Sound. Your Rules.
              </p>

              <p className="card-subtitle">
                Personalized playlists powered by your taste.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;