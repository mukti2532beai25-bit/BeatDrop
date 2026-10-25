import React from "react";
import { Library } from "lucide-react";

const FALLBACK_IMAGE = "https://placehold.co/300x300/24252a/d4ff32?text=♫";

export default function LibraryCollection({ playlists }) {
  return (
    <section className="library-section">
      <div className="collection-header">
        <div>
          <p className="qalabel">YOUR PLAYLISTS</p>
          <h2>Playlists you own</h2>
        </div>
      </div>

      {playlists.length ? (
        <div className="cl-column">
          {playlists.map((playlist) => (
            <div className="cl-card" key={playlist.id || playlist.name}>
              <div className="cl-img">
                <img src={playlist.image || FALLBACK_IMAGE} alt="" />
              </div>
              <div className="cl-info">
                <span><Library size={11} /> Playlist</span>
                <h3>{playlist.name}</h3>
                <p>{playlist.trackCount} tracks</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="library-empty">No playlists were returned by Spotify.</p>
      )}
    </section>
  );
}
