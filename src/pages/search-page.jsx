import React, { useState, useEffect, useRef } from "react";
import BrowseSection from "../components/search/BrowseSection";
import Header from "../components/search/Header";
import SearchTags from "../components/search/SearchTags";
import TrackRow from "../components/search/TrackRow";
import { genres } from "../mockData.js";
import { searchTracks } from "../api/search";
import "./search-page.css";

const RECENT_KEY = "beatdrop_recent_searches";
const MAX_RECENT = 7;

function loadRecent() {
  try {
    const saved = localStorage.getItem(RECENT_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Start with an empty list if saved data is invalid.
  }

  return [];
}

function genreQuery(genre) {
  return 'genre:"' + genre.title + '"';
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [nextOffset, setNextOffset] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [recent, setRecent] = useState(loadRecent);

  const searchId = useRef(0);

  useEffect(() => {
    searchId.current += 1;
    const myId = searchId.current;
    const text = query.trim();

    if (text.length < 2) {
      setStatus("idle");
      setTracks([]);
      setNextOffset(null);
      setErrorMessage("");
      return;
    }

    const timer = setTimeout(async () => {
      setStatus("loading");
      setErrorMessage("");

      try {
        const result = await searchTracks(text, 0);

        if (myId !== searchId.current) return;

        setTracks(result.tracks);
        setNextOffset(result.nextOffset);
        setStatus(result.tracks.length ? "results" : "empty");
      } catch (error) {
        if (myId !== searchId.current) return;

        setErrorMessage(error.message || "Search failed.");
        setStatus("error");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, retryCount]);

  async function loadMore() {
    if (nextOffset === null || loadingMore) return;

    const myId = searchId.current;

    setLoadingMore(true);

    try {
      const result = await searchTracks(query.trim(), nextOffset);

      if (myId !== searchId.current) return;

      setTracks((currentTracks) => [
        ...currentTracks,
        ...result.tracks,
      ]);

      setNextOffset(result.nextOffset);
    } catch (error) {
      if (myId !== searchId.current) return;

      setErrorMessage(error.message || "Unable to load more tracks.");
    } finally {
      setLoadingMore(false);
    }
  }

  function saveRecent(text) {
    const clean = text.trim();

    if (clean.length < 2) return;

    const newList = [
      clean,
      ...recent.filter(
        (item) => item.toLowerCase() !== clean.toLowerCase()
      ),
    ].slice(0, MAX_RECENT);

    setRecent(newList);

    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(newList));
    } catch {
      // Recent searches will still work for this session.
    }
  }

  function handleRecentClick(text) {
    setQuery(text);
    saveRecent(text);
  }

  function handleGenreClick(genre) {
    setQuery(genreQuery(genre));
  }

  function handlePlay(track) {
    // Temporary until the existing player integration is connected.
    console.log("TEMP play:", track.uri);
    saveRecent(query);
  }

  function retrySearch() {
    setErrorMessage("");
    setRetryCount((count) => count + 1);
  }

  let content;

  if (query.trim().length < 2) {
    content = (
      <div>
        <SearchTags tags={recent} onTagClick={handleRecentClick} />
        <BrowseSection
          genres={genres}
          onGenreClick={handleGenreClick}
        />
      </div>
    );
  } else if (status === "loading") {
    content = <p className="search-message">Searching...</p>;
  } else if (status === "error") {
    content = (
      <div className="search-message">
        <p>Something went wrong: {errorMessage}</p>

        <button
          type="button"
          className="search-button"
          onClick={retrySearch}
        >
          Try again
        </button>
      </div>
    );
  } else if (status === "empty") {
    content = (
      <p className="search-message">
        No results for "{query.trim()}"
      </p>
    );
  } else if (status === "results") {
    content = (
      <section className="results-section">
        <h2 className="browse-title">Songs</h2>

        <div className="track-list">
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id + "-" + index}
              track={track}
              onPlay={handlePlay}
            />
          ))}
        </div>

        {nextOffset !== null && (
          <button
            type="button"
            className="search-button"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </button>
        )}
      </section>
    );
  } else {
    content = <p className="search-message">Searching...</p>;
  }

  return (
    <div className="search-page-scroll">
      <Header
        query={query}
        onChange={setQuery}
        onEnter={() => saveRecent(query)}
        onClear={() => setQuery("")}
      />

      {content}
    </div>
  );
}