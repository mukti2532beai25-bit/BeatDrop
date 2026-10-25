import React from "react";
import { Play } from "lucide-react";

const FALLBACK_IMAGE = "https://placehold.co/160x160/24252a/d4ff32?text=♪";

function formatDuration(durationMs) {
  const totalSeconds = Math.floor((durationMs || 0) / 1000);
  return Math.floor(totalSeconds / 60) + ":" + String(totalSeconds % 60).padStart(2, "0");
}

export default function RecentlyPlayed({ tracks, onPlay }) {
  return (
    <section className="library-section">
      <div className="qaheading">
        <div>
          <p className="qalabel">HISTORY</p>
          <h2>Recently played</h2>
        </div>
      </div>

      {tracks.length ? (
        <div className="rpcard">
          {tracks.map((track, index) => (
            <div className="recentsong" key={track.id || track.uri || index}>
              <span className="songno">{index + 1}</span>
              <img src={track.image || FALLBACK_IMAGE} alt="" className="songimg" />
              <div className="songinfo">
                <h3>{track.name}</h3>
                <p>{track.artists || "Unknown artist"}</p>
              </div>
              <span className="songlist">{track.playedAt ? new Date(track.playedAt).toLocaleDateString() : "Recently"}</span>
              <span className="songtime">{formatDuration(track.durationMs)}</span>
              <button className="song-btn" type="button" title="Play" onClick={() => onPlay(track)}>
                <Play size={16} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="library-empty">Nothing played recently.</p>
      )}
    </section>
  );
}
