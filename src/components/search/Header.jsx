import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="search-header">
      <div className="header-left">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-main" />
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to listen to?"
            autoFocus
          />
        </div>
      </div>
      <div className="header-right">
        <Link to="/premium" className="explore-premium">Explore Premium</Link>
        <button className="icon-btn bell-icon" title="Notifications">
          <Bell size={18} />
        </button>
        <Link to="/library" className="user-avatar" title="Account">MK</Link>
      </div>
    </header>
  );
};

export default Header;