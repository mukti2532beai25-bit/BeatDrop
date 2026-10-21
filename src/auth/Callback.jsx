import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { STATE_KEY, exchangeCodeForToken } from "./auth";
import { useAuth } from "./AuthContext";

export default function Callback() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  useEffect(() => {
    // 1. read the query string: new URLSearchParams(window.location.search)
    const params = new URLSearchParams(window.location.search);

    // 2. get "code", "state" and "error" from it with .get("...")
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    // 3. if there is an error, or no code: navigate("/login", { replace: true }) and return
    if (error || !code) {
      navigate("/login", { replace: true });
      return;
    }

    // 4. read the saved state from localStorage (STATE_KEY)
    //    if it doesn't equal the state from the URL: navigate to "/login" and return
    const savedState = localStorage.getItem(STATE_KEY);
    if (!state || !savedState || savedState !== state) {
      navigate("/login", { replace: true });
      return;
    }

    async function finishLogin() {
      try {
        await exchangeCodeForToken(code);
        // ask Spotify who the user is, so the rest of the app knows we are logged in
        const ok = await loadUser();
        if (ok) {
          navigate("/home", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Login failed:", err);
        navigate("/login", { replace: true });
      }
    }
    finishLogin();
  }, [navigate, loadUser]);

  return <p>Logging you in...</p>;
}
<<<<<<< HEAD

=======
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
