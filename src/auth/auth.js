import { generateCodeVerifier, generateCodeChallenge } from "./pkce";       

export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const REDIRECT_URI = "http://127.0.0.1:5173/callback";
export const VERIFIER_KEY = "spotify_auth_verifier";
export const STATE_KEY = "spotify_auth_state";
const TOKEN_URL = "https://accounts.spotify.com/api/token";


const SCOPES = [
  "streaming", "user-read-email", "user-read-private",
  "user-read-playback-state", "user-modify-playback-state",
  "user-top-read", "user-read-recently-played",
  "user-library-read", "user-library-modify",
  "playlist-read-private", "playlist-read-collaborative",
].join(" ");


export async function login() {
    
  // 1. generate a verifier
  const verifier = generateCodeVerifier();

  // 2. generate the challenge from it (await!)
  const challenge = await generateCodeChallenge(verifier);
  
  // 3. generate a random state
  const state = generateCodeVerifier();

  // 4. save verifier and state in localStorage (two different keys)
  localStorage.setItem(VERIFIER_KEY, verifier);
  localStorage.setItem(STATE_KEY, state);
  
  

  // 5. build the params: client_id, response_type="code", redirect_uri,
  //    code_challenge_method="S256", code_challenge, state, scope
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state: state,
    scope: SCOPES,
  });

  // 6. send the browser to "https://accounts.spotify.com/authorize?" + params
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export const ACCESS_TOKEN_KEY = "spotify_access_token";
export const REFRESH_TOKEN_KEY = "spotify_refresh_token";
export const EXPIRES_AT_KEY = "spotify_expires_at";

export async function exchangeCodeForToken(code) {
  // 1. read the verifier from localStorage (VERIFIER_KEY); if it's missing, throw an Error
  const verifier = localStorage.getItem(VERIFIER_KEY);
  if (!verifier) {
    throw new Error("Missing code verifier in localStorage");
  }

  // 2. fetch("https://accounts.spotify.com/api/token", {
  //      method: "POST",
  //      headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //      body: new URLSearchParams({ grant_type: "authorization_code", code,
  //             redirect_uri: REDIRECT_URI, client_id: CLIENT_ID, code_verifier: verifier }),
  //    })

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: verifier
    })
  })

  // 3. const data = await response.json()
  const data = await response.json();

  // 4. if (!response.ok) throw new Error(data.error_description || "Token request failed")
  if (!response.ok) {
    throw new Error(data.error_description || "Token request failed");
  }

  // 5. save access_token and refresh_token with localStorage.setItem
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);

  // 6. save EXPIRES_AT_KEY as String(Date.now() + data.expires_in * 1000)
  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + data.expires_in * 1000));

  // 7. remove VERIFIER_KEY and STATE_KEY from localStorage (they're single-use)
  localStorage.removeItem(VERIFIER_KEY);
  localStorage.removeItem(STATE_KEY);
}


let refreshPromise = null;

export function clearTokens() {
  // remove the three token keys from localStorage
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}

async function refreshAccessToken() {
  // 1. read the refresh token; if missing, clearTokens() and throw
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    clearTokens();
    throw new Error("No refresh token, please log in again");
  }

  // 2. POST to the token URL with grant_type "refresh_token", refresh_token, client_id
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  });

  // 3. data = await response.json(); if !response.ok -> clearTokens() and throw
  const data = await response.json();
  if (!response.ok) {
    clearTokens();
    throw new Error(data.error_description || "Token refresh failed");
  }

  // 4. save data.access_token; save expires_at = String(Date.now() + data.expires_in * 1000)
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + data.expires_in * 1000));

  // 5. if data.refresh_token exists, save it too
  //    (Spotify does not always send a new one. If it doesn't, we keep the old one.)
  if (data.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }

  // 6. return data.access_token
  return data.access_token;
}

// Returns a valid access token. Every other part of the app calls this
// instead of reading localStorage directly.
// forceRefresh = true skips the "still valid" check (used after a 401 from Spotify).
export async function getAccessToken(forceRefresh = false) {
  // 1. read access token and expires_at; if no access token -> throw new Error("Not logged in")
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY));
  if (!token) {
    throw new Error("Not logged in");
  }

  // 2. if the token is still valid (with a 60 second safety margin) -> return the token
  if (!forceRefresh && Date.now() < expiresAt - 60000) {
    return token;
  }

  // 3. refresh. If a refresh is already running, reuse it so we don't send two at once.
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  // 4. return refreshPromise
  return refreshPromise;
}