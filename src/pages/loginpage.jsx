import React, { useState } from 'react';
import './loginpage.css';
import { Link } from "react-router-dom";
import { login } from "../auth/auth";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const correctEmail = "abc@gmail.com";
    const correctPassword = "12345";

    if (email === correctEmail && password === correctPassword) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };


  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2>Log in to BeatDrop</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or username"
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <Link to="/home" className="login-submit-btn">
            Log In
          </Link>
        </form>

        <div className="divider"><span>Or log in with</span></div>

        <button className="social-btn" type="button" onClick={login}>Continue with Spotify</button>

        <p className="signup-option">
          Don't have an account? <Link to="/home">Sign up for BeatDrop</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;