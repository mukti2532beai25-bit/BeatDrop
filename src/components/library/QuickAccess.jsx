import React from "react";
import { BarChart3, Clock, Download, Heart } from "lucide-react";

export default function QuickAccess({ savedTracks, recentTracks, topTracks }) {
  const cards = [
    { id: "liked", title: "Saved songs", description: savedTracks.length + " tracks", icon: <Heart size={20} fill="#8ab52d" /> },
    { id: "recent", title: "Recently played", description: recentTracks.length + " tracks loaded", icon: <Clock size={20} /> },
    { id: "top", title: "Top tracks", description: topTracks.length + " tracks loaded", icon: <BarChart3 size={20} /> },
    { id: "downloaded", title: "Downloads", description: "Not available from Spotify Web API", icon: <Download size={20} /> },
  ];

  return (
    <section className="library-section">
      <div className="qaheading">
        <div>
          <p className="qalabel">QUICK ACCESS</p>
          <h2>Jump back in</h2>
        </div>
      </div>

      <div className="qacards">
        {cards.map((item) => (
          <div className="quickcard" key={item.id}>
            <div className="qaicon">{item.icon}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
