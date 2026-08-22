import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Bell, 
  Play, 
  Sparkles,
  Radio 
} from "lucide-react";
import { 
  SONGS, 
  PLAYLISTS, 
  ALBUMS, 
  ARTISTS, 
  MADE_FOR_YOU, 
  RECENTLY_PLAYED 
} from "../../data";
import "./MainContent.css";

export default function MainContent() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="main-content">
      <Nav />
      <div className="core-scroll-area">
        <div className="main-filters">
          <button 
            className={`filter-btn ${activeFilter === "all" ? "active-filter" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === "music" ? "active-filter" : ""}`}
            onClick={() => setActiveFilter("music")}
          >
            Music
          </button>
          <button 
            className={`filter-btn ${activeFilter === "podcasts" ? "active-filter" : ""}`}
            onClick={() => setActiveFilter("podcasts")}
          >
            Podcasts
          </button>
          <button 
            className={`filter-btn ${activeFilter === "live" ? "active-filter" : ""}`}
            onClick={() => setActiveFilter("live")}
          >
            Live Radio
          </button>
        </div>

        <div className="hero-banner">
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} className="hero-badge-icon" />
                <span>CURATED JUST FOR YOU</span>
              </div>
              <h1 className="hero-title1">Get Lost in the Sound</h1>
              <p className="hero-desc">
                Hit play to kick off your ultimate personalized mix, featuring your favorite tracks and fresh discoveries tuned to your mood.
              </p>

              <div className="hero-buttons">
                <button className="play-btn">
                  <Play size={18} fill="#121212" />
                  <span>Listen Now</span>
                </button>
                <Link to="/library" className="hero-secondary-btn">
                  View Library
                </Link>
              </div>
            </div>


            <div className="hero-artwork-card">
              <img 
                src={SONGS[1]?.cover || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"} 
                alt="Featured Mix" 
                className="hero-artwork-img"
              />
              <div className="hero-artwork-info">
                <span className="hero-artwork-tag">Featured Mix</span>
                <h3 className="hero-artwork-title">After Hours Mix</h3>
                <p className="hero-artwork-subtitle">The Weeknd & Guests • 24 Tracks</p>
              </div>
            </div>
          </div>
        </div>

        {(activeFilter === "all" || activeFilter === "music") && (
          <section className="music-section">
            <div className="section-header">
              <div>
                <h2>Made For You</h2>
                <p className="section-subtext">Personalized daily mixes tailored to your listening habits</p>
              </div>
              <Link to="/library" className="see-all-link">See all</Link>
            </div>

            <div className="card-grid">
              {MADE_FOR_YOU.map((mix) => (
                <div className="music-card" key={`made-${mix.id}`}>
                  <div className="card-img-wrapper">
                    <img 
                      src={mix.songs?.[0]?.cover || PLAYLISTS[0]?.cover} 
                      alt={mix.title} 
                      className="card-img"
                    />
                    <button className="card-play-overlay">
                      <Play size={18} fill="#121212" color="#121212" />
                    </button>
                    <span className="card-badge">{mix.icon}</span>
                  </div>
                  <h4>{mix.title}</h4>
                  <p>{mix.description}</p>
                </div>
              ))}

              {PLAYLISTS.slice(1, 4).map((pl) => (
                <div className="music-card" key={`pl-${pl.id}`}>
                  <div className="card-img-wrapper">
                    <img 
                      src={pl.cover} 
                      alt={pl.title} 
                      className="card-img"
                    />
                    <button className="card-play-overlay">
                      <Play size={18} fill="#121212" color="#121212" />
                    </button>
                  </div>
                  <h4>{pl.title}</h4>
                  <p>{pl.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}


        {(activeFilter === "all" || activeFilter === "music") && (
          <section className="music-section">
            <div className="section-header">
              <div>
                <h2>Recently Played</h2>
                <p className="section-subtext">Jump back into what you were listening to</p>
              </div>
              <Link to="/library" className="see-all-link">See all</Link>
            </div>

            <div className="card-grid">
              {RECENTLY_PLAYED.map((song) => (
                <div className="music-card" key={`recent-${song.id}`}>
                  <div className="card-img-wrapper">
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      className="card-img"
                    />
                    <button className="card-play-overlay">
                      <Play size={18} fill="#121212" color="#121212" />
                    </button>
                  </div>
                  <h4>{song.title}</h4>
                  <p>{song.artist} • {song.genre}</p>
                </div>
              ))}

              {SONGS.slice(5, 7).map((song) => (
                <div className="music-card" key={`recent-extra-${song.id}`}>
                  <div className="card-img-wrapper">
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      className="card-img"
                    />
                    <button className="card-play-overlay">
                      <Play size={18} fill="#121212" color="#121212" />
                    </button>
                  </div>
                  <h4>{song.title}</h4>
                  <p>{song.artist} • {song.genre}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(activeFilter === "all" || activeFilter === "music") && (
          <section className="music-section">
            <div className="section-header">
              <div>
                <h2>Popular Artists</h2>
                <p className="section-subtext">Trending vocalists and creators this week</p>
              </div>
            </div>

            <div className="card-grid">
              {ARTISTS.map((artist) => (
                <div className="music-card artist-card" key={`artist-${artist.id}`}>
                  <div className="artist-avatar-wrapper">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="artist-avatar-img"
                    />
                    <button className="card-play-overlay">
                      <Play size={18} fill="#121212" color="#121212" />
                    </button>
                  </div>
                  <h4>{artist.name}</h4>
                  <p className="artist-genre">{artist.genre}</p>
                  <span className="artist-followers">{artist.followers} listeners</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeFilter === "podcasts" && (
          <section className="music-section">
            <div className="section-header">
              <div>
                <h2>Featured Podcasts & Stories</h2>
                <p className="section-subtext">Deep conversations, tech breakdowns, and audio dramas</p>
              </div>
            </div>

            <div className="card-grid">
              {[
                { id: "p1", title: "The Daily Frequency", host: "Echo Studios", cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500", desc: "Top music stories and artist roundtables." },
                { id: "p2", title: "Sound & Architecture", host: "Sonic Labs", cover: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500", desc: "How synthesizer waves changed modern pop." },
                { id: "p3", title: "Midnight Coding Radio", host: "Dev Beats", cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500", desc: "Ambient discussions and chill lo-fi soundscapes." },
              ].map((podcast) => (
                <div className="music-card" key={podcast.id}>
                  <div className="card-img-wrapper">
                    <img src={podcast.cover} alt={podcast.title} className="card-img" />
                    <button className="card-play-overlay">
                      <Play size={18} fill="#121212" color="#121212" />
                    </button>
                  </div>
                  <h4>{podcast.title}</h4>
                  <p>{podcast.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeFilter === "live" && (
          <section className="music-section">
            <div className="section-header">
              <div>
                <h2>Live Radio & Streams</h2>
                <p className="section-subtext">Broadcasting real-time beats 24/7 across the globe</p>
              </div>
            </div>

            <div className="card-grid">
              {[
                { id: "l1", title: "Tokyo Synthwave FM", listeners: "14.2K live", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500", desc: "Live retro electro & cyberpunk beats" },
                { id: "l2", title: "Berlin Deep House", listeners: "8.9K live", cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500", desc: "Underground club streams non-stop" },
                { id: "l3", title: "Chillhop Cafe Live", listeners: "23.4K live", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500", desc: "Smooth beats to relax & study to" },
              ].map((station) => (
                <div className="music-card" key={station.id}>
                  <div className="card-img-wrapper">
                    <img src={station.cover} alt={station.title} className="card-img" />
                    <button className="card-play-overlay">
                      <Radio size={18} color="#121212" />
                    </button>
                    <span className="live-pill">🔴 LIVE</span>
                  </div>
                  <h4>{station.title}</h4>
                  <p>{station.desc} • {station.listeners}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Nav() {

  return (
    <header className="top-header">
      <div className="nav-arrows">
        <button className="arrow-btn" type="button" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button className="arrow-btn" type="button" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        className="search-container"
        title="Search BeatDrop"
      >
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Artists, songs, albums, podcasts..."
          className="search-input"
        />
      </div>

      <div className="profile-actions">
        <Link to="/premium" className="explore-btn">
          Explore Premium
        </Link>

        <button className="icon-btn" title="Notifications">
          <Bell size={19} />
        </button>

        <Link to="/library" className="profile-icon" title="Your Account">
          <span className="profile-initials">MK</span>
        </Link>
      </div>
    </header>
  );
}
