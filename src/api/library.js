import { spotifyFetch } from "./spotify";
import { normalizeTrack } from "./normalize";

export async function getTopTracks(timeRange = "medium_term") {
  const data = await spotifyFetch(`/me/top/tracks?time_range=${timeRange}&limit=10`);
  const items = Array.isArray(data?.items) ? data.items : [];
  return items.map(normalizeTrack);
}

export async function getRecentlyPlayed() {
  const data = await spotifyFetch("/me/player/recently-played?limit=20");
  const items = Array.isArray(data?.items) ? data.items : [];

  return items
    .filter((item) => item?.track)
    .map((item) => ({
      ...normalizeTrack(item.track),
      playedAt: item.played_at || null,
    }));
}

export async function getMyPlaylists() {
  const data = await spotifyFetch("/me/playlists?limit=50");
  const items = Array.isArray(data?.items) ? data.items : [];

  return items.map((playlist) => ({
    id: playlist?.id ?? null,
    name: playlist?.name ?? "Untitled playlist",
    image: playlist?.images?.[0]?.url ?? null,
    trackCount: Number.isFinite(playlist?.items?.total)
      ? playlist.items.total
      : Number.isFinite(playlist?.tracks?.total)
        ? playlist.tracks.total
        : 0,
    ownerName: playlist?.owner?.display_name ?? "Spotify user",
  }));
}

export async function getSavedTracks() {
  const data = await spotifyFetch("/me/tracks?limit=50");
  const items = Array.isArray(data?.items) ? data.items : [];

  return items
    .filter((item) => item?.track)
    .map((item) => ({
      ...normalizeTrack(item.track),
      addedAt: item.added_at || null,
    }));
}

export async function getPlaylistItems(id) {
  if (!id) {
    return [];
  }

  const data = await spotifyFetch(
    "/playlists/" + encodeURIComponent(id) + "/items?limit=50",
  );
  const items = Array.isArray(data?.items) ? data.items : [];

  return items
    .map((entry) => entry?.item ?? entry?.track)
    .filter(Boolean)
    .map(normalizeTrack);
}