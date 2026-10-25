import { spotifyFetch } from "./spotify";
import { normalizeTrack } from "./normalize";

const SEARCH_LIMIT = 10;

export async function searchTracks(query, offset = 0) {
  const cleanQuery = query.trim();

  if (cleanQuery.length < 2) {
    return { tracks: [], total: 0, nextOffset: null };
  }

  const params = new URLSearchParams({
    q: cleanQuery,
    type: "track",
    limit: String(SEARCH_LIMIT),
    offset: String(offset),
  });

  const data = await spotifyFetch("/search?" + params.toString());
  const rawTracks = Array.isArray(data?.tracks?.items)
    ? data.tracks.items
    : [];
  const tracks = rawTracks.map(normalizeTrack);
  const total = Number.isFinite(data?.tracks?.total)
    ? data.tracks.total
    : 0;
  const nextOffset = offset + tracks.length < total
    ? offset + tracks.length
    : null;

  return { tracks, total, nextOffset };
}
