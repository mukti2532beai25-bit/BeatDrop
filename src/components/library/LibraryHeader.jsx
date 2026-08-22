import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Plus, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Bell, 
  Sparkles,
  Filter
} from "lucide-react";

function LibraryHeader() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="lb-header-container">
      {/* Universal Top Nav */}
      <header className="lb-top-nav">
        <div className="lb-nav-arrows">
          <button className="lb-arrow-btn" onClick={() => navigate(-1)} title="Go back">
            <ChevronLeft size={20} />
          </button>
          <button className="lb-arrow-btn" onClick={() => navigate(1)} title="Go forward">
            <ChevronRight size={20} />
          </button>
        </div>

        <div 
          className="lb-search-bar" 
          onClick={() => navigate("/search")}
          title="Search your library"
        >
          <Search size={17} className="lb-search-icon" />
          <input 
            type="text" 
            placeholder="Search in your library..." 
            className="lb-search-input"
            readOnly
          />
        </div>

        <div className="lb-nav-actions">
          <Link to="/premium" className="lb-premium-btn">
            Explore Premium
          </Link>
          <button className="lb-icon-btn" title="Notifications">
            <Bell size={18} />
          </button>
          <div className="lb-user-avatar" title="Account">
            MK
          </div>
        </div>
      </header>

      {/* Hero Title & Actions Header */}
      <div className="lbheader">
        <div className="lb-title-group">
          <div className="lb-badge">
            <Sparkles size={13} />
            <span>YOUR COLLECTION</span>
          </div>
          <h1 className="lb-main-title">
            Your <span>Library</span>
          </h1>
          <p className="lbdescription">
            All your saved tracks, favorite artists, curated playlists, and listening statistics.
          </p>
        </div>

        <div className="lb-action-buttons">
          <button className="lb-create-btn" title="Create a new playlist">
            <Plus size={18} />
            <span>New Playlist</span>
          </button>
          <div className="lb-view-toggle">
            <button 
              className={`lb-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <LayoutGrid size={17} />
            </button>
            <button 
              className={`lb-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <List size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="lb-filter-bar">
        {["all", "playlists", "artists", "albums", "podcasts", "downloaded"].map((tab) => (
          <button
            key={tab}
            className={`lb-filter-pill ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LibraryHeader;
