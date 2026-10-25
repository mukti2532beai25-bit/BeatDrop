export function normalizeTrack(rawTrack = {}) {
  const images = Array.isArray(rawTrack.album?.images)
    ? rawTrack.album.images
    : [];

  return {
    id: rawTrack.id ?? null,
    uri: rawTrack.uri ?? null,
    name: rawTrack.name ?? "Unknown track",
    artists: Array.isArray(rawTrack.artists)
      ? rawTrack.artists
          .map((artist) => artist?.name)
          .filter(Boolean)
          .join(", ")
      : "",
    image: images[1]?.url ?? images[0]?.url ?? null,
    durationMs: Number.isFinite(rawTrack.duration_ms)
      ? rawTrack.duration_ms
      : 0,
  };
}
