import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
} from "lucide-react";

import "./SideBar.css";

export default function SideBar() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Playlists", "Albums", "Artists"];

  return (
    <aside className="sidebar">
      {/* BeatDrop logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="logo-dot"></div>
        </div>

        <h2>BeatDrop</h2>
      </div>

      {/* Main navigation */}
      <nav className="sidebar-navigation">
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
      </nav>

      {/* Library section */}
      <div className="sidebar-scroll-area">
        <div className="library-section">
          <div className="library-header">
            <p>YOUR LIBRARY</p>

            <button
              type="button"
              className="icon-btn"
              title="Create playlist"
              aria-label="Create playlist"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Interactive library filters */}
          <div className="library-tags">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`tag ${
                  activeFilter === filter ? "active-tag" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Liked songs */}
          <Link to="/library" className="liked-songs-item">
            <div className="liked-icon-bg">
              <Heart size={16} color="white" fill="white" />
            </div>

            <div className="liked-text">
              <h4>Liked Songs</h4>
              <p>Playlist • Your favorite tracks</p>
            </div>
          </Link>
        </div>

        {/* Premium card */}
        <div className="premium-card">
          <h4>Try BeatDrop Premium</h4>

          <p>
            Ad-free, offline, hi-fi audio — one month free.
          </p>

          <Link to="/premium" className="premium-btn">
            Get started
          </Link>
        </div>
      </div>
    </aside>
  );
}