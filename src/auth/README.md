# Auth (Part A): how login works

BeatDrop logs users in with Spotify using **PKCE**. This is a browser-only app, so there is **no client secret** anywhere. Only the Client ID is used, from `.env`:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
```

(The file must be named `.env`, must not be committed, and you must restart `npm run dev` after changing it.)
Always open the app at **http://127.0.0.1:5173** (not `localhost`), because that is the redirect address registered in the Spotify dashboard.

## The login flow, step by step

1. User clicks **Continue with Spotify** on `/login`. That calls `login()` in `auth.js`.
2. `login()` makes a random **verifier** and a **challenge** (a SHA-256 fingerprint of the verifier) and a random **state**. It saves the verifier and state in `localStorage` and sends the browser to Spotify.
3. The user approves on Spotify's page. Spotify sends the browser back to `/callback?code=...&state=...`.
4. `Callback.jsx` checks the `state` matches the saved one, then calls `exchangeCodeForToken(code)`.
5. `exchangeCodeForToken` sends the code and the verifier to Spotify and gets back an **access token** (lasts about 1 hour) and a **refresh token**. They are saved in `localStorage`.
6. `Callback.jsx` calls `loadUser()` (asks Spotify "who am I?" with `/me`) and goes to `/home`.

## The files

| File | What it does |
|---|---|
| `pkce.js` | `generateCodeVerifier()` and `generateCodeChallenge(verifier)` |
| `auth.js` | `login()`, `exchangeCodeForToken(code)`, `getAccessToken()`, `clearTokens()` |
| `Callback.jsx` | The `/callback` page that finishes the login |
| `AuthContext.jsx` | `AuthProvider` and the `useAuth()` hook |
| `ProtectedRoute.jsx` | Sends logged-out users to `/login` |
| `../api/spotify.js` | `spotifyFetch(path, options)`, the function for calling the Spotify API |

## How to use it in your code

**Who is logged in?**

```js
import { useAuth } from "../auth/AuthContext";

const { isLoggedIn, user, logout } = useAuth();
// user = { id, displayName, image } or null
```

**Call the Spotify API** (always use this, never `fetch` directly):

```js
import { spotifyFetch } from "../api/spotify";

const results = await spotifyFetch("/search?q=daft%20punk&type=track&limit=10");

// PUT/POST: pass a JS object as body. Empty (204) answers come back as null.
await spotifyFetch("/me/player/play?device_id=" + deviceId, {
  method: "PUT",
  body: { uris: ["spotify:track:..."] },
});
```

If Spotify says no, `spotifyFetch` throws an Error with `error.status` (like 404) and `error.body`.

**Get a raw token** (only needed for the Spotify Web Playback SDK):

```js
import { getAccessToken } from "../auth/auth";

const token = await getAccessToken(); // refreshes it for you if it expired
```

## Good to know

- Tokens are refreshed automatically. `getAccessToken()` refreshes a token that is about to expire, and `spotifyFetch` forces one refresh and retries once if Spotify answers 401.
- If many parts of the app ask for a token at the same moment, only **one** refresh request is sent.
- The scopes (permissions) requested at login are listed in `auth.js`. If you need a new one, add it there, then log out and log in again.
- In Spotify's Development Mode only accounts added under **User Management** in the Spotify developer dashboard can log in. Anyone else gets a 403 and is sent back to `/login`.
- `<React.StrictMode>` is removed in `main.jsx`. With it on, React runs effects twice in development and the one-time login code would be used twice.
