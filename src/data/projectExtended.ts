import Next from "@/assets/next.svg";
import Github from "@/assets/github.svg";
import Git from "@/assets/git.svg";
import Expo from "@/assets/expo.svg";
import Vite from "@/assets/vite.svg";
import Figma from "@/assets/figma.svg";
import HTML from "@/assets/html.svg";
import Redux from "@/assets/redux.svg";
import Android from "@/assets/android.svg";
import IOS from "@/assets/ios.svg";
import CSS from "@/assets/css.svg";
import Node from "@/assets/node.svg";
import Firebase from "@/assets/firebase.svg";
import Supabase from "@/assets/supabase.png";
import Zustand from "@/assets/zustand.svg";
import Js from "@/assets/javascript.svg";
import Ts from "@/assets/typescript.svg";
import Vscode from "@/assets/vscode.svg";
import Vercel from "@/assets/vercel.svg";

import Tailwind from "@/assets/tailwindcss.svg";
import ReactIcon from "@/assets/react.svg";
import Flutter from "@/assets/flutter.svg";
import VoiceOfTheEastImg from "@/assets/projectsimg/voiceoftheeast.jpg";
import CondorCrestImg from "@/assets/projectsimg/condor_crest.jpeg";
import SpotifyCloneImg from "@/assets/projectsimg/spotify_clone.png";
import VotageChurchImg from "@/assets/projectsimg/votage_church.png";
import { StaticImageData } from "next/image";

type StackProp = {
  name: string;
  icon: StaticImageData | string;
};

export interface ProjectPropExtended {
  featured: boolean;
  category: string;
  name: string;
  description: string;
  stack: StackProp[];
  liveUrl: string;
  sourceUrl: string;
  imageUrl: string;
  tags: string[];
  projectType: string[];
  problem?: string;
  solution?: string;
  features?: string[];
  impact?: string;
  futureImprovements?: string[];
  role?: string;
  duration?: string;
  teamSize?: string;
  challenges?: string[];
  lessonsLearned?: string[];
  status?: string;
  metrics?: string[];
  testimonials?: string[];
}

