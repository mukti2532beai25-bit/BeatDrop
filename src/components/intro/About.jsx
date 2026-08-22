import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-image-block">
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
            alt="High-end Studio Equipment"
            className="about-main-img"
          />
        </div>
        <div className="about-text">
          <h2 className="section-serif-title">What is <span>BeatDrop?</span></h2>
          <p>
            BeatDrop is not just another media player; it is a living, breathing ecosystem of sound. We bridge the gap between underground bedroom producers and mainstream audiophiles.
          </p>
          <p>
            By decentralizing the catalog and focusing purely on the acoustic experience, BeatDrop strips away the visual clutter of modern social media and returns music to its purest form. Whether you are hunting for lofi beats for a late-night coding session or high-energy EDM for a workout, BeatDrop curates the exact vibration your soul requires.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;