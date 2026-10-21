import { spotifyFetch } from "./spotify";

// Convert Spotify track data into a consistent format for the UI.
function normalizeSpotifyTrack(track) {
  if (!track) return null;

  return {
    id: track.id,
    uri: track.uri,
    name: track.name || "Unknown Track",
    artists:
      track.artists?.map((artist) => artist.name).join(", ") ||
      "Unknown Artist",
    album: track.album?.name || "Unknown Album",
    image:
      track.album?.images?.[0]?.url ||
      track.album?.images?.[1]?.url ||
      null,
    durationMs: track.duration_ms || 0,
    externalUrl: track.external_urls?.spotify || null,
  };
}

// Get the logged-in user's top tracks.
export async function getTopTracks(timeRange = "medium_term") {
  const data = await spotifyFetch(
    `/me/top/tracks?limit=10&time_range=${timeRange}`
  );

  return (data?.items || [])
    .map(normalizeSpotifyTrack)
    .filter(Boolean);
}

// Get the logged-in user's recently played tracks.
export async function getRecentlyPlayed() {
  const data = await spotifyFetch("/me/player/recently-played?limit=10");

  return (data?.items || [])
    .map((item) => {
      const track = normalizeSpotifyTrack(item.track);

      return track
        ? {
            ...track,
            playedAt: item.played_at || null,
          }
        : null;
    })
    .filter(Boolean);
}

// Get the logged-in user's playlists.
export async function getMyPlaylists() {
  const data = await spotifyFetch("/me/playlists?limit=20");

  return (data?.items || []).map((playlist) => ({
    id: playlist.id,
    name: playlist.name || "Untitled Playlist",
    image: playlist.images?.[0]?.url || null,
    trackCount: playlist.tracks?.total ?? 0,
    ownerName: playlist.owner?.display_name || "Unknown Owner",
    uri: playlist.uri || null,
  }));
}

// Get the logged-in user's saved tracks.
export async function getSavedTracks() {
  const data = await spotifyFetch("/me/tracks?limit=50");

  return (data?.items || [])
    .map((item) => {
      const track = normalizeSpotifyTrack(item.track);

      return track
        ? {
            ...track,
            addedAt: item.added_at || null,
          }
        : null;
    })
    .filter(Boolean);
}

// Get tracks belonging to a playlist.
export async function getPlaylistItems(playlistId) {
  if (!playlistId) {
    throw new Error("A playlist ID is required.");
  }

  const data = await spotifyFetch(
    `/playlists/${encodeURIComponent(playlistId)}/items?limit=50`
  );

  return (data?.items || [])
    .map((item) => normalizeSpotifyTrack(item.track))
    .filter(Boolean);
}