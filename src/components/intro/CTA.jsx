import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="bottom-cta-section">
      <div className="cta-banner dark-bg">
        <h2 className="section-serif-title">Your soundtrack, <span>on the record.</span></h2>
        <p>Join the ecosystem today. Harmony is granted by the music.</p>
        <Link to="/home" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Launch Web Player</Link>
      </div>
    </section>
  );
};

export default CTA;