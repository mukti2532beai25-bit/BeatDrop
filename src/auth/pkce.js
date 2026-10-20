
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateCodeVerifier() {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);

  let verifier = "";

  for (const byte of bytes) {
    verifier += CHARS[byte % CHARS.length];
  }

  return verifier;
}

export async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);

  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  const binary = String.fromCharCode(...bytes);
  const base64 = btoa(binary);

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
