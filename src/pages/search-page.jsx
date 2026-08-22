import React from "react";
import BrowseSection from "../components/search/BrowseSection";
import Header from "../components/search/Header";
import SearchTags from "../components/search/SearchTags";
import { recentSearches, genres } from "../mockData.js";
import "./search-page.css";
export default function SearchPage() {
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

