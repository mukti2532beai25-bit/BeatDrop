import React from "react";
import BrowseSection from "../components/search/BrowseSection";
import Header from "../components/search/Header";
import SearchTags from "../components/search/SearchTags";
import { recentSearches, genres } from "../mockData.js";
import "./search-page.css";

export default function SearchPage() {
  return (
    <div className="search-page-scroll">
      <Header />
      <SearchTags tags={recentSearches} />
      <BrowseSection genres={genres} />
    </div>
  );
}

