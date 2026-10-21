const beatdropApps = {
  HARLEEN: import.meta.env.VITE_BEATDROP_CLIENT_ID_HARLEEN,
  TEAMMATE1: import.meta.env.VITE_BEATDROP_CLIENT_ID_TEAMMATE1,
};

export function getBeatDropConfig(appName) {
  const selectedApp =
    appName || import.meta.env.VITE_BEATDROP_APP || "HARLEEN";

  const clientId = beatdropApps[selectedApp];

  if (!clientId) {
    throw new Error(
      `BeatDrop configuration is missing for ${selectedApp}. Check your .env file.`
    );
  }

  return {
    appName: selectedApp,
    clientId,
    redirectUri: `${window.location.origin}/callback`,
  };
}