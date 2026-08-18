import React from 'react';

const techItems = [
  {
    icon: '⚛️',
    title: 'React.js',
    desc: 'The entire user interface is built on React, ensuring component-driven architecture, instant state updates, and a seamless SPA experience.',
  },
  {
    icon: '🎧',
    title: 'Audius API',
    desc: 'We harness the power of the decentralized Audius API to fetch millions of tracks dynamically without the licensing bloat.',
  },
  {
    icon: '🌊',
    title: 'Web Audio API',
    desc: 'Under the hood, BeatDrop uses the native HTML5 Web Audio API to handle complex audio routing and seamless crossfading.',
  },
];

const TechStack = () => {
  return (
    <section id="tech" className="tech-stack-section">
      <div className="tech-header">
        <h2 className="section-serif-title">Powered by <span>modern tech</span></h2>
        <p>Built for developers, by developers. BeatDrop leverages the cutting edge of web technologies to deliver a buttery-smooth auditory experience.</p>
      </div>

      <div className="tech-row">
        {techItems.map((item) => (
          <div className="tech-card" key={item.title}>
            <div className="tech-icon-circle">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;