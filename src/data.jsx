
export const SONGS = [
  {
    id: 1,
    title: "Summer Nights",
    artist: "The Midnight",
    album: "Endless Summer",
    duration: "3:42",
    genre: "Synthwave",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
    liked: true,
  },

  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    liked: true,
  },

  {
    id: 3,
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    duration: "3:50",
    genre: "R&B",
    cover:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500",
    liked: false,
  },

  {
    id: 4,
    title: "After Dark",
    artist: "Mr.Kitty",
    album: "Time",
    duration: "4:17",
    genre: "Synthwave",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
    liked: true,
  },

  {
    id: 5,
    title: "Nightcall",
    artist: "Kavinsky",
    album: "OutRun",
    duration: "4:18",
    genre: "Electronic",
    cover:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
    liked: false,
  },

  {
    id: 6,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?w=500",
    liked: true,
  },

  {
    id: 7,
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: "3:59",
    genre: "Indie",
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500",
    liked: false,
  },

  {
    id: 8,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    duration: "4:00",
    genre: "Alternative",
    cover:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
    liked: true,
  },

  {
    id: 9,
    title: "Believer",
    artist: "Imagine Dragons",
    album: "Evolve",
    duration: "3:24",
    genre: "Rock",
    cover:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=500",
    liked: false,
  },

  {
    id: 10,
    title: "One Dance",
    artist: "Drake",
    album: "Views",
    duration: "2:54",
    genre: "Hip-Hop",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500",
    liked: true,
  },

  {
    id: 11,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
    liked: true,
  },

  {
    id: 12,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500",
    liked: false,
  },
];


// ============================================
// CHARTS / TRENDING SONGS
// ============================================

export const CHARTS = [
  SONGS[1],
  SONGS[9],
  SONGS[10],
  SONGS[6],
  SONGS[11],
  SONGS[4],
];


// ============================================
// RECENTLY PLAYED
// ============================================

export const RECENTLY_PLAYED = [
  SONGS[0],
  SONGS[3],
  SONGS[1],
  SONGS[7],
  SONGS[9],
];


// ============================================
// LIKED SONGS
// ============================================

export const LIKED_SONGS = SONGS.filter(
  (song) => song.liked === true
);


// ============================================
// PLAYLISTS
// ============================================

export const PLAYLISTS = [
  {
    id: 101,
    title: "Liked Songs",
    description: "Your favorite songs",
    type: "Playlist",
    songCount: LIKED_SONGS.length,
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
  },

  {
    id: 102,
    title: "Night Drive",
    description: "Music for late night drives",
    type: "Playlist",
    songCount: 24,
    cover:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600",
  },

  {
    id: 103,
    title: "Coding Mode",
    description: "Focus music for coding",
    type: "Playlist",
    songCount: 31,
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
  },

  {
    id: 104,
    title: "Chill Vibes",
    description: "Relax and slow down",
    type: "Playlist",
    songCount: 42,
    cover:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
  },

  {
    id: 105,
    title: "Workout Energy",
    description: "High energy tracks",
    type: "Playlist",
    songCount: 27,
    cover:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
  },

  {
    id: 106,
    title: "Morning Coffee",
    description: "Start your morning right",
    type: "Playlist",
    songCount: 18,
    cover:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
  },
];


// ============================================
// ALBUMS
// ============================================

export const ALBUMS = [
  {
    id: 201,
    title: "After Hours",
    artist: "The Weeknd",
    year: 2020,
    genre: "R&B",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
    songs: [
      SONGS[1],
      SONGS[2],
      SONGS[5],
    ],
  },

  {
    id: 202,
    title: "Dreamland",
    artist: "Glass Animals",
    year: 2020,
    genre: "Indie",
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
    songs: [
      SONGS[6],
    ],
  },

  {
    id: 203,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    year: 2020,
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
    songs: [
      SONGS[10],
    ],
  },

  {
    id: 204,
    title: "Evolve",
    artist: "Imagine Dragons",
    year: 2017,
    genre: "Rock",
    cover:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600",
    songs: [
      SONGS[8],
    ],
  },
];


// ============================================
// ARTISTS
// ============================================

export const ARTISTS = [
  {
    id: 301,
    name: "The Weeknd",
    followers: "42.1M",
    genre: "R&B / Pop",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
  },

  {
    id: 302,
    name: "Dua Lipa",
    followers: "28.4M",
    genre: "Pop",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
  },

  {
    id: 303,
    name: "Drake",
    followers: "55.2M",
    genre: "Hip-Hop",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
  },

  {
    id: 304,
    name: "Glass Animals",
    followers: "9.8M",
    genre: "Indie",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
  },

  {
    id: 305,
    name: "Imagine Dragons",
    followers: "31.7M",
    genre: "Rock",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600",
  },

  {
    id: 306,
    name: "Harry Styles",
    followers: "37.9M",
    genre: "Pop",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600",
  },
];


// ============================================
// MADE FOR YOU
// ============================================

export const MADE_FOR_YOU = [
  {
    id: 401,
    title: "Daily Mix 1",
    description: "The Weeknd, Drake and more",
    type: "Personalized Mix",
    icon: "🎧",
    songs: [SONGS[1], SONGS[9], SONGS[5]],
  },

  {
    id: 402,
    title: "Daily Mix 2",
    description: "Indie and alternative favorites",
    type: "Personalized Mix",
    icon: "🌙",
    songs: [SONGS[6], SONGS[7]],
  },

  {
    id: 403,
    title: "Energy Mix",
    description: "High energy songs for your day",
    type: "Personalized Mix",
    icon: "🔥",
    songs: [SONGS[8], SONGS[9], SONGS[10]],
  },

  {
    id: 404,
    title: "Chill Mix",
    description: "Relax with your favorite tracks",
    type: "Personalized Mix",
    icon: "😌",
    songs: [SONGS[0], SONGS[3], SONGS[6]],
  },

  {
    id: 405,
    title: "Coding Mode",
    description: "Focus without distractions",
    type: "Personalized Mix",
    icon: "💻",
    songs: [SONGS[4], SONGS[0], SONGS[6]],
  },
];


// ============================================
// QUICK ACCESS
// ============================================

export const QUICK_ACCESS = [
  {
    id: 501,
    title: "Liked Songs",
    description: "Your favorite tracks",
    type: "liked",
  },

  {
    id: 502,
    title: "Recently Played",
    description: "Your listening history",
    type: "recent",
  },

  {
    id: 503,
    title: "Most Played",
    description: "Your most played tracks",
    type: "most-played",
  },

  {
    id: 504,
    title: "Downloaded",
    description: "Available offline",
    type: "downloaded",
  },
];


// ============================================
// LIBRARY ITEMS
// ============================================

export const LIBRARY_ITEMS = [
  {
    id: 601,
    title: "Liked Songs",
    description: `${LIKED_SONGS.length} liked songs`,
    type: "Playlist",
    category: "Playlists",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
  },

  ...PLAYLISTS.slice(1).map((playlist) => ({
    id: playlist.id,
    title: playlist.title,
    description: playlist.description,
    type: playlist.type,
    category: "Playlists",
    cover: playlist.cover,
  })),

  ...ALBUMS.map((album) => ({
    id: album.id,
    title: album.title,
    description: album.artist,
    type: "Album",
    category: "Albums",
    cover: album.cover,
  })),

  ...ARTISTS.map((artist) => ({
    id: artist.id,
    title: artist.name,
    description: artist.genre,
    type: "Artist",
    category: "Artists",
    cover: artist.image,
  })),
];


// ============================================
// LIBRARY TABS
// ============================================

export const LIBRARY_TABS = [
  "All",
  "Playlists",
  "Albums",
  "Artists",
  "Downloaded",
];


// ============================================
// LISTENING STATS
// ============================================

export const LISTENING_STATS = {
  listeningTime: "8h 42m",
  songsPlayed: 127,
  artistsDiscovered: 34,
  listeningStreak: 5,
};


// ============================================
// MUSIC DNA
// ============================================

export const MUSIC_DNA = [
  {
    genre: "jazz",
    percentage: 38,
  },

  {
    genre: "Pop",
    percentage: 27,
  },

  {
    genre: "Hip-Hop",
    percentage: 18,
  },

  {
    genre: "Rocking",
    percentage: 11,
  },

  {
    genre: "Indie",
    percentage: 6,
  },
];


// ============================================
// SIDEBAR PLAYLISTS
// ============================================

export const SIDEBAR_PLAYLISTS = [
  {
    id: "liked",
    title: "Liked Songs",
    meta: "Playlist",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
  },

  {
    id: "night-drive",
    title: "Night Drive",
    meta: "Playlist · 24 songs",
    cover:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600",
  },

  {
    id: "coding",
    title: "Coding Mode",
    meta: "Playlist · 31 songs",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
  },

  {
    id: "chill",
    title: "Chill Vibes",
    meta: "Playlist · 42 songs",
    cover:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
  },
];


// ============================================
// NAVIGATION
// ============================================

export const NAVIGATION_ITEMS = [
  {
    id: "home",
    label: "Home",
  },

  {
    id: "search",
    label: "Search",
  },

  {
    id: "library",
    label: "Library",
  },

  {
    id: "liked",
    label: "Liked Songs",
  },
];


// ============================================
// USER
// ============================================

export const USER = {
  name: "Mukti",
  plan: "Free",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
};


// ============================================
// SORT OPTIONS
// ============================================

export const SORT_OPTIONS = [
  "Recents",
  "Recently Added",
  "Alphabetical",
  "Creator",
];


// ============================================
// GENRES
// ============================================

export const GENRES = [
  "Pop",
  "Hip-Hop",
  "R&B",
  "Electronic",
  "Rock",
  "Indie",
  "Alternative",
  "Synthwave",
];


// ============================================
// APP SETTINGS
// ============================================

export const APP_INFO = {
  name: "Sonic",
  tagline: "Music for every moment.",
  version: "1.0.0",
};


// Premium Plans

export const plans = [
  {
    id: 'mini',
    name: 'Mini',
    badge: '1-Day / 1-Week',
    price: '₹7',
    period: 'for 1 day',
    description: 'Quick top-up for on-the-go music without ads.',
    features: [
      '1 account on mobile only',
      'Listen ad-free for 1 day',
      'Download up to 30 songs on 1 device',
      'High audio quality (160 kbps)'
    ],
    themeColor: '#e0e7ff',
    textColor: '#3730a3'
  },
  {
    id: 'individual',
    name: 'Individual',
    badge: 'Most Popular',
    price: '₹119',
    period: 'per month',
    description: 'Full uninterrupted streaming experience on all your devices.',
    features: [
      '1 Premium account',
      'Ad-free music listening',
      'Download 10,000 songs/device on up to 5 devices',
      'Lossless ultra-high audio (320 kbps)',
      'Pre-pay or subscribe automatically'
    ],
    themeColor: '#fce7f3',
    textColor: '#9d174d'
  },
  {
    id: 'duo',
    name: 'Duo',
    badge: 'For 2 People',
    price: '₹149',
    period: 'per month',
    description: 'Two separate accounts for couples or friends living together.',
    features: [
      '2 independent Premium accounts',
      'Shared Duo Mix automated playlist',
      'Ad-free listening & offline downloads',
      'Individual saved libraries & recommendations'
    ],
    themeColor: '#ede9fe',
    textColor: '#5b21b6'
  },
  {
    id: 'family',
    name: 'Family',
    badge: 'Best Value',
    price: '₹179',
    period: 'per month',
    description: 'Up to 6 accounts for family members under one roof.',
    features: [
      'Up to 6 separate accounts',
      'Block explicit music for kids',
      'Ad-free music & podcast streaming',
      'Individual downloads for every member'
    ],
    themeColor: '#dcfce7',
    textColor: '#166534'
  }
];