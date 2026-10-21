import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "./pkce";

export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export const REDIRECT_URI = "http://127.0.0.1:5173/callback";

export const VERIFIER_KEY = "spotify_auth_verifier";
export const STATE_KEY = "spotify_auth_state";

export const ACCESS_TOKEN_KEY = "spotify_access_token";
export const REFRESH_TOKEN_KEY = "spotify_refresh_token";
export const EXPIRES_AT_KEY = "spotify_expires_at";

const TOKEN_URL = "https://accounts.spotify.com/api/token";

const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "user-library-modify",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");


// Start Spotify login using the PKCE authorization flow.
export async function login() {
  if (!CLIENT_ID) {
    throw new Error(
      "Spotify Client ID is missing. Check VITE_SPOTIFY_CLIENT_ID in your .env file."
    );
  }

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = generateCodeVerifier();

  localStorage.setItem(VERIFIER_KEY, verifier);
  localStorage.setItem(STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
    scope: SCOPES,
  });

  window.location.href =
    `https://accounts.spotify.com/authorize?${params.toString()}`;
}


// Exchange the authorization code for Spotify tokens.
export async function exchangeCodeForToken(code) {
  const verifier = localStorage.getItem(VERIFIER_KEY);

  if (!CLIENT_ID) {
    throw new Error("Spotify Client ID is missing from your .env file.");
  }

  if (!verifier) {
    throw new Error("Login verification expired. Please log in again.");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error_description || data.error || "Spotify login failed."
    );
  }

  if (!data.access_token) {
    throw new Error("Spotify did not return an access token.");
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);

  if (data.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }

  const expiresIn = Number(data.expires_in) || 3600;

  localStorage.setItem(
    EXPIRES_AT_KEY,
    String(Date.now() + expiresIn * 1000)
  );

  localStorage.removeItem(VERIFIER_KEY);
  localStorage.removeItem(STATE_KEY);

  return data;
}


// Refresh an expired access token.
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!CLIENT_ID || !refreshToken) {
    clearTokens();
    throw new Error("Your Spotify session expired. Please log in again.");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    clearTokens();

    throw new Error(
      data.error_description || "Could not refresh your Spotify session."
    );
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);

  if (data.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }

  const expiresIn = Number(data.expires_in) || 3600;

  localStorage.setItem(
    EXPIRES_AT_KEY,
    String(Date.now() + expiresIn * 1000)
  );

  return data.access_token;
}


// Return a valid access token, refreshing it when necessary.
export async function getAccessToken(forceRefresh = false) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY) || 0);

  if (!forceRefresh && accessToken && Date.now() < expiresAt - 60_000) {
    return accessToken;
  }

  if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
    return refreshAccessToken();
  }

  if (accessToken && !forceRefresh && !expiresAt) {
    return accessToken;
  }

  clearTokens();

  throw new Error("You are not logged in to Spotify. Please log in again.");
}


// Remove stored Spotify authentication tokens.
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  localStorage.removeItem(VERIFIER_KEY);
  localStorage.removeItem(STATE_KEY);
}