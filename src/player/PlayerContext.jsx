import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getAccessToken } from "../auth/auth";
import { spotifyFetch } from "../api/spotify";
import { normalizeTrack } from "../api/normalize";

const SDK_URL = "https://sdk.scdn.co/spotify-player.js";
const PlayerContext = createContext(null);

function loadSpotifySdk() {
  if (window.Spotify) {
    return Promise.resolve(window.Spotify);
  }

  if (window.__beatDropSpotifySdkPromise) {
    return window.__beatDropSpotifySdkPromise;
  }

  window.__beatDropSpotifySdkPromise = new Promise((resolve, reject) => {
    const previousReadyHandler = window.onSpotifyWebPlaybackSDKReady;

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (typeof previousReadyHandler === "function") {
        previousReadyHandler();
      }
      resolve(window.Spotify);
    };

    let script = document.querySelector('script[src="' + SDK_URL + '"]');

    if (!script) {
      script = document.createElement("script");
      script.src = SDK_URL;
      script.async = true;
      script.onerror = () => reject(new Error("Could not load the Spotify playback SDK."));
      document.body.appendChild(script);
    }
  });

  return window.__beatDropSpotifySdkPromise;
}

function getPlaybackErrorMessage(message) {
  if (message === "account_error") {
    return "Spotify Premium is required for browser playback.";
  }

  if (message === "authentication_error") {
    return "Spotify authentication expired. Please log in again.";
  }

  return message || "Spotify playback could not start.";
}

export function PlayerProvider({ children }) {
  const playerRef = useRef(null);
  const deviceIdRef = useRef(null);
  const mountedRef = useRef(true);

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;
    let player = null;

    const createPlayer = async () => {
      try {
        const Spotify = await loadSpotifySdk();

        if (cancelled || !Spotify) {
          return;
        }

        player = new Spotify.Player({
          name: "BeatDrop",
          volume: 0.6,
          getOAuthToken: (callback) => {
            getAccessToken()
              .then(callback)
              .catch(() => {
                if (mountedRef.current) {
                  setError("Spotify authentication expired. Please log in again.");
                }
              });
          },
        });

        playerRef.current = player;

        const handleReady = ({ device_id: deviceId }) => {
          deviceIdRef.current = deviceId;
          setIsReady(true);
          setError("");
        };

        const handleNotReady = () => {
          deviceIdRef.current = null;
          setIsReady(false);
          setError("The BeatDrop playback device is no longer available.");
        };

        const handlePlayerStateChanged = (state) => {
          if (!state) {
            setCurrentTrack(null);
            setIsPlaying(false);
            setPositionMs(0);
            setDurationMs(0);
            return;
          }

          const rawTrack = state.track_window?.current_track;
          const track = rawTrack ? normalizeTrack(rawTrack) : null;

          setCurrentTrack(track);
          setIsPlaying(!state.paused);
          setPositionMs(state.position || 0);
          setDurationMs(track?.durationMs || 0);
        };

        const handleInitializationError = ({ message }) => {
          setError(getPlaybackErrorMessage(message));
        };

        const handleAuthenticationError = ({ message }) => {
          setError(getPlaybackErrorMessage(message));
        };

        const handleAccountError = ({ message }) => {
          setError(getPlaybackErrorMessage(message || "account_error"));
        };

        const handlePlaybackError = ({ message }) => {
          setError(getPlaybackErrorMessage(message));
        };

        const handleAutoplayFailed = () => {
          setError("Click the play button once to allow audio in this browser.");
        };

        player.addListener("ready", handleReady);
        player.addListener("not_ready", handleNotReady);
        player.addListener("player_state_changed", handlePlayerStateChanged);
        player.addListener("initialization_error", handleInitializationError);
        player.addListener("authentication_error", handleAuthenticationError);
        player.addListener("account_error", handleAccountError);
        player.addListener("playback_error", handlePlaybackError);
        player.addListener("autoplay_failed", handleAutoplayFailed);

        const connected = await player.connect();

        if (!connected) {
          setError("BeatDrop could not connect to Spotify playback.");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Spotify playback is unavailable.");
        }
      }
    };

    createPlayer();

    return () => {
      cancelled = true;
      mountedRef.current = false;

      if (player) {
        player.disconnect();
      }

      playerRef.current = null;
      deviceIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setPositionMs((currentPosition) => {
        const nextPosition = currentPosition + 500;
        return durationMs ? Math.min(nextPosition, durationMs) : nextPosition;
      });
    }, 500);

    return () => window.clearInterval(timer);
  }, [isPlaying, durationMs]);

  const playTrack = useCallback(async (uri) => {
    if (!uri) {
      setError("This track does not have a playable Spotify URI.");
      return false;
    }

    const player = playerRef.current;
    const deviceId = deviceIdRef.current;

    try {
      await player?.activateElement();

      if (!player || !deviceId || !isReady) {
        setError("Spotify playback is still connecting. Try again in a moment.");
        return false;
      }

      await spotifyFetch(
        "/me/player/play?device_id=" + encodeURIComponent(deviceId),
        {
          method: "PUT",
          body: { uris: [uri] },
        },
      );

      setError("");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not play this track.");
      return false;
    }
  }, [isReady]);

  const togglePlay = useCallback(async () => {
    if (!playerRef.current) {
      setError("Spotify playback is not ready yet.");
      return;
    }

    try {
      await playerRef.current.togglePlay();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change playback.");
    }
  }, []);

  const next = useCallback(async () => {
    try {
      await playerRef.current?.nextTrack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not skip to the next track.");
    }
  }, []);

  const previous = useCallback(async () => {
    try {
      await playerRef.current?.previousTrack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not return to the previous track.");
    }
  }, []);

  const seek = useCallback(async (ms) => {
    if (!playerRef.current || !Number.isFinite(ms)) {
      return;
    }

    try {
      await playerRef.current.seek(Math.max(0, ms));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not seek in this track.");
    }
  }, []);

  const setVolume = useCallback(async (value) => {
    if (!playerRef.current || !Number.isFinite(value)) {
      return;
    }

    const safeValue = Math.min(100, Math.max(0, value));

    try {
      await playerRef.current.setVolume(safeValue / 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change the volume.");
    }
  }, []);

  const value = {
    isReady,
    error,
    currentTrack,
    isPlaying,
    positionMs,
    durationMs,
    playTrack,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }

  return context;
}
