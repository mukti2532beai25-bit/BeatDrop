import { Bell, ChevronLeft, ChevronRight, Search, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function LibraryHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="lb-header-container">
      <header className="lb-top-nav">
        <div className="lb-nav-arrows">
          <button className="lb-arrow-btn" type="button" onClick={() => navigate(-1)} title="Go back">
            <ChevronLeft size={20} />
          </button>
          <button className="lb-arrow-btn" type="button" onClick={() => navigate(1)} title="Go forward">
            <ChevronRight size={20} />
          </button>
        </div>

        <button className="lb-search-bar" type="button" onClick={() => navigate("/search")} title="Search your library">
          <Search size={17} className="lb-search-icon" />
          <span className="lb-search-input">Search in your library...</span>
        </button>

        <div className="lb-nav-actions">
          <Link to="/premium" className="lb-premium-btn">Explore Premium</Link>
          <button className="lb-icon-btn" type="button" title="Notifications">
            <Bell size={18} />
          </button>
          <div className="lb-user-avatar" title="Account">
            {user?.displayName?.slice(0, 2).toUpperCase() || "BD"}
          </div>
        </div>
      </header>

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
            Your saved tracks, playlists, and recent listening in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LibraryHeader;