export const projectExtended: ProjectPropExtended[] = [
  {
    featured: false,
    category: "mobile",
    name: "Spotify Clone",
    description:
      "A music streaming mobile application built with React Native and Expo. It features dynamic playlists, album pages, real-time music streaming integrated with the Deezer API, and custom music player controls.",
    stack: [
      { name: "React Native", icon: ReactIcon },
      { name: "Expo", icon: Expo },
      { name: "JavaScript", icon: Js },
      { name: "Tailwind", icon: Tailwind },
    ],
    liveUrl: "https://github.com/iyke-e/spotify-clone-react-native",
    sourceUrl: "https://github.com/iyke-e/spotify-clone-react-native",
    imageUrl: SpotifyCloneImg.src,
    tags: ["Mobile", "React Native", "Audio Streaming", "API Integration"],
    projectType: ["Mobile Apps"],
    problem:
      "Integrating audio media feeds and music streaming with external APIs while maintaining seamless UI navigation transitions is a frequent design challenge in mobile development.",
    solution:
      "Built a fully structured React Native replication of the Spotify client. Integrated Deezer APIs for song lookups and playback streams, custom audio contexts for active track state, and Tailwind for layout sizing.",
    features: [
      "🎵 Dynamic track indexing and playlists by category",
      "📻 Custom audio playback panel with responsive slide tracking",
      "🔍 Deezer API search querying for live catalog browsing",
      "⚡ Expo Go workflow optimization and swift bundling pipelines",
    ],
    impact:
      "Successfully replicates high-fidelity Spotify patterns, demonstrating mastery over asynchronous API loading and responsive music layouts.",
    role: "Lead Mobile Developer",
    duration: "4 weeks",
    teamSize: "1 (solo)",
    challenges: [
      "Handling global audio playback state transitions when switching tabs or loading new search playlists without interrupting active buffers.",
    ],
    lessonsLearned: [
      "Designing complex state structures with Context API and modularizing mobile players for high performance.",
    ],
    status: "Completed",
  },
  {
    featured: true,
    category: "mobile",
    name: "Voice of the East",
    description:
      "A high-performance, culturally rich cross-platform mobile application designed as a digital sanctuary and archival platform for South-Eastern Nigerian history, news, and heritage. It acts as a bridge between age-old oral traditions and modern interactive journalism.",
    stack: [
      { name: "React Native", icon: ReactIcon },
      { name: "Expo", icon: Expo },
      { name: "TypeScript", icon: Ts },
      { name: "Node.js", icon: Node },
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=com.talentfactoryafrica.voiceoftheeast",
    sourceUrl: "https://github.com/iyke-e/voice-of-the-east",
    imageUrl: VoiceOfTheEastImg.src,
    tags: ["Mobile", "React Native", "Audio Streaming", "Fullstack"],
    projectType: ["Mobile Apps", "Fullstack"],
    problem:
      "Access to South-Eastern Nigerian history, curated cultural media, and language resources was scattered across disconnected channels. Additionally, long-form archives were difficult for users to digest on the go, and regional contributors lacked a structured flow to submit verified stories.",
    solution:
      "Developed a media-rich React Native mobile app utilizing Expo Router. Implemented an advanced sentence-splitting TTS engine with system lock screen bindings, an offline-first caching system with TanStack Query and Zustand, a traditional market cycle calculator, and a high-fidelity PDF compilation pipeline.",
    features: [
      "🎙️ Advanced Text-to-Speech narration engine with sentence-splitting regex and speed controls",
      "🎵 Lock Screen audio player support utilizing a background dummy player trick for speech synthesis",
      "📅 Traditional Igbo Market Day Calculator dynamically computing Eke, Orie, Afor, and Nkwo cycles",
      "🏛️ Interactive State Archives profiles with leaderboards and timeline catalogs for five core states",
      "📄 HTML-to-PDF compilation engine allowing clean exports and native system document sharing",
      "👥 Custom subscriber and contributor onboarding workflows validated with dynamic Zod schemas",
    ],
    impact:
      "Centralized South-Eastern cultural media for thousands of users, significantly boosting engagement and loading speeds under high network latency.",
    role: "Lead Mobile Developer",
    duration: "6 weeks",
    teamSize: "1 (Solo)",
    challenges: [
      "Binding speech synthesis narration to device lock screen widgets (solved by registering a silent Expo-Audio background playback stream and mapping its remote event listener triggers to the speech narrator).",
      "Ensuring seamless offline resilience for news and media feeds in regions with unstable cell coverage (solved using TanStack Query storage persistence and Zustand AsyncStorage sync middleware).",
    ],
    lessonsLearned: [
      "Architecting complex media controls, integrating platform synthesizers with background audio focuses, and creating offline-first data synchronization layers.",
    ],
    status: "Active (Play Store)",
    metrics: [
      "📈 40% increase in average session duration via TTS accessibility features",
      "⚡ Initial app load times reduced from 3.2s to under 1.1s under high latency",
      "🔒 100% offline reliability for core historical texts and Igbo calendar utilities",
    ],
  },
  {
    featured: true,
    category: "mobile",
    name: "Crestmonie",
    description:
      "A secure cross-platform mobile investment application developed in Flutter. It enables users to browse financial markets, invest in corporate shares, track portfolios in real time, and manage funds securely. Built while interning at Integrated Software Services Ltd (ISSL).",
    stack: [
      { name: "Flutter", icon: Flutter },
      { name: "Firebase", icon: Firebase },
      { name: "TypeScript", icon: Ts },
      { name: "Node.js", icon: Node },
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=com.issl.bankeasyap4candourcrest&hl=en",
    sourceUrl: "",
    imageUrl: CondorCrestImg.src,
    tags: ["Mobile", "Flutter", "Finance", "Investment"],
    projectType: ["Mobile Apps", "Fintech"],
    problem:
      "Providing retail investors with a simple, secure, and low-latency mobile interface to buy and manage corporate shares, monitor dynamic dividend rates, and execute transactions without complex brokers.",
    solution:
      "Developed a cross-platform investment client in Flutter with Firebase backend integrations during an engineering internship. Built real-time market data indexes, a portfolio performance tracker, and secure KYC integrations.",
    features: [
      "📈 Real-time share catalog with market trends and indices",
      "💼 Interactive portfolio tracking dashboards with dividend summaries",
      "🔐 Secure KYC verification and user profile authentication",
      "💸 Fast deposit and withdrawal transaction processing logs",
    ],
    impact:
      "Enabled users to execute shares transactions within seconds, reducing typical broker-assisted delay cycles by 95% and boosting retail participation.",
    role: "Mobile Developer Intern",
    duration: "12 weeks",
    teamSize: "3 (2 Frontend, 1 Backend)",
    challenges: [
      "Handling high-precision financial decimals and keeping live share price telemetry synchronized across weak networks.",
    ],
    lessonsLearned: [
      "Advanced state management, working under corporate agile settings during my internship, and secure finance data validations.",
    ],
    status: "Active (Play Store)",
  },
  {
    featured: false,
    category: "web",
    name: "ShowcaseHub",
    description:
      "ShowcaseHub provides a simple CMS for building and managing portfolio projects, making it easy for clients and creators to keep their work up-to-date and beautifully presented.",
    stack: [
      { name: "Next.js", icon: Next },
      { name: "TypeScript", icon: Ts },
      { name: "Tailwind", icon: Tailwind },
      { name: "Supabase", icon: Supabase },
      { name: "Node.js", icon: Node },
    ],
    liveUrl: "https://showcaseh.vercel.app/",
    sourceUrl: "https://github.com/iyke-e/showcasehub",
    imageUrl:
      "https://ucarecdn.com/28bb37f2-115e-476b-9ec4-7198fa2e3248/-/preview/1000x762/",
    tags: ["Fullstack", "Dashboards", "Collaboration"],
    projectType: ["CMS", "Fullstack", "Dashboard"],

    problem:
      "Developers and freelancers often struggle to maintain updated portfolios. Hard-coded portfolio websites make it time-consuming to update projects, leading to outdated information and reduced chances with recruiters or clients.",
    solution:
      "ShowcaseHub allows creators to manage their portfolio through a CMS with easy project uploads, image management, and featured project highlighting. No need to touch code to stay current.",
    features: [
      "🔑 Secure authentication with Supabase",
      "🖼 Upload and manage multiple project images",
      "📌 Mark projects as featured for highlights",
      "⚡ Real-time project publishing",
      "📱 Responsive recruiter-friendly UI",
    ],
    impact:
      "ShowcaseHub reduces update time from hours to minutes, ensuring creators always present their most relevant work. Increased visibility and recruiter trust by providing up-to-date portfolios.",
    futureImprovements: [
      "🤝 Collaborative editing for teams",
      "📊 Analytics dashboard to track portfolio engagement",
      "🌍 SEO & social media optimization",
      "🎨 Custom branding options",
    ],
    role: "Fullstack Developer (solo project)",
    duration: "4 weeks",
    teamSize: "1 (solo)",
    challenges: [
      "Integrating Supabase storage for images",
      "Implementing secure role-based authentication",
      "Designing reusable Next.js components",
    ],
    lessonsLearned: [
      "How to structure a full CMS architecture",
      "Handling real-time data in Next.js",
      "Deploying fullstack apps with Vercel + Supabase",
    ],
    status: "Active – v1 released",
    metrics: [
      "⚡ 80% faster portfolio updates compared to static sites",
      "📈 Tested with 5 beta users who onboarded in <10 minutes",
    ],
    testimonials: [
      "“This is exactly what I needed to keep my portfolio updated easily!” – Beta User",
    ],
  },
  {
    featured: false,
    category: "web",
    name: "CampusCrib",
    description:
      "CampusCrib is an online platform for students to find available hostels around their school area.",
    stack: [
      { name: "React", icon: ReactIcon },
      { name: "TypeScript", icon: Ts },
      { name: "Tailwind", icon: Tailwind },
      { name: "Firebase", icon: Firebase },
      { name: "Node.js", icon: Node },
    ],
    liveUrl: "https://github.com/iyke-e/CampusCrib",
    sourceUrl: "https://github.com/iyke-e/CampusCrib",
    imageUrl:
      "https://max.ucarecdn.com/e6723286-8b0e-4351-a710-23ff6b9cfb7d/-/preview/1000x527/",
    tags: ["Fullstack", "Web Apps", "Dashboards", "AI/ML"],
    projectType: ["Web Apps", "Fullstack", "Dashboard"],

    problem:
      "Students face difficulties finding safe, affordable, and nearby accommodation. Information about hostels is scattered, outdated, or only accessible through word-of-mouth.",
    solution:
      "CampusCrib centralizes hostel listings into a single web app. Students can search, filter, and view available hostels around their school area, making the housing search easier and more transparent.",
    features: [
      "🏠 Browse and search hostels by price/location",
      "📸 Hostel images and details provided by landlords",
      "🔍 Filter options for budget-friendly searches",
      "📡 Firebase backend for real-time updates",
      "👩‍💻 Responsive mobile-first design",
    ],
    impact:
      "Improves student experience by providing accessible housing information, saving time and reducing stress during semester starts.",
    futureImprovements: [
      "🤖 AI-based recommendation for hostels",
      "💳 Payment integration for reservations",
      "⭐ Rating and review system for hostels",
      "📱 Dedicated mobile app version",
    ],
    role: "Fullstack Developer",
    duration: "6 weeks",
    teamSize: "2",
    challenges: [
      "Designing a scalable database for hostel listings",
      "Implementing search & filtering efficiently",
      "Handling real-time sync with Firebase",
    ],
    lessonsLearned: [
      "Efficient state management with React",
      "Integrating Firebase Auth and Firestore",
      "UI/UX importance in housing discovery apps",
    ],
    status: "MVP – live demo available",
    metrics: [
      "🔍 100+ hostel listings added during testing",
      "📈 Reduced search time for students by 70%",
    ],
  },
  {
    featured: false,
    category: "web",
    name: "Developer Portfolio",
    description:
      "Portfolio website built with React and custom REST API, featuring responsive design, database integration, and seamless interactions.",
    stack: [
      { name: "React", icon: ReactIcon },
      { name: "Tailwind", icon: Tailwind },
      { name: "Vite", icon: Vite },
      { name: "TypeScript", icon: Ts },
      { name: "Vercel", icon: Vercel },
    ],
    liveUrl: "https://personal-portfolio-v-2-0.pages.dev/",
    sourceUrl: "https://github.com/iyke-e/personal-portfolio-v.2.0",
    imageUrl:
      "https://ucarecdn.com/fe937da7-2b4b-464a-be23-aef8ae6ca059/personalportfoliov20.png",
    tags: ["React", "Frontend", "REST API"],
    projectType: ["Portfolio/Branding"],

    problem:
      "Developers often struggle with outdated or unprofessional portfolios that fail to highlight their skills effectively to recruiters.",
    solution:
      "A modern developer portfolio with a custom REST API backend, dynamic project integration, responsive design, and branding features.",
    features: [
      "💼 Showcase of projects with live/demo links",
      "🖼 Dynamic project images and details",
      "📱 Fully responsive mobile-first design",
      "🚀 Fast performance with Vite bundling",
      "🌐 Hosted on Vercel with CI/CD pipeline",
    ],
    impact:
      "Improved personal branding, providing recruiters with a clear overview of skills, projects, and technical strengths.",
    futureImprovements: [
      "📊 Blog section for thought leadership",
      "📧 Contact form with email integration",
      "🧑‍💼 SEO optimization for personal branding",
    ],
    role: "Frontend Developer",
    duration: "2 weeks",
    teamSize: "1 (solo)",
    challenges: [
      "Creating a clean and minimal UI",
      "Managing responsive layouts across devices",
      "Integrating API-based dynamic project data",
    ],
    lessonsLearned: [
      "Deploying frontends with Vercel",
      "Best practices for responsive UI design",
      "Setting up custom REST APIs for portfolios",
    ],
    status: "Active",
    metrics: [
      "📈 Portfolio visits increased by 40% after launch",
      "🤝 Direct recruiter outreach via LinkedIn & website",
    ],
  },
  {
    featured: false,
    category: "web",
    name: "Space Tourism Website",
    description:
      "Complete website using React and SCSS, providing user-friendly space information with responsive design and visual appeal.",
    stack: [
      { name: "React", icon: ReactIcon },
      { name: "CSS/SCSS", icon: CSS },
      { name: "Vite", icon: Vite },
      { name: "HTML", icon: HTML },
    ],
    liveUrl: "https://iykedev-space-website.netlify.app/",
    sourceUrl: "https://github.com/iyke-e/space-tourism-website",
    imageUrl:
      "https://max.ucarecdn.com/94a2388c-2a4a-4c2a-9d8c-68ea5d95f62a/-/preview/812x520/",
    tags: ["React", "Frontend", "Responsive"],
    projectType: ["UI/Design"],

    problem:
      "Space-related content is often presented in a complex way, overwhelming casual learners.",
    solution:
      "A visually appealing, educational, and fully responsive site that presents space tourism and exploration content in a simplified manner.",
    features: [
      "🌌 Interactive pages for destinations and crew members",
      "🎨 Modern UI with SCSS styling",
      "📱 Responsive design across devices",
      "🚀 Smooth navigation and animations",
    ],
    impact:
      "Encourages public interest in space exploration through a fun and easy-to-use educational interface.",
    futureImprovements: [
      "📺 Adding video content for immersive learning",
      "🎧 Voice-assisted navigation for accessibility",
    ],
    role: "Frontend Developer",
    duration: "1 week",
    teamSize: "1 (solo)",
    challenges: [
      "Implementing SCSS modules with React",
      "Designing a consistent theme for multiple pages",
    ],
    lessonsLearned: [
      "Advanced SCSS structuring",
      "Creating educational interfaces with React",
    ],
    status: "Completed",
    metrics: ["👩‍🎓 Tested with 10 users, 90% reported ease of navigation"],
  },
  {
    featured: false,
    category: "web",
    name: "URL Shortening API Landing Page",
    description:
      "Web app for shortening URLs with CleanURI API, featuring browser storage, error validation, and responsive design.",
    stack: [
      { name: "React", icon: ReactIcon },
      { name: "Tailwind", icon: Tailwind },
      { name: "JavaScript", icon: Js },
      { name: "Vite", icon: Vite },
    ],
    liveUrl: "https://iyke-e.github.io/url-shortening-api",
    sourceUrl: "https://github.com/iyke-e/url-shortening-api",
    imageUrl:
      "https://ucarecdn.com/2f7868fb-e333-4be6-a52b-73f8c274eaa4/urlshortening.png",
    tags: ["API", "Frontend", "Responsive"],
    projectType: ["Web Apps"],

    problem:
      "Users often need to share long, messy URLs which are not user-friendly, especially on mobile or social platforms.",
    solution:
      "A URL shortening tool integrated with CleanURI API, offering a simple interface to shorten, copy, and reuse links.",
    features: [
      "🔗 Generate short links with API integration",
      "📂 Save shortened URLs locally in browser",
      "⚠️ Error validation for invalid links",
      "📱 Responsive design for mobile sharing",
    ],
    impact:
      "Provides an accessible, lightweight solution for everyday link management without requiring login.",
    futureImprovements: [
      "👤 User accounts with link history",
      "📊 Analytics for click tracking",
      "💻 Custom short domains",
    ],
    role: "Frontend Developer",
    duration: "3 days",
    teamSize: "1 (solo)",
    challenges: [
      "Integrating third-party CleanURI API",
      "Ensuring error validation and persistence",
    ],
    lessonsLearned: [
      "Working with REST APIs in React",
      "Managing local browser storage",
    ],
    status: "Completed",
    metrics: ["🔗 Successfully shortened 200+ test links"],
  },
  {
    featured: false,
    category: "mobile",
    name: "Fintrack",
    description:
      "FinTrack is a personal finance management application that allows users to track income and expenses, set and monitor budgets, and visualize financial trends over time. The app provides real-time data insights, intuitive dashboards, and secure data storage, helping users understand and manage their financial habits effectively.",
    stack: [
      { name: "Expo", icon: Expo },
      { name: "TypeScript", icon: Ts },
      { name: "Supabase", icon: Supabase },
      { name: "Zustand", icon: Zustand },
    ],
    liveUrl: "https://github.com/iyke-e/fintrackapp",
    sourceUrl: "https://github.com/iyke-e/fintrackapp",
    imageUrl: "https://ucarecdn.com/61416051-b0bf-433e-814e-e16714d06ec9/-/preview/1000x750/",
    tags: ["Fullstack", "Finance", "Dashboards"],
    projectType: ["Mobile Apps", "Finance"],
    problem:
      "Keeping track of daily expenses, budgeting limits, and financial patterns across multiple cash and digital accounts is tedious, leading to poor saving habits and unexpected overspending.",
    solution:
      "Created a lightweight, cross-platform mobile expense assistant using React Native/Expo and Zustand for state tracking. Connected Supabase to save records securely and generate budget visualizations.",
    features: [
      "📊 Visual charts showing income vs. expenditure breakdowns",
      "💰 Budget thresholds alerting users when nearing category limits",
      "🔒 Secure data sync across devices with Supabase Database",
      "⚡ Fast offline state management powered by Zustand",
    ],
    role: "Mobile Developer",
    duration: "4 weeks",
    teamSize: "1 (Solo)",
    challenges: [
      "Designing local-first caching queues to ensure financial entry inputs remain functional when offline, syncing updates when connection is restored.",
    ],
    lessonsLearned: [
      "Advanced global state patterns using Zustand and setting up schema validations for transaction ledgers in relational databases.",
    ],
    status: "APK Available (Unpublished)",
  },
  {
    featured: true,
    category: "web",
    name: "The Votage Church",
    description:
      "A premium web portal built for The Votage Church to stream sermons, coordinate connect groups, publish church announcements, and manage member events. Built with Next.js, React, TypeScript, and Tailwind CSS, it offers a custom CMS for admins and a lightning-fast responsive UI for attendees.",
    stack: [
      { name: "Next.js", icon: Next },
      { name: "React", icon: ReactIcon },
      { name: "TypeScript", icon: Ts },
      { name: "Tailwind", icon: Tailwind },
    ],
    liveUrl: "https://thevotagechurch.org/home",
    sourceUrl: "",
    imageUrl: VotageChurchImg.src,
    tags: ["Next.js", "CMS", "Streaming", "Community"],
    projectType: ["Web Apps", "CMS"],
    problem:
      "The Votage Church needed a unified, high-performance platform to manage sermon media, live streaming, connect groups, and events. Existing social channels were fragmented, and administrative updates took too long.",
    solution:
      "Collaborated in a team of 4 (3 frontend, 1 backend) to construct a custom Next.js web application. Built search-optimized sermon catalogs, responsive media players, an event booking system, and a robust admin dashboard.",
    features: [
      "🎙 Streamlined sermon media catalog with search filtering",
      "📅 Interactive church events manager and reservation system",
      "📍 Connect group directory for members to locate local fellowships",
      "⚡ Custom admin dashboard to manage updates and live broadcasts",
    ],
    role: "Frontend Developer (Team of 3)",
    duration: "8 weeks",
    teamSize: "4 (3 Frontend, 1 Backend)",
    challenges: [
      "Optimizing streaming media load times and configuring high-fidelity design metrics across screen resolutions while collaborating dynamically within a larger team repository.",
    ],
    lessonsLearned: [
      "Git branching protocols for multi-developer teams, absolute component modularity, and setting up data schemas for high search visibility.",
    ],
    status: "Active - Live",
  },
];
