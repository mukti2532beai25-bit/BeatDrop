import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { getMyPlaylists, getRecentlyPlayed, getTopTracks } from "../../api/library";
import { usePlayer } from "../../player/PlayerContext";
import "./MainContent.css";

const FALLBACK_IMAGE = "https://placehold.co/400x400/24252a/d4ff32?text=♪";

function TrackCard({ track, onPlay }) {
  return (
    <div className="music-card">
      <div className="card-img-wrapper">
        <img
          src={track.image || FALLBACK_IMAGE}
          alt=""
          className="card-img"
        />
        <button
          className="card-play-overlay"
          type="button"
          title={"Play " + track.name}
          onClick={() => onPlay(track)}
        >
          <Play size={18} fill="#121212" color="#121212" />
        </button>
      </div>
      <h4>{track.name}</h4>
      <p>{track.artists || "Unknown artist"}</p>
    </div>
  );
}

function PlaylistCard({ playlist }) {
  return (
    <div className="music-card">
      <div className="card-img-wrapper">
        <img
          src={playlist.image || FALLBACK_IMAGE}
          alt=""
          className="card-img"
        />
      </div>
      <h4>{playlist.name}</h4>
      <p>{playlist.trackCount} tracks</p>
    </div>
  );
}

export default function MainContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { playTrack } = usePlayer();
  const [activeFilter, setActiveFilter] = useState("all");
  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHome = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [top, recent, ownedPlaylists] = await Promise.all([
        getTopTracks(),
        getRecentlyPlayed(),
        getMyPlaylists(),
      ]);

      setTopTracks(top);
      setRecentTracks(recent);
      setPlaylists(ownedPlaylists);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load your home page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadHome().catch(() => {
      if (!cancelled) {
        setError("Could not load your home page.");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loadHome]);

  const handlePlay = (track) => {
    playTrack(track.uri);
  };

  const displayName = user?.displayName || "there";
  const featuredTrack = topTracks[0] || recentTracks[0];

  return (
    <main className="main-content">
      <Nav user={user} navigate={navigate} />

      <div className="core-scroll-area">
        <div className="main-filters">
          {["all", "music"].map((filter) => (
            <button
              key={filter}
              className={"filter-btn " + (activeFilter === filter ? "active-filter" : "")}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "All" : "Music"}
            </button>
          ))}
        </div>

        <div className="hero-banner">
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} className="hero-badge-icon" />
                <span>YOUR SPOTIFY, YOUR SPACE</span>
              </div>
              <h1 className="hero-title1">Good music starts here.</h1>
              <p className="hero-desc">
                Welcome back, {displayName}. Pick up where you left off or play something from your top tracks.
              </p>

              <div className="hero-buttons">
                <button
                  className="play-btn"
                  type="button"
                  onClick={() => featuredTrack && handlePlay(featuredTrack)}
                  disabled={!featuredTrack}
                >
                  <Play size={18} fill="#121212" />
                  <span>{featuredTrack ? "Listen Now" : "No track ready"}</span>
                </button>
                <Link to="/library" className="hero-secondary-btn">
                  View Library
                </Link>
              </div>
            </div>

            <div className="hero-artwork-card">
              <img
                src={featuredTrack?.image || FALLBACK_IMAGE}
                alt=""
                className="hero-artwork-img"
              />
              <div className="hero-artwork-info">
                <span className="hero-artwork-tag">Top track</span>
                <h3 className="hero-artwork-title">
                  {featuredTrack?.name || "Your music will appear here"}
                </h3>
                <p className="hero-artwork-subtitle">
                  {featuredTrack?.artists || "Start listening to build your home"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="home-state">
            <p>Loading your Spotify library...</p>
          </div>
        )}

        {error && !loading && (
          <div className="home-state home-error">
            <p>{error}</p>
            <button type="button" onClick={loadHome}>Try again</button>
          </div>
        )}

        {!loading && !error && activeFilter === "all" && (
          <HomeSections
            topTracks={topTracks}
            recentTracks={recentTracks}
            playlists={playlists}
            onPlay={handlePlay}
          />
        )}

        {!loading && !error && activeFilter === "music" && (
          <section className="music-section">
            <SectionHeader title="Your top tracks" subtitle="Based on your Spotify listening history" />
            <div className="card-grid">
              {topTracks.length
                ? topTracks.map((track) => (
                    <TrackCard key={track.id || track.uri} track={track} onPlay={handlePlay} />
                  ))
                : <EmptySection text="Spotify has not returned any top tracks yet." />}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function HomeSections({ topTracks, recentTracks, playlists, onPlay }) {
  return (
    <>
      <section className="music-section">
        <SectionHeader title="Your top tracks" subtitle="Based on your Spotify listening history" />
        <div className="card-grid">
          {topTracks.length
            ? topTracks.slice(0, 6).map((track) => (
                <TrackCard key={track.id || track.uri} track={track} onPlay={onPlay} />
              ))
            : <EmptySection text="Spotify has not returned any top tracks yet." />}
        </div>
      </section>

      <section className="music-section">
        <SectionHeader title="Recently played" subtitle="Tracks you listened to recently" />
        <div className="card-grid">
          {recentTracks.length
            ? recentTracks.slice(0, 6).map((track) => (
                <TrackCard key={track.id || track.uri} track={track} onPlay={onPlay} />
              ))
            : <EmptySection text="Nothing played recently." />}
        </div>
      </section>

      <section className="music-section">
        <SectionHeader title="Your playlists" subtitle="Playlists from your Spotify account" />
        <div className="card-grid">
          {playlists.length
            ? playlists.slice(0, 6).map((playlist) => (
                <PlaylistCard key={playlist.id || playlist.name} playlist={playlist} />
              ))
            : <EmptySection text="You do not have any playlists available." />}
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        <p className="section-subtext">{subtitle}</p>
      </div>
    </div>
  );
}

function EmptySection({ text }) {
  return <p className="empty-section">{text}</p>;
}

function Nav({ user, navigate }) {
  return (
    <header className="top-header">
      <div className="nav-arrows">
        <button className="arrow-btn" type="button" aria-label="Previous" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <button className="arrow-btn" type="button" aria-label="Next" onClick={() => navigate(1)}>
          <ChevronRight size={20} />
        </button>
      </div>

      <button className="search-container" type="button" onClick={() => navigate("/search")}>
        <Search size={18} className="search-icon" />
        <span className="search-input">Artists, songs, albums, podcasts...</span>
      </button>

      <div className="profile-actions">
        <Link to="/premium" className="explore-btn">Explore Premium</Link>
        <button className="icon-btn" type="button" title="Notifications">
          <Bell size={19} />
        </button>
        <Link to="/library" className="profile-icon" title="Your Account">
          <span className="profile-initials">
            {user?.displayName?.slice(0, 2).toUpperCase() || "BD"}
          </span>
        </Link>
      </div>
    </header>
  );
}
