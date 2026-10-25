import React, { useEffect, useRef, useState } from "react";
import BrowseSection from "../components/search/BrowseSection";
import Header from "../components/search/Header";
import SearchTags from "../components/search/SearchTags";
import TrackResults from "../components/search/TrackResults";
import { searchTracks } from "../api/search";
import { genres, recentSearches as defaultRecentSearches } from "../mockData.js";
import "./search-page.css";
import { usePlayer } from "../player/PlayerContext";

const RECENT_SEARCHES_KEY = "beatdrop_recent_searches";


function readRecentSearches() {
  try {
    const saved = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY));
    return Array.isArray(saved) ? saved : defaultRecentSearches;
  } catch {
    return defaultRecentSearches;
  }
}

function saveRecentSearch(query) {
  try {
    const current = readRecentSearches();
    const updated = [
      query,
      ...current.filter((item) => item.toLowerCase() !== query.toLowerCase()),
    ].slice(0, 8);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Search still works when localStorage is unavailable.
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);
  const [tracks, setTracks] = useState([]);
  const [nextOffset, setNextOffset] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const { playTrack } = usePlayer();
  const requestId = useRef(0);
  const lastSearchedQuery = useRef("");

  const runSearch = async (value, offset = 0, append = false) => {
    const cleanQuery = value.trim();

    if (cleanQuery.length < 2) {
      return;
    }

    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;
    lastSearchedQuery.current = cleanQuery.toLowerCase();

    setStatus("loading");
    if (!append) {
      setTracks([]);
    }
    setError("");

    try {
      const result = await searchTracks(cleanQuery, offset);

      if (currentRequest !== requestId.current) {
        return;
      }

      setTracks((currentTracks) => append
        ? [...currentTracks, ...result.tracks]
        : result.tracks);
      setNextOffset(result.nextOffset);
      setStatus(result.tracks.length ? "results" : "empty");
      saveRecentSearch(cleanQuery);
      setRecentSearches(readRecentSearches());
    } catch (err) {
      if (currentRequest !== requestId.current) {
        return;
      }

      setStatus("error");
      setError(err instanceof Error ? err.message : "Search failed. Please try again.");
    }
  };

  useEffect(() => {
    const cleanQuery = query.trim();

    if (cleanQuery.length < 2) {
      return undefined;
    }

    if (lastSearchedQuery.current === cleanQuery.toLowerCase()) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      runSearch(cleanQuery);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [query]);

  const handleQueryChange = (value) => {
    setQuery(value);

    if (value.trim().length < 2) {
      requestId.current += 1;
      lastSearchedQuery.current = "";
      setTracks([]);
      setNextOffset(null);
      setStatus("idle");
      setError("");
    }
  };

  const handleClear = () => {
    requestId.current += 1;
    lastSearchedQuery.current = "";
    setQuery("");
    setTracks([]);
    setNextOffset(null);
    setStatus("idle");
    setError("");
  };

  const handleSelectSearch = (value) => {
    lastSearchedQuery.current = "";
    setQuery(value);
  };

  const handleLoadMore = () => {
    if (nextOffset !== null && status !== "loading") {
      runSearch(query, nextOffset, true);
    }
  };

  const handlePlay = (track) => {
    playTrack(track.uri);
  };

  return (
    <div className="search-page-scroll">
      <Header
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={() => runSearch(query)}
        onClear={handleClear}
      />

      {status === "idle" && (
        <>
          <SearchTags tags={recentSearches} onTagClick={handleSelectSearch} />
          <BrowseSection genres={genres} onGenreClick={handleSelectSearch} />
        </>
      )}

      {status === "loading" && tracks.length === 0 && (
        <div className="search-state">
          <div className="search-spinner" />
          <p>Searching Spotify...</p>
        </div>
      )}

      {status === "error" && (
        <div className="search-state search-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button type="button" onClick={() => runSearch(query)}>Try again</button>
        </div>
      )}

      {status === "empty" && (
        <div className="search-state">
          <h2>No songs found</h2>
          <p>Try another artist, song, or genre.</p>
        </div>
      )}

      {(status === "results" || (status === "loading" && tracks.length > 0)) && (
        <>
          <TrackResults tracks={tracks} onPlay={handlePlay} />
          {nextOffset !== null && (
            <button
              className="load-more-btn"
              type="button"
              onClick={handleLoadMore}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}
    </div>
  );
}


