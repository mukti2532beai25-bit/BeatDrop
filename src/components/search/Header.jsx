import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

const Header = ({ query, onChange, onEnter, onClear }) => {
  const { user } = useAuth();

  let initial = "?";

  if (user?.displayName) {
    initial = user.displayName[0].toUpperCase();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onEnter?.();
    }

    if (e.key === "Escape") {
      onClear?.();
    }
  }

  return (
    <header className="search-header">
      <div className="header-left">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-main" />

          <input
            type="text"
            className="search-input"
            placeholder="What do you want to listen to?"
            value={query ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>

      <div className="header-right">
        <Link to="/premium" className="explore-premium">
          Explore Premium
        </Link>

        <button
          type="button"
          className="icon-btn bell-icon"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <Link to="/library" className="user-avatar" title="Account">
          {initial}
        </Link>
      </div>
    </header>
  );
};

export default Header;