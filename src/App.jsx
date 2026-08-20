import React from "react";
import "./App.css";
import Header from "./components/search/Header.jsx";
import SearchTags from "./components/search/SearchTags.jsx";
import BrowseSection from "./components/search/BrowseSection.jsx";
import { recentSearches, genres } from "./mockData.js";

function App() {
  return (
    <div className="app-container">
      {/* Placeholders for future components matching your CSS grid areas */}
      <div className="sidebar-area"></div>
      
      <div className="main-content-area">
        <div className="content-padding">
          <Header />
          <SearchTags tags={recentSearches} />
          <BrowseSection genres={genres} />
        </div>
      </div>

      {/* Placeholder for future player component */}
      <div className="player-area"></div>
    </div>
  );
}

export default App;