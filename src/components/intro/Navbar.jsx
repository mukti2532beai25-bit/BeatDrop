import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-icon">◉</span>
        <span className="logo-text">BeatDrop</span>
      </div>
      <div className="nav-links">
        <a href="#about" className="nav-link">About</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#tech" className="nav-link">Tech</a>
        <Link to="/login" className="btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;