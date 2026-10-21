import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { STATE_KEY, exchangeCodeForToken } from "./auth";
import { useAuth } from "./AuthContext";

export default function Callback() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    // Handle an unsuccessful Spotify login.
    if (error || !code) {
      navigate("/login", { replace: true });
      return;
    }

    // Verify that the returned state matches the saved state.
    const savedState = localStorage.getItem(STATE_KEY);

    if (!state || !savedState || savedState !== state) {
      navigate("/login", { replace: true });
      return;
    }

    async function finishLogin() {
      try {
        // Exchange the authorization code for Spotify tokens.
        await exchangeCodeForToken(code);

        // Load the authenticated Spotify user's profile.
        const ok = await loadUser();

        if (ok) {
          navigate("/home", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Spotify login failed:", err);
        navigate("/login", { replace: true });
      }
    }

    finishLogin();
  }, [navigate, loadUser]);

  return <p>Logging you in...</p>;
}