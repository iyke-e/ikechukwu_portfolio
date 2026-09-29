export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  featured: boolean;
  published: boolean;
  liveUrl: string;
  sourceUrl: string;
  isPrivateRepo?: boolean;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  projectType: string[];
  accentColor?: string;
  role?: string;
  duration?: string;
  status?: string;
  teamSize?: string;
  metrics?: string[];
  highlights?: string[];
}

export const initialProjectsData: ProjectItem[] = [
  {
    id: "voice-of-the-east",
    name: "Voice of the East",
    category: "mobile",
    tagline: "Cultural Media Hub & Offline-First Audio Streaming Ecosystem",
    description: "### Detailed Engineering Narrative & Problem Statement\n\n#### 01. The Problem Statement\nIndigenous cultural heritage, oral history, and regional journalism are historically underserved by modern digital product standards. Most platforms dedicated to African cultural preservation exist either as unoptimized web wrappers or static text archives that fail to engage a modern, mobile-first audience. \n\nFor **Voice of the East**, the mission to document, preserve, and broadcast Igbo heritage, oral documentaries, and community realities faced severe real-world engineering constraints:\n\n1. **The Infrastructure Paradox (Bandwidth Volatility vs. Rich Media):**  \n   The primary audience spans both homeland communities across Southeastern Nigeria—where users contend with erratic 3G/4G connectivity, high latency, and abrupt signal loss—and a global diaspora expecting fluid, 60fps/120fps native performance. Standard media apps fail under these conditions, suffering buffer stalls, dropped streams, and blank states when offline.\n\n2. **The Audio Lifecycle Vacuum:**  \n   Oral storytelling and audio documentaries are central to cultural transmission. However, webviews and naive React Native audio implementations terminate playback as soon as the user backgrounds the app, locks their screen, or receives a notification. Cultural broadcasts demand true OS-level lock-screen media controls, seamless background audio playback, and resilient stream recovery.\n\n3. **Algorithmic Heritage & Information Architecture:**  \n   Igbo culture is governed by the traditional 4-day lunar market cycle (**Eke**, **Orie**, **Afọ**, **Nkwọ**), determining cultural events, commerce, and community ceremonies. Translating this cultural calendar into a digital utility required an offline-first algorithmic engine rather than relying on brittle server-side round trips.\n\n4. **Form Factor & Viewport Fragmentation:**  \n   Cultural long-form essays and multimedia archives are consumed on everything from compact 360dp Android handsets to 12.9-inch iPad Pros. Without deliberate layout architecture, long-form text either truncates awkwardly on small screens or stretches into unreadable, eye-straining single lines on tablets.\n\n---\n\n#### 02. The Engineering Challenge\nTo build a cultural hub worthy of its mission, the client architecture had to resolve four non-negotiable technical requirements:\n\n* **OS-Level Media Lifecycle Management:**  \n  Engineered an audio streaming pipeline using the cutting-edge `expo-audio` subsystem. The engine bypasses silent mode switches (`playsInSilentMode: true`), orchestrates audio session interruptions (calls, route switches), and registers native lock-screen metadata via `player.setActiveForLockScreen()`, delivering scrubbable playback and queue management outside the application viewport.\n\n* **Offline-First Data Resilience:**  \n  Implemented a dual-layer data fabric. In-flight network queries are managed by **TanStack React Query v5** and serialized directly into `@react-native-async-storage/async-storage` via a persistent hydration client. News articles, audio playlists, and historical archives remain instantly accessible offline with zero layout shift or blocking spinners, reconciling opportunistically when network connectivity is re-established.\n\n* **Deterministic Local Algorithmic Computation:**  \n  Designed a zero-dependency Igbo Market Day Finder and calendar engine executed entirely on the client. It calculates lunar cycles and market days deterministically for any historical or future Gregorian date, guaranteeing 100% offline availability.\n\n* **Adaptive Breakpoint Architecture (`useResponsive`):**  \n  Authored an adaptive layout engine pairing **NativeWind v4** (Tailwind CSS) with dynamic device metrics. Tablet and iPad displays automatically constrain long-form editorial content and media canvases into an ergonomic `740px` max-width container, satisfying Apple Store Guideline 4.0 while delivering optimal typographic readability.\n\n---\n\n#### 03. Architectural Outcome & Impact\nBy treating performance, ergonomics, and resilience as foundational design vectors, *Voice of the East* transcends conventional content applications. It operates as a resilient, native cultural broadcaster—offering instant cold-boot loading from cache, backgrounded oral storytelling, tactile haptic interactions (`expo-haptics`), and real-time crash observability via `@sentry/react-native`. \n\nThe result is a production ecosystem that pairs executive-level software craftsmanship with the sacred responsibility of cultural custodianship.",
    featured: true,
    published: true,
    liveUrl: "https://play.google.com/store/apps/details?id=com.talentfactoryafrica.voiceoftheeast",
    sourceUrl: "",
    isPrivateRepo: true,
    imageUrl: "/projectsimg/voice_of_the_east.png",
    videoUrl: "",
    tags: [
      "React Native 0.81",
      "Expo SDK 54",
      "TypeScript 5.9",
      "Expo Router v6",
      "Expo Audio",
      "TanStack React Query v5",
      "Zustand v5",
      "NativeWind v4",
      "Tailwind CSS",
      "Reanimated v4",
      "Sentry",
      "EAS CI/CD"
    ],
    projectType: ["Mobile Apps"],
    accentColor: "#10b981",
    role: "Lead Mobile Developer",
    duration: "12 weeks",
    status: "Active (Google Play)",
    teamSize: "2 (Solo)",
    metrics: [
      "40% increase in average session duration via TTS accessibility features",
      "Initial app load times reduced from 3.2s to under 1.1s under high latency",
      "100% offline reliability for core historical texts and Igbo calendar utilities",
      "Native 60FPS fluid gesture handling with zero thread jank"
    ],
    highlights: [
      "Advanced Text-to-Speech narration engine with sentence-splitting regex and speed controls",
      "Lock Screen audio player support using a background playback stream trick",
      "Traditional Igbo Market Day Calculator dynamically computing Eke, Orie, Afor, and Nkwo cycles",
      "TanStack Query and Zustand AsyncStorage offline-first caching system"
    ]
  },
  {
    id: "crestmonie",
    name: "Crestmonie",
    category: "mobile",
    tagline: "Secure Mobile Share Investment & Portfolio Tracker",
    description: "A secure cross-platform mobile investment application developed in Flutter. It enables retail users to browse financial markets, invest in corporate shares, track portfolios in real time, and manage funds securely. Built while interning at Integrated Software Services Ltd (ISSL).",
    featured: true,
    published: true,
    liveUrl: "https://play.google.com/store/apps/details?id=com.issl.bankeasyap4candourcrest&hl=en",
    sourceUrl: "",
    isPrivateRepo: true,
    imageUrl: "/projectsimg/condor_crest.png",
    tags: [
      "Flutter",
      "Dart",
      "Firebase",
      "Node.js",
      "PostgreSQL",
      "Fintech",
      "AES-256"
    ],
    projectType: [
      "Mobile Apps",
      "Fintech",
      "Investment"
    ],
    accentColor: "#0ea5e9",
    role: "Mobile Developer Intern",
    duration: "12 Weeks",
    status: "Active (Google Play)",
    teamSize: "3 (2 Mobile, 1 Backend)",
    metrics: [
      "95% reduction in broker-assisted trade execution cycles",
      "Real-time share catalog with live market trends and indices",
      "Interactive portfolio tracking dashboards with dividend summaries",
      "Zero critical financial sync failures across 10,000+ simulation runs"
    ],
    highlights: [
      "Real-time corporate share index with market trends and live dividend yields",
      "Interactive portfolio tracking dashboards with asset allocation breakdowns",
      "Secure KYC verification, PIN biometrics, and multi-factor auth pipeline",
      "Low-latency deposit and withdrawal transaction processing ledger"
    ]
  },
  {
    id: "spotify-clone",
    name: "Spotify Clone",
    category: "mobile",
    tagline: "Mobile Music Streaming & Deezer API Client",
    description: "A full-featured music streaming application built with React Native and Expo. It includes dynamic playlists, artist and album pages, recommended tracks based on listening history, and Deezer API integration for streaming music.",
    featured: false,
    published: false,
    liveUrl: "https://github.com/iyke-e/spotify-clone-react-native",
    sourceUrl: "https://github.com/iyke-e/spotify-clone-react-native",
    imageUrl: "/projectsimg/spotify_clone.png",
    tags: [
      "React Native",
      "Expo",
      "JavaScript",
      "React Navigation",
      "Deezer API"
    ],
    projectType: ["Mobile Apps"],
    accentColor: "#22c55e",
    role: "Mobile Developer",
    duration: "4 Weeks",
    status: "Draft / Staging",
    teamSize: "1 (Solo)",
    metrics: [
      "Real-time Deezer music streaming playback panel",
      "Dynamic search querying across millions of tracks"
    ],
    highlights: [
      "Custom audio playback panel with responsive seek tracking",
      "Context API state architecture for global audio playback"
    ]
  },
  {
    id: "the-votage-church",
    name: "The Votage Church",
    category: "web",
    tagline: "Community Web Portal & Sermon Streaming CMS",
    description: "A modern web portal built for The Votage Church to stream sermons, coordinate connect groups, publish church announcements, and manage member events. Built with Next.js, React, TypeScript, and Tailwind CSS.",
    featured: false,
    published: false,
    liveUrl: "https://thevotagechurch.org/home",
    sourceUrl: "",
    isPrivateRepo: true,
    imageUrl: "/projectsimg/votage_church.png",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CMS"
    ],
    projectType: [
      "Web Apps",
      "CMS"
    ],
    accentColor: "#6366f1",
    role: "Frontend Architect",
    duration: "8 Weeks",
    status: "Draft / Staging",
    teamSize: "2 Developers",
    metrics: [
      "100% PageSpeed accessibility score",
      "Sub-second page navigation with Next.js App Router"
    ],
    highlights: [
      "Custom content management system for media updates",
      "Responsive sermon audio and video playback"
    ]
  },
  {
    id: "estatein",
    name: "Estatein",
    category: "web",
    tagline: "Real Estate Platform with Dynamic Filters",
    description: "A modern real-estate platform built to browse, filter, and view property listings seamlessly. Designed with a responsive UI, smooth animations, and clean architecture.",
    featured: false,
    published: false,
    liveUrl: "https://estatien-i.vercel.app",
    sourceUrl: "https://github.com/iyke-e/estatien",
    imageUrl: "https://ucarecdn.com/9a5c5f84-dd26-4d52-b541-f608fc3a9343/-/preview/1000x659/",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel"
    ],
    projectType: [
      "Web Apps",
      "Dashboard"
    ],
    accentColor: "#f59e0b",
    role: "Frontend Engineer",
    duration: "3 Weeks",
    status: "Draft / Staging",
    teamSize: "1 (Solo)",
    metrics: [
      "Dynamic multi-criteria property filtering",
      "Instant query parameter URL updates"
    ],
    highlights: [
      "Clean modular property card layouts",
      "Fully responsive mobile-friendly property viewer"
    ]
  },
  {
    id: "fintrack",
    name: "Fintrack",
    category: "mobile",
    tagline: "Personal Finance Management & Budgeting App",
    description: "Personal finance management application that allows users to track income and expenses, set and monitor budgets, and visualize financial trends over time with Supabase.",
    featured: false,
    published: false,
    liveUrl: "https://github.com/iyke-e/fintrackapp",
    sourceUrl: "https://github.com/iyke-e/fintrackapp",
    imageUrl: "https://ucarecdn.com/61416051-b0bf-433e-814e-e16714d06ec9/-/preview/1000x750/",
    tags: [
      "Expo",
      "TypeScript",
      "Supabase",
      "Zustand"
    ],
    projectType: [
      "Mobile Apps",
      "Fintech"
    ],
    accentColor: "#14b8a6",
    role: "Mobile Developer",
    duration: "4 Weeks",
    status: "Draft / Staging",
    teamSize: "1 (Solo)",
    metrics: [
      "Real-time expense categorization charts",
      "Offline SQLite ledger with Supabase cloud sync"
    ],
    highlights: [
      "Budget threshold alerts and monthly financial forecasting",
      "Zustand state store with instant local caching"
    ]
  }
];

export default initialProjectsData;
