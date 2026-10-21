// spotifyFetch: the one function every part of the app uses to call the Spotify Web API.
//
// Examples:
//   const me = await spotifyFetch("/me");
//   const results = await spotifyFetch("/search?q=daft%20punk&type=track&limit=10");
//   await spotifyFetch("/me/player/play?device_id=abc", { method: "PUT", body: { uris: [uri] } });
//
// - path is relative to https://api.spotify.com/v1
// - body is a normal JS object, we turn it into JSON for you
// - returns the parsed JSON, or null when Spotify sends an empty answer (204)
// - throws an Error with err.status (like 404) and err.body when something goes wrong

import { getAccessToken } from "../auth";

const API_BASE = "https://api.spotify.com/v1";

export async function spotifyFetch(path, options = {}, retried = false) {
  const method = options.method || "GET";
  const body = options.body;

  // 1. get a valid token (on the second try we force a refresh)
  const token = await getAccessToken(retried);

  // 2. build the headers
  const headers = { Authorization: "Bearer " + token };
  if (body) {
    headers["Content-Type"] = "application/json";
  }

  // 3. send the request
  const response = await fetch(API_BASE + path, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // 4. 204 means "done, nothing to send back" (for example after starting playback)
  if (response.status === 204) {
    return null;
  }

  // 5. 401 means the token was rejected. Refresh it and try one more time.
  if (response.status === 401 && !retried) {
    return spotifyFetch(path, options, true);
  }

  // 6. read the answer (it can be empty, so we read it as text first)
  const text = await response.text();
  let data = null;
  if (text) {
    data = JSON.parse(text);
  }

  // 7. if it failed, throw an error that the caller can look at
  if (!response.ok) {
    let message = "Request failed";
    if (data && data.error && data.error.message) {
      message = data.error.message;
    }
    if (response.status === 429) {
      message = "Too many requests. Try again in " + response.headers.get("Retry-After") + " seconds.";
    }
    const error = new Error(message);
    error.status = response.status;
    error.body = data;
    throw error;
  }

  // 8. success
  return data;
}
