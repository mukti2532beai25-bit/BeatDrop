import React from "react";
import { Play } from "lucide-react";

const FALLBACK_IMAGE = "https://placehold.co/160x160/24252a/d4ff32?text=♪";

function formatDuration(durationMs) {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return minutes + ":" + seconds;
}
export default function TrackResults({ tracks, onPlay }) {
  return (
    <section className="track-results" aria-live="polite">
      <div className="search-section-heading">
        <div>
          <p className="section-eyebrow">SPOTIFY RESULTS</p>
          <h2>Songs</h2>
        </div>
        <span className="result-count">{tracks.length} shown</span>
      </div>

      <div className="track-list">
        {tracks.map((track) => (
          <button
            type="button"
            className="track-row"
            key={track.id || track.uri || track.name}
            onClick={() => onPlay(track)}
          >
            <img
              className="track-image"
              src={track.image || FALLBACK_IMAGE}
              alt=""
            />
            <span className="track-details">
              <strong>{track.name}</strong>
              <span>{track.artists || "Unknown artist"}</span>
            </span>
            <span className="track-duration">{formatDuration(track.durationMs)}</span>
            <span className="track-play-icon" aria-hidden="true">
              <Play size={16} fill="currentColor" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
