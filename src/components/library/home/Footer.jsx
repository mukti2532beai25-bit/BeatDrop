import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-col brand-col">
          <div className="nav-logo">
            <span className="logo-icon">◉</span>
            <span className="footer-logo-text">BeatDrop</span>
          </div>
          <p className="brand-desc">Built for uninterrupted musical journeys. High fidelity audio for everyone.</p>
        </div>
        <div className="footer-col">
          <h4>Technology</h4>
          <a href="#react">React Docs</a>
          <a href="#audius">Audius Protocol</a>
          <a href="#github">GitHub Repo</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#legal">Terms of Service</a>
          <a href="#privacy">Privacy Center</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 BeatDrop Audio. A conceptual clone project.</p>
      </div>
    </footer>
  );
};

export default Footer;