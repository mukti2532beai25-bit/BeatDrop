
import { useState } from "react";
import { login } from "../auth/auth";
import "./loginpage.css";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      await login();
    } catch (err) {
      setError(err.message || "Unable to start BeatDrop login.");
      setLoading(false);
    }
  }

  return (
    <main className="beatdrop-login">
      <section className="login-card">
        <div className="brand-mark">♫</div>
        <h1 className="brand-title">BeatDrop</h1>
        <h2>Log in to continue</h2>
        <p className="login-subtitle">Your music, your vibe.</p>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
          type="button"
        >
          {loading ? "Connecting..." : "Continue with BeatDrop"}
        </button>

        {error && <p className="login-error" role="alert">{error}</p>}

        <p className="login-footer">Made for music lovers.</p>
      </section>
    </main>
  );
}
