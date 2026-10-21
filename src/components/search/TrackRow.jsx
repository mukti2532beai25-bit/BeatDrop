import React from "react";

// turns milliseconds into m:ss, for example 215000 -> "3:35"
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  
  let secondsText = String(seconds);
  if (seconds < 10) {
    secondsText = "0" + secondsText;
  }
  return minutes + ":" + secondsText;
}

const TrackRow = ({ track, onPlay }) => {
  return (
    <button type="button" className="track-row" onClick={() => onPlay(track)}>
      {track.image ? (
        <img className="track-cover" src={track.image} alt="" />
      ) : (
        <span className="track-cover track-cover-empty">♪</span>
      )}

      <span className="track-text">
        <span className="track-name">{track.name}</span>
        <span className="track-artists">{track.artists}</span>
      </span>

      <span className="track-duration">{formatDuration(track.durationMs)}</span>
    </button>
  );
};

export default TrackRow;
