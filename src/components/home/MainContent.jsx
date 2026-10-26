import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronLeft, ChevronRight, Play, Search, Sparkles } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { getMyPlaylists, getRecentlyPlayed, getTopTracks } from "../../api/library";
import { usePlayer } from "../../player/PlayerContext";
import "./MainContent.css";

const FALLBACK_IMAGE = "https://placehold.co/400x400/24252a/d4ff32?text=♪";

function Card({ item, type = "track", onPlay }) {
  const isTrack = type === "track";
  const title = item.name;
  const subtitle = isTrack ? (item.artists || "Unknown artist") : `${item.trackCount} tracks`;

  return (
    <div className="music-card">
      <div className="card-img-wrapper">
        <img src={item.image || FALLBACK_IMAGE} alt="" className="card-img" />
        {isTrack && onPlay && (
          <button className="card-play-overlay" type="button" onClick={() => onPlay(item)}>
            <Play size={18} fill="#121212" color="#121212" />
          </button>
        )}
      </div>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}

export default function MainContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { playTrack } = usePlayer();
  const [activeFilter, setActiveFilter] = useState("all");
  
  const [data, setData] = useState({ topTracks: [], recentTracks: [], playlists: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const loadHome = async () => {
    setLoading(true);
    setError("");
    try {
      const [topTracks, recentTracks, playlists] = await Promise.all([
        getTopTracks(),
        getRecentlyPlayed(),
        getMyPlaylists(),
      ]);
      setData({ topTracks, recentTracks, playlists });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load your home page.");
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  if (!hasFetched && !loading && !error) {
    loadHome();
  }

  const featured = data.topTracks[0] || data.recentTracks[0];

  return (
    <main className="main-content">
      <Nav user={user} navigate={navigate} />

      <div className="core-scroll-area">
        <div className="main-filters">
          {["all", "music"].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active-filter" : ""}`}
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
                <span>YOUR BEATDROP, YOUR SPACE</span>
              </div>
              <h1 className="hero-title1">Good music starts here.</h1>
              <p className="hero-desc">
                Welcome back, {user?.displayName || "there"}. Pick up where you left off.
              </p>
              <div className="hero-buttons">
                <button
                  className="play-btn"
                  onClick={() => featured && playTrack(featured.uri)}
                  disabled={!featured}
                >
                  <Play size={18} fill="#121212" />
                  <span>{featured ? "Listen Now" : "No track ready"}</span>
                </button>
                <Link to="/library" className="hero-secondary-btn">View Library</Link>
              </div>
            </div>

            <div className="hero-artwork-card">
              <img src={featured?.image || FALLBACK_IMAGE} alt="" className="hero-artwork-img" />
              <div className="hero-artwork-info">
                <span className="hero-artwork-tag">Top track</span>
                <h3 className="hero-artwork-title">{featured?.name || "Your music will appear here"}</h3>
                <p className="hero-artwork-subtitle">{featured?.artists || "Start listening..."}</p>
              </div>
            </div>
          </div>
        </div>

        {loading && <div className="home-state"><p>Loading your BeatDrop library...</p></div>}
        {error && !loading && (
          <div className="home-state home-error"><p>{error}</p><button onClick={loadHome}>Try again</button></div>
        )}

        {!loading && !error && activeFilter === "all" && (
          <HomeSections {...data} onPlay={(t) => playTrack(t.uri)} />
        )}

        {!loading && !error && activeFilter === "music" && (
          <GridSection title="Your top tracks" subtitle="Based on your listening history">
            {data.topTracks.length ? (
              data.topTracks.map(t => <Card key={t.id || t.uri} item={t} type="track" onPlay={(track) => playTrack(track.uri)} />)
            ) : <p className="empty-section">No top tracks yet.</p>}
          </GridSection>
        )}
      </div>
    </main>
  );
}

function HomeSections({ topTracks, recentTracks, playlists, onPlay }) {
  return (
    <>
      <GridSection title="Your top tracks" subtitle="Based on your history">
        {topTracks.slice(0, 6).map(t => <Card key={t.id || t.uri} item={t} type="track" onPlay={onPlay} />)}
      </GridSection>
      <GridSection title="Recently played" subtitle="Tracks you listened to recently">
        {recentTracks.slice(0, 6).map(t => <Card key={t.id || t.uri} item={t} type="track" onPlay={onPlay} />)}
      </GridSection>
      <GridSection title="Your playlists" subtitle="From your BeatDrop account">
        {playlists.slice(0, 6).map(p => <Card key={p.id || p.name} item={p} type="playlist" />)}
      </GridSection>
    </>
  );
}

function GridSection({ title, subtitle, children }) {
  return (
    <section className="music-section">
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          <p className="section-subtext">{subtitle}</p>
        </div>
      </div>
      <div className="card-grid">{children}</div>
    </section>
  );
}

function Nav({ user, navigate }) {
  return (
    <header className="top-header">
      <div className="nav-arrows">
        <button className="arrow-btn" onClick={() => navigate(-1)}><ChevronLeft size={20} /></button>
        <button className="arrow-btn" onClick={() => navigate(1)}><ChevronRight size={20} /></button>
      </div>
      <button className="search-container" onClick={() => navigate("/search")}>
        <Search size={18} className="search-icon" />
        <span className="search-input">Artists, songs, albums, podcasts...</span>
      </button>
      <div className="profile-actions">
        <Link to="/premium" className="explore-btn">Explore Premium</Link>
        <button className="icon-btn" title="Notifications"><Bell size={19} /></button>
        <Link to="/library" className="profile-icon">
          <span className="profile-initials">{user?.displayName?.slice(0, 2).toUpperCase() || "BD"}</span>
        </Link>
      </div>
    </header>
  );
}