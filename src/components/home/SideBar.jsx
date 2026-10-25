import React, { useEffect, useState } from "react";
import { Heart, Home, Library, Plus, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { getMyPlaylists } from "../../api/library";
import "./SideBar.css";

export default function SideBar() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getMyPlaylists()
      .then((items) => {
        if (!cancelled) {
          setPlaylists(items);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Playlists unavailable");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="logo-dot" />
        </div>
        <h2>BeatDrop</h2>
      </div>

      <NavLink to="/home" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/search" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
        <Search size={20} />
        <span>Search</span>
      </NavLink>

      <NavLink to="/library" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
        <Library size={20} />
        <span>Your Library</span>
      </NavLink>

      <div className="sidebar-scroll-area">
        <div className="library-section">
          <div className="library-header">
            <p>{user?.displayName || "YOUR LIBRARY"}</p>
            <button className="icon-btn" type="button" title="Create playlist">
              <Plus size={18} />
            </button>
          </div>

          <div className="library-tags">
            <span className="tag active-tag">All</span>
            <span className="tag">Playlists</span>
          </div>

          <Link to="/library" className="liked-songs-item">
            <div className="liked-icon-bg">
              <Heart size={16} color="white" fill="white" />
            </div>
            <div className="liked-text">
              <h4>Liked Songs</h4>
              <p>Saved tracks</p>
            </div>
          </Link>

          <div className="sidebar-playlist-list">
            {playlists.map((playlist) => (
              <Link to="/library" className="sidebar-playlist" key={playlist.id || playlist.name}>
                <span className="sidebar-playlist-image">
                  {playlist.image
                    ? <img src={playlist.image} alt="" />
                    : <span>♫</span>}
                </span>
                <span>
                  <strong>{playlist.name}</strong>
                  <small>{playlist.trackCount} tracks</small>
                </span>
              </Link>
            ))}
            {!playlists.length && !error && <p className="sidebar-muted">Loading playlists...</p>}
            {error && <p className="sidebar-muted">{error}</p>}
          </div>
        </div>

        <div className="premium-card">
          <h4>Try BeatDrop Premium</h4>
          <p>Ad-free, offline, hi-fi audio — one month free.</p>
          <Link to="/premium" className="premium-btn">Get started</Link>
        </div>
      </div>
    </aside>
  );
}
