import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";
<<<<<<< HEAD
import { useAuth } from "../../auth/AuthContext";

const Header = ({ query, onChange, onEnter, onClear }) => {
  const { user } = useAuth();

  
  let initial = "?";
  if (user && user.displayName) {
    initial = user.displayName[0].toUpperCase();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onEnter();
    }
    if (e.key === "Escape") {
      onClear();
    }
  }

=======

const Header = () => {
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
  return (
    <header className="search-header">
      <div className="header-left">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-main" />
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to listen to?"
<<<<<<< HEAD
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
=======
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
            autoFocus
          />
        </div>
      </div>
      <div className="header-right">
        <Link to="/premium" className="explore-premium">Explore Premium</Link>
        <button className="icon-btn bell-icon" title="Notifications">
          <Bell size={18} />
        </button>
<<<<<<< HEAD
        <Link to="/library" className="user-avatar" title="Account">{initial}</Link>
=======
        <Link to="/library" className="user-avatar" title="Account">MK</Link>
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
      </div>
    </header>
  );
};

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
