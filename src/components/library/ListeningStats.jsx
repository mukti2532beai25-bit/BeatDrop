import React from "react";
import { Clock, Headphones, Music, ListMusic } from "lucide-react";

function formatMinutes(tracks) {
  const milliseconds = tracks.reduce((sum, track) => sum + (track.durationMs || 0), 0);
  return Math.round(milliseconds / 60000) + " min";
}

export default function ListeningStats({ savedTracks, recentTracks, topTracks }) {
  const stats = [
    { label: "Saved songs", value: savedTracks.length, icon: <Music size={22} /> },
    { label: "Recent tracks", value: recentTracks.length, icon: <Clock size={22} /> },
    { label: "Top tracks", value: topTracks.length, icon: <ListMusic size={22} /> },
    { label: "Top-track duration", value: formatMinutes(topTracks), icon: <Headphones size={22} /> },
  ];

  return (
    <section className="library-section">
      <div className="qaheading">
        <div>
          <p className="qalabel">AVAILABLE DATA</p>
          <h2>Listening overview</h2>
        </div>
      </div>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
