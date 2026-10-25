// AuthContext keeps track of "who is logged in" for the whole app.
//
// Any component can do:
//   const { isLoggedIn, user, login, logout } = useAuth();
//
// user looks like { id, displayName, image } (or null when logged out)

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as spotifyLogin, clearTokens, ACCESS_TOKEN_KEY } from "./auth";
import { spotifyFetch } from "../api/spotify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // loading is true until we know if the user is logged in (checked once when the app starts)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Asks Spotify "who am I?" and saves the answer in state.
  // Returns true if it worked, false if it didn't.
  const loadUser = useCallback(async () => {
    try {
      const data = await spotifyFetch("/me");
      let image = null;
      if (data.images && data.images.length > 0) {
        image = data.images[0].url;
      }
      setUser({ id: data.id, displayName: data.display_name, image: image });
      return true;
    } catch (err) {
      console.error("Could not load the user:", err);
      clearTokens();
      setUser(null);
      return false;
    }
  }, []);

  // When the app starts: if we have a saved token, find out who the user is.
  useEffect(() => {
    async function start() {
      if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
        await loadUser();
      }
      setLoading(false);
    }
    start();
  }, [loadUser]);

  function logout() {
    clearTokens();
    setUser(null);
    navigate("/login", { replace: true });
  }

  const value = {
    isLoggedIn: user !== null,
    user: user,
    loading: loading,
    login: spotifyLogin,
    logout: logout,
    loadUser: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
