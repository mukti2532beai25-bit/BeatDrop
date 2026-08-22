import React from 'react';
import './premiumpage.css';
import  plans  from '../data/plans.js';

function BeatDropSubscription() {
  return (
    <div className="full-page">
      <nav className="nav-bar">
        <div className="nav-bar-links">
          <a href="#" className="nav-bar-link">Explore</a>
          <a href="#" className="nav-bar-link">Help</a>
          <button className="login-link">Log In</button>
        </div>
      </nav>

      <section className="about-premium">
        <span className="heading">Premium Membership</span>
        <h1 className="title">Experience music the way it was meant to be heard.</h1>
        <p className="subtitle">
          Ad-free tunes, unlimited offline downloads, and pristine HD sound across all devices. Cancel whenever you want.
        </p>

        <div className="benefits">
          <div className="benefit-card">
            <span className="emoji">🚫</span>
            <strong>Ad-Free Music</strong>
            <span>Continuous flow</span>
          </div>
          <div className="benefit-card">
            <span className="emoji">📥</span>
            <strong>Offline Play</strong>
            <span>Save mobile data</span>
          </div>
          <div className="benefit-card">
            <span className="emoji">🎚️</span>
            <strong>320 kbps HD</strong>
            <span>Studio fidelity</span>
          </div>
          <div className="benefit-card">
            <span className="emoji">🔀</span>
            <strong>Unlimited Skips</strong>
            <span>Pick any track</span>
          </div>
        </div>
      </section>

      <section className="plans-section">
        <h2 className="plans-section-heading">Pick your plan</h2>
        <p className="plans-section-subheading">Pay with UPI, Paytm, Net Banking, or Cards</p>

        <div className="plans-cards-container">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="plan-card"
            >
              {plan.badge && (
                <div
                  className="plan-badge"
                  style={{ backgroundColor: plan.themeColor, color: plan.textColor }}
                >
                  {plan.badge}
                </div>
              )}

              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-detail">{plan.description}</p>

              <div className="price">
                <span className="price-symbol">₹</span>
                <span className="price-amount">{plan.price.replace('₹', '')}</span>
                <span className="price-period">/{plan.period}</span>
              </div>

              <div className="upi-payment">
                <span>⚡ Instant UPI Autopay / One-Time</span>
              </div>

              <hr className="card-divider" />

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="check-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="subscribe-btn">
                Get {plan.name}
              </button>

              <p className="terms-note">Terms and conditions apply. Cancel anytime.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Beat Drop India Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BeatDropSubscription;