import { useState } from "react";
import { usePlayer } from "../player/PlayerContext";
import { getMyPlaylists, getSavedTracks, getRecentlyPlayed, getTopTracks } from "../api/library";
import LibraryHeader from "../components/library/LibraryHeader";
import QuickAccess from "../components/library/QuickAccess";
import RecentlyPlayed from "../components/library/RecentlyPlayed";
import ListeningStats from "../components/library/ListeningStats";
import LibraryCollection from "../components/library/LibraryCollection";
import "./Library.css";

export default function Library() {
  const { playTrack } = usePlayer();
  const [playlists, setPlaylists] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const loadLibrary = async () => {
    setLoading(true);
    setError("");

    try {
      const [playlistData, savedData, recentData, topData] = await Promise.all([
        getMyPlaylists(),
        getSavedTracks(),
        getRecentlyPlayed(),
        getTopTracks(),
      ]);

      setPlaylists(playlistData);
      setSavedTracks(savedData);
      setRecentTracks(recentData);
      setTopTracks(topData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load your library.");
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  if (!hasFetched && !loading && !error) {
    loadLibrary();
  }

  return (
    <div className="library-page-scroll">
      <main className="lbpage">
        <LibraryHeader />

        {loading && (
          <div className="library-state">
            <p>Loading your BeatDrop library...</p>
          </div>
        )}

        {error && !loading && (
          <div className="library-state library-error">
            <p>{error}</p>
            <button type="button" onClick={loadLibrary}>Try again</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <QuickAccess
              savedTracks={savedTracks}
              recentTracks={recentTracks}
              topTracks={topTracks}
            />
            <RecentlyPlayed tracks={recentTracks} onPlay={(track) => playTrack(track.uri)} />
            <ListeningStats
              savedTracks={savedTracks}
              recentTracks={recentTracks}
              topTracks={topTracks}
            />
            <LibraryCollection playlists={playlists} />
          </>
        )}
      </main>
    </div>
  );
}