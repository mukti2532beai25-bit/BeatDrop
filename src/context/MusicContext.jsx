import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "../auth/AuthContext";

import {
  getTopTracks,
  getRecentlyPlayed,
  getMyPlaylists,
  getSavedTracks,
} from "../auth/api/library";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const { isLoggedIn, loading: authLoading } = useAuth();

  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshMusic = useCallback(async () => {
    if (!isLoggedIn) {
      setTopTracks([]);
      setRecentlyPlayed([]);
      setPlaylists([]);
      setLikedSongs([]);
      setError("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const results = await Promise.allSettled([
        getTopTracks(),
        getRecentlyPlayed(),
        getMyPlaylists(),
        getSavedTracks(),
      ]);

      const setters = [
        setTopTracks,
        setRecentlyPlayed,
        setPlaylists,
        setLikedSongs,
      ];

      const labels = [
        "top tracks",
        "recently played tracks",
        "playlists",
        "liked songs",
      ];

      const failedRequests = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          setters[index](result.value ?? []);
        } else {
          failedRequests.push(labels[index]);
          console.error(
            `Failed to load ${labels[index]}:`,
            result.reason
          );
        }
      });

      if (failedRequests.length === results.length) {
        setError("We couldn't load your Spotify data. Please try again.");
      } else if (failedRequests.length > 0) {
        setError(
          `Some Spotify data couldn't be loaded: ${failedRequests.join(", ")}.`
        );
      }
    } catch (err) {
      setError(err.message || "Unable to load Spotify data.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Wait until authentication has finished checking the saved token.
    if (!authLoading) {
      refreshMusic();
    }
  }, [authLoading, refreshMusic]);

  const value = {
    topTracks,
    recentlyPlayed,
    playlists,
    likedSongs,
    isLoading,
    error,
    refreshMusic,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (context === null) {
    throw new Error(
      "useMusic must be used inside a MusicProvider."
    );
  }

  return context;
}