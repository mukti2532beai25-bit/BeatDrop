import React from 'react';

const Features = () => {
  return (
    <section id="features" className="features-section">
      <h2 className="section-serif-title text-center">Browse all <span>features</span></h2>

      <div className="features-container">
        {/* Feature 1: Large Box */}
        <div className="feature-box box-large dark-bg">
          <div className="feature-text-content">
            <h3>Lossless Hi-Fi Audio</h3>
            <p>Experience studio-quality sound. Hear every breath, every string scratch, and every 808 drop exactly as the artist intended.</p>
          </div>
        </div>

        <div className="features-row-small">
          {/* Feature 2: Small Box */}
          <div className="feature-box box-small lime-bg">
            <div className="box-icon">✦</div>
            <h3>Algorithmic Discovery</h3>
            <p>Our neural networks analyze your listening habits to predict your next favorite obsession.</p>
          </div>

          {/* Feature 3: Small Box */}
          <div className="feature-box box-small light-bg border-bg">
            <div className="box-icon">☁️</div>
            <h3>Offline Vault</h3>
            <p>Going off the grid? Download up to 10,000 tracks directly to your local storage for zero-buffering playback.</p>
          </div>
        </div>

        {/* Feature 4: Wide Box */}
        <div className="feature-box box-wide dark-bg">
          <div className="wide-content-left">
            <h3>Cross-Platform Sync</h3>
            <p>Start a playlist on your desktop web app, pause it, and seamlessly resume on your phone during your commute. BeatDrop remembers exactly where you left the groove.</p>
          </div>
          <div className="wide-content-right">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
              alt="Mobile Sync App"
              className="side-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;