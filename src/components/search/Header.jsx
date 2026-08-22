import React from "react";

const Header = () => {
  return (
    <header className="search-header">
      <div className="header-left">
        <div className="heading">
          <h1>Beat Drop</h1>
        </div>
        <div className="search-input-wrapper">
          <span className="search-icon-main">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to listen to?"
          />
        </div>
      </div>
      <div className="header-right">
        <button className="explore-premium">Explore Premium</button>
        <button className="icon-btn bell-icon">🔔</button>
        <div className="user-avatar">MK</div>
      </div>
    </header>
  );
};

export default Header;