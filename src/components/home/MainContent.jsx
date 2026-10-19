import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
} from "lucide-react";

import { MADE_FOR_YOU, RECENTLY_PLAYED } from "../../data";
import SongCard from "../common/SongCard";

import "./MainContent.css";

export default function MainContent() {
  return (
    <main className="main-content">
      <Nav />

      <div className="core-scroll-area">
        <Core />
      </div>
    </main>
  );
}

function Nav() {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <div className="nav-arrows">
        <button
          className="arrow-btn"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="arrow-btn"
          onClick={() => window.history.forward()}
          aria-label="Go forward"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        className="search-container"
        onClick={() => navigate("/search")}
      >
        <Search size={20} className="search-icon" />

        <input
          type="text"
          placeholder="Artists, songs, albums, podcasts"
          className="search-input"
          readOnly
        />
      </div>

      <div className="profile-actions">
        <button className="explore-btn">
          Explore Premium
        </button>

        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="profile-icon">
          <span className="profile-initials">MK</span>
        </div>
      </div>
    </header>
  );
}

function Core() {
  return (
    <>
      <div className="main-filters">
        <button className="filter-btn active-filter">All</button>
        <button className="filter-btn">Music</button>
        <button className="filter-btn">Podcasts</button>
        <button className="filter-btn">Live</button>
      </div>
      <div className="hero-banner">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-subtitle">CURATED JUST FOR YOU</p>

          <h1 className="hero-title">
            Get Lost in the Sound
          </h1>

          <p className="hero-desc">
            Hit play to kick off your ultimate personalized mix,
            featuring your top tracks and fresh new discoveries.
          </p>

          <div className="hero-buttons">
            <button className="play-btn">
              <span className="play-icon">▶</span>
              Listen Now
            </button>
          </div>
        </div>
      </div>

      <section className="music-section">
        <h2>Made For You</h2>

        <div className="card-grid">
          {MADE_FOR_YOU.map((song, index) => (
            <SongCard
              key={song.id ?? song.title ?? index}
              song={song}
            />
          ))}
        </div>
      </section>

      <section className="music-section">
        <h2>Recently Played</h2>

        <div className="card-grid">
          {RECENTLY_PLAYED.map((song, index) => (
            <SongCard
              key={song.id ?? song.title ?? index}
              song={song}
            />
          ))}
        </div>
      </section>
    </>
  );
}
