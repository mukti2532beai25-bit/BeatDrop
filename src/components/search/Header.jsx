import React from "react";
import { Link } from "react-router-dom";
import { Bell, Search, X } from "lucide-react";

const Header = ({ query, onQueryChange, onSubmit, onClear }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }

    if (event.key === "Escape") {
      onClear();
    }
  };

  return (
    <header className="search-header">
      <form className="header-left" onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-main" />
          <input
            type="search"
            className="search-input"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Search for music"
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={onClear}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      <div className="header-right">
        <Link to="/premium" className="explore-premium">Explore Premium</Link>
        <button className="icon-btn bell-icon" type="button" title="Notifications">
          <Bell size={18} />
        </button>
        <Link to="/library" className="user-avatar" title="Account">MK</Link>
      </div>
    </header>
  );
};

export default Header;
