import React, { useRef, useState } from "react";
import {
  Heart,
  Mic2,
  MonitorSpeaker,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { usePlayer } from "../../player/PlayerContext";
import "./Player.css";

const FALLBACK_IMAGE = "https://placehold.co/160x160/24252a/d4ff32?text=♪";

function formatTime(milliseconds) {
  const totalSeconds = Math.floor((milliseconds || 0) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return minutes + ":" + seconds;
}

export default function Player() {
  const {
    error,
    currentTrack,
    isPlaying,
    positionMs,
    durationMs,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
  } = usePlayer();
  const [volume, setLocalVolume] = useState(60);
  const progressRef = useRef(null);

  const progressPercent = durationMs
    ? Math.min(100, (positionMs / durationMs) * 100)
    : 0;

  const handleVolumeChange = (event) => {
    const value = Number(event.target.value);
    setLocalVolume(value);
    setVolume(value);
  };

  const handleProgressClick = (event) => {
    if (!durationMs || !progressRef.current) {
      return;
    }

    const bounds = progressRef.current.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / bounds.width;
    seek(Math.min(1, Math.max(0, ratio)) * durationMs);
  };

  const volumeSliderStyle = {
    background: "linear-gradient(to right, #D4FF32 " + volume + "%, #444 " + volume + "%)",
  };

  return (
    <div className="player-container">
      <div className="player-left">
        <img
          src={currentTrack?.image || FALLBACK_IMAGE}
          alt=""
          className="album-art"
        />
        <div className="song-info">
          <h4>{currentTrack?.name || "Nothing playing"}</h4>
          <p>{currentTrack?.artists || "Choose a song to start listening"}</p>
        </div>
        <button className="icon-btn heart-btn" type="button" title="Like song" disabled={!currentTrack}>
          <Heart size={18} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="icon-btn" type="button" title="Shuffle" disabled={!currentTrack}>
            <Shuffle size={18} />
          </button>
          <button className="icon-btn" type="button" title="Previous" onClick={previous} disabled={!currentTrack}>
            <SkipBack size={20} />
          </button>

          <button
            className="play-pause-btn"
            type="button"
            title={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            disabled={!currentTrack}
          >
            {isPlaying
              ? <Pause size={19} fill="#121212" color="#121212" />
              : <Play size={20} fill="#121212" color="#121212" />}
          </button>

          <button className="icon-btn" type="button" title="Next" onClick={next} disabled={!currentTrack}>
            <SkipForward size={20} />
          </button>
          <button className="icon-btn" type="button" title="Repeat" disabled={!currentTrack}>
            <Repeat size={18} />
          </button>
        </div>

        <div className="progress-container">
          <span className="time-text">{formatTime(positionMs)}</span>
          <div
            className="progress-bar-bg"
            ref={progressRef}
            onClick={handleProgressClick}
            role="slider"
            tabIndex={0}
            aria-label="Track progress"
            aria-valuemin="0"
            aria-valuemax={durationMs}
            aria-valuenow={positionMs}
          >
            <div className="progress-bar-fill" style={{ width: progressPercent + "%" }} />
          </div>
          <span className="time-text">{formatTime(durationMs)}</span>
        </div>
      </div>

      <div className="player-right">
        <button className="icon-btn" type="button" title="Lyrics">
          <Mic2 size={18} />
        </button>
        <button className="icon-btn" type="button" title="Connect to a device">
          <MonitorSpeaker size={18} />
        </button>
        <div className="volume-container">
          <Volume2 size={18} className="volume-icon" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={volumeSliderStyle}
            aria-label="Volume"
          />
        </div>
      </div>

      {error && <div className="player-error" role="status">{error}</div>}
    </div>
  );
}
