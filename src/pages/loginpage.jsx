import React, { useState } from "react";
import { ArrowLeft, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { login } from "../auth/auth";
import "./loginpage.css";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSpotifyLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      await login();
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : "Unable to start Spotify login.");
    }
  };

  return (
    <main className="login-page-container">
      <Link to="/" className="login-back-link">
        <ArrowLeft size={16} />
        Back to BeatDrop
      </Link>

      <section className="login-card" aria-label="BeatDrop login">
        <div className="login-logo">
          <span className="login-logo-icon">
            <Headphones size={18} />
          </span>
          <span>BeatDrop</span>
        </div>

        <p className="login-label">WELCOME BACK</p>
        <h1>Log in to BeatDrop</h1>
        <p className="login-description">
          Connect your Spotify account to start listening.
        </p>

        <button
          className="spotify-login-btn"
          type="button"
          onClick={handleSpotifyLogin}
          disabled={isLoading}
        >
          <span className="spotify-icon">●</span>
          {isLoading ? "Connecting..." : "Continue with Spotify"}
        </button>

        {error && <p className="error-text" role="alert">{error}</p>}

        <p className="login-note">
          You will be redirected to Spotify for secure sign-in.
        </p>

        <div className="login-divider">
          <span>New to BeatDrop?</span>
        </div>

        <button
          className="secondary-login-btn"
          type="button"
          onClick={handleSpotifyLogin}
          disabled={isLoading}
        >
          Create an account with Spotify
        </button>
      </section>
    </main>
  );
}
