import { spotifyFetch } from "../auth/api/spotify";

/**
 * Search Spotify for tracks.
 *
 * @param {string} query - The search text.
 * @param {number} offset - The starting position for pagination.
 * @returns {Promise<{tracks: Array, nextOffset: number|null}>}
 */
export async function searchTracks(query, offset = 0) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return {
      tracks: [],
      nextOffset: null,
    };
  }

  const params = new URLSearchParams({
    q: cleanQuery,
    type: "track",
    limit: "20",
    offset: String(offset),
  });

  const data = await spotifyFetch(`/search?${params.toString()}`);

  const trackData = data?.tracks;

  if (!trackData || !Array.isArray(trackData.items)) {
    return {
      tracks: [],
      nextOffset: null,
    };
  }

  const tracks = trackData.items
    .filter((track) => track && track.id && track.uri)
    .map((track) => ({
      id: track.id,
      uri: track.uri,
      name: track.name || "Unknown track",

      artists: (track.artists || [])
        .map((artist) => artist.name)
        .filter(Boolean)
        .join(", "),

      image: track.album?.images?.[0]?.url || null,

      durationMs: track.duration_ms || 0,

      album: track.album?.name || "Unknown album",

      externalUrl: track.external_urls?.spotify || null,
    }));

  return {
    tracks,
    nextOffset:
      trackData.next && tracks.length > 0
        ? offset + trackData.items.length
        : null,
  };
}