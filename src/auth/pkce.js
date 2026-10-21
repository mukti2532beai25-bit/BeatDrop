<<<<<<< HEAD
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateCodeVerifier() {
  const bytes = new Uint8Array(64);

  crypto.getRandomValues(bytes);

  let verifier = "";
  for (let i = 0; i < bytes.length; i++) {
    verifier += CHARS[bytes[i] % CHARS.length];
=======

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateCodeVerifier() {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);

  let verifier = "";

  for (const byte of bytes) {
    verifier += CHARS[byte % CHARS.length];
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
  }

  return verifier;
}

export async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
<<<<<<< HEAD
=======

>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  const binary = String.fromCharCode(...bytes);
  const base64 = btoa(binary);
<<<<<<< HEAD
  const base64Url = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return base64Url;
=======

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
}
