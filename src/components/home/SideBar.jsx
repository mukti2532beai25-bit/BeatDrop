import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import './SideBar.css';

export default function SideBar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="logo-dot"></div>
        </div>
        <h2>BeatDrop</h2>
      </div>

      <NavLink
        to="/home"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
      >
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
      >
        <Search size={20} />
        <span>Search</span>
      </NavLink>

      <NavLink
        to="/library"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
      >
        <Library size={20} />
        <span>Your Library</span>
      </NavLink>

      <div className="sidebar-scroll-area">

        <div className="library-section">
          <div className="library-header">
            <p>YOUR LIBRARY</p>
            <button className="icon-btn"><Plus size={18} /></button>
          </div>

          <div className="library-tags">
            <span className="tag active-tag">All</span>
            <span className="tag">Playlists</span>
            <span className="tag">Albums</span>
            <span className="tag">Artists</span>
          </div>

          {/* Drop as many custom playlists in here as you want! */}
          <div className="liked-songs-item">
            <div className="liked-icon-bg">
              <Heart size={16} color="white" fill="white" />
            </div>
            <div className="liked-text">
              <h4>Liked Songs</h4>
              <p>Playlist • 342 songs</p>
            </div>
          </div>
        </div>

        <div className="premium-card">
          <h4>Try BeatDrop Premium</h4>
          <p>Ad-free, offline, hi-fi audio — one month free.</p>
          <Link to="/premium" className="premium-btn">
            Get started
          </Link>
        </div>

      </div>

    </aside>
  );
}