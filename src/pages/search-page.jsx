<<<<<<< HEAD
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
  } catch (e) {
    // ignore, we just start with an empty list
  }
  return [];
}

function genreQuery(genre) {
  return 'genre:"' + genre.title + '"';
}

export default function SearchPage() {
  // what is typed in the box
  const [query, setQuery] = useState("");

  // the results
  const [tracks, setTracks] = useState([]);
  const [nextOffset, setNextOffset] = useState(null);

  // "idle" | "loading" | "results" | "empty" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  
  const [retryCount, setRetryCount] = useState(0);

  const [recent, setRecent] = useState(loadRecent);

  const searchId = useRef(0);

  
  useEffect(() => {
    searchId.current = searchId.current + 1;
    const myId = searchId.current;

    const text = query.trim();

    if (text.length < 2) {
      setStatus("idle");
      setTracks([]);
      setNextOffset(null);
      return;
    }

    const timer = setTimeout(async () => {
      setStatus("loading");
      try {
        const result = await searchTracks(text, 0);

        
        if (myId !== searchId.current) {
          return;
        }

        setTracks(result.tracks);
        setNextOffset(result.nextOffset);
        if (result.tracks.length === 0) {
          setStatus("empty");
        } else {
          setStatus("results");
        }
      } catch (error) {
        if (myId !== searchId.current) {
          return;
        }
        setErrorMessage(error.message);
        setStatus("error");
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query, retryCount]);

  async function loadMore() {
    const myId = searchId.current;
    setLoadingMore(true);
    try {
      const result = await searchTracks(query.trim(), nextOffset);
      if (myId !== searchId.current) {
        return;
      }
      setTracks(tracks.concat(result.tracks));
      setNextOffset(result.nextOffset);
    } catch (error) {
      if (myId !== searchId.current) {
        return;
      }
      setErrorMessage(error.message);
      setStatus("error");
    } finally {
      setLoadingMore(false);
    }
  }


  function saveRecent(text) {
    const clean = text.trim();
    if (clean.length < 2) {
      return;
    }
    const newList = [clean];
    for (let i = 0; i < recent.length; i++) {
      if (recent[i].toLowerCase() !== clean.toLowerCase()) {
        newList.push(recent[i]);
      }
    }
    const shortList = newList.slice(0, MAX_RECENT);
    setRecent(shortList);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(shortList));
    } catch (e) {
      // ignore, the list just won't be saved
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
    console.log("TEMP play:", track.uri);
    saveRecent(query);
  }

  let content;

  if (query.trim().length < 2) {
  content = (
      <div>
        <SearchTags tags={recent} onTagClick={handleRecentClick} />
        <BrowseSection genres={genres} onGenreClick={handleGenreClick} />
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
          onClick={() => setRetryCount(retryCount + 1)}
        >
          Try again
        </button>
      </div>
    );
  } else if (status === "empty") {
    content = <p className="search-message">No results for "{query.trim()}"</p>;
  } else if (status === "results") {
    content = (
      <section className="results-section">
        <h2 className="browse-title">Songs</h2>
        <div className="track-list">
          {tracks.map((track, index) => (
            <TrackRow key={track.id + "-" + index} track={track} onPlay={handlePlay} />
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
    // the user just typed and the 400ms wait has not finished yet
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
=======
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

>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
