"use client";

import React from "react";
import {
  FiSmartphone,
  FiGlobe,
  FiServer,
  FiTool,
  FiLayers,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowUpRight,
  FiCpu,
} from "react-icons/fi";

export default function SkillsSection() {
  return (
    <section id="stack" className="py-24 hairline-b scroll-mt-20">
      <div className="pad-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
              // 05 Repertoire &amp; Toolchain
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)]">
              Technical Matrix &amp; Stack
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider max-w-sm">
            Primary craft in mobile native &amp; modern web frontend architectures, supported by full-stack backend services and an ongoing dedication to systems mastery.
          </p>
        </div>

        {/* Specialization Spectrum Bar */}
        <div className="mb-12 p-6 rounded-2xl hairline-all bg-[var(--surface)]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-3)] mb-1">
              // Discipline Allocation &amp; Production Focus
            </div>
            <div className="text-sm font-medium text-[var(--fg)]">
              Core Specialty in Mobile &amp; Frontend • Solid Backend Support &amp; Active Expansion
            </div>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-[var(--fg)]">Mobile Native</span>
              <span className="text-[var(--fg-3)] text-[10px]">[Flagship]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="text-[var(--fg)]">Web Frontend</span>
              <span className="text-[var(--fg-3)] text-[10px]">[Flagship]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[var(--fg)]">Backend &amp; APIs</span>
              <span className="text-amber-400 text-[10px]">[Active Deep-Dive]</span>
            </div>
          </div>
        </div>

        {/* TIER 1: FLAGSHIP PRODUCTION DISCIPLINES (MOBILE & FRONTEND) */}
        <div className="mb-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-3)] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            // PRIMARY FLAGSHIP CRAFT (DAILY DRIVERS)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">

          {/* 01. MOBILE NATIVE ENGINEERING */}
          <div className="p-8 sm:p-10 rounded-2xl hairline-all bg-[var(--surface)]/30 hover:bg-[var(--surface)]/60 transition-colors flex flex-col justify-between border-l-2 border-l-emerald-400">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-[var(--fg-3)]">
                <span className="flex items-center gap-2">
                  <FiSmartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">[ 01 ]</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full hairline-all bg-emerald-400/10 text-emerald-400 text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FLAGSHIP SPECIALTY
                </span>
              </div>

              <h3 className="text-2xl font-heading font-medium text-[var(--fg)] mb-2">
                Cross-Platform Mobile Engineering
              </h3>
              <p className="text-xs text-[var(--fg-2)] font-mono mb-4">
                High-fidelity iOS &amp; Android native-feel applications with 60fps fluidity
              </p>
              <p className="text-sm text-[var(--fg-3)] leading-relaxed mb-6 font-normal">
                Extensive commercial experience architecting native-grade mobile applications with Flutter, React Native, and Expo. Obsessed with offline-first data caching, native device APIs, responsive gesture handling, and seamless App Store &amp; Google Play deployment.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl hairline-all bg-[var(--bg)]/50 font-mono text-[11px]">
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Architecture</span>
                  <span className="text-[var(--fg)] font-medium">React Native, Flutter, Expo Router, Dart</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Hardware &amp; Media</span>
                  <span className="text-[var(--fg)] font-medium">Audio, Camera, Location, Push (FCM/APNs)</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Persistence</span>
                  <span className="text-[var(--fg)] font-medium">Offline SQLite, AsyncStorage, Zustand Sync</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Distribution</span>
                  <span className="text-[var(--fg)] font-medium">App Store Connect, Google Play Console, EAS</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 hairline-t">
              {[
                "React Native",
                "Flutter",
                "Expo & Expo Router",
                "Dart",
                "TypeScript",
                "Offline SQLite",
                "Reanimated & Gestures",
                "Native Audio & Media",
                "Location & Maps",
                "Push Notifications (FCM / APNs)",
                "Zustand State Store",
                "TanStack Query Mobile",
                "App Store Release",
                "Google Play Release",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full hairline-all bg-[var(--bg)] text-[11px] font-mono text-[var(--fg-2)] tracking-wider hover:text-emerald-400 hover:border-emerald-400/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 02. WEB & REACTIVE FRONTEND */}
          <div className="p-8 sm:p-10 rounded-2xl hairline-all bg-[var(--surface)]/30 hover:bg-[var(--surface)]/60 transition-colors flex flex-col justify-between border-l-2 border-l-sky-400">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-[var(--fg-3)]">
                <span className="flex items-center gap-2">
                  <FiGlobe className="w-4 h-4 text-sky-400" />
                  <span className="text-sky-400 font-semibold">[ 02 ]</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full hairline-all bg-sky-400/10 text-sky-400 text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  FLAGSHIP SPECIALTY
                </span>
              </div>

              <h3 className="text-2xl font-heading font-medium text-[var(--fg)] mb-2">
                Modern Web &amp; Frontend Architecture
              </h3>
              <p className="text-xs text-[var(--fg-2)] font-mono mb-4">
                High-speed web platforms, design systems &amp; reactive interactive experiences
              </p>
              <p className="text-sm text-[var(--fg-3)] leading-relaxed mb-6 font-normal">
                Designing accessible, fast, and high-converting web applications with Next.js App Router, React, and TypeScript. Committed to clean design tokens, server-side rendering, sub-second load times (Lighthouse 95+), and spatial visual touches.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl hairline-all bg-[var(--bg)]/50 font-mono text-[11px]">
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Core Web Engine</span>
                  <span className="text-[var(--fg)] font-medium">Next.js (App Router), React, TypeScript</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Styling &amp; Motion</span>
                  <span className="text-[var(--fg)] font-medium">Tailwind CSS, Three.js / WebGL, CSS Tokens</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">State &amp; Cache</span>
                  <span className="text-[var(--fg)] font-medium">Zustand, Redux Toolkit, TanStack Query</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Performance</span>
                  <span className="text-[var(--fg)] font-medium">SSR / ISR, Lighthouse 95+, Core Web Vitals, SEO</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 hairline-t">
              {[
                "Next.js (App Router)",
                "React.js",
                "TypeScript",
                "JavaScript (ESNext)",
                "Tailwind CSS",
                "Zustand",
                "Redux Toolkit",
                "Server-Side Rendering (SSR/ISR)",
                "Three.js & WebGL Visuals",
                "Web Performance (Lighthouse 95+)",
                "SEO Architecture",
                "Semantic HTML5 & CSS3",
                "Vite & Modern Bundlers",
                "Responsive Fluid Layouts",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full hairline-all bg-[var(--bg)] text-[11px] font-mono text-[var(--fg-2)] tracking-wider hover:text-sky-400 hover:border-sky-400/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* TIER 2: FOUNDATIONAL BACKEND & PRODUCT WORKFLOW */}
        <div className="mb-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-3)] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            // FOUNDATIONAL BACKEND SERVICES &amp; ENGINEERING SUITE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* 03. BACKEND & DATA INFRASTRUCTURE (ACTIVE ROADMAP) */}
          <div className="p-8 sm:p-10 rounded-2xl hairline-all bg-[var(--surface)]/30 hover:bg-[var(--surface)]/60 transition-colors flex flex-col justify-between border-l-2 border-l-amber-400">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-[var(--fg-3)]">
                <span className="flex items-center gap-2">
                  <FiServer className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-semibold">[ 03 ]</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full hairline-all bg-amber-400/10 text-amber-400 text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  FULL-STACK SUPPORT                 </span>
              </div>

              <h3 className="text-2xl font-heading font-medium text-[var(--fg)] mb-2">
                Backend Services &amp; Data Architecture
              </h3>
              <p className="text-xs text-[var(--fg-2)] font-mono mb-4">
                RESTful APIs, relational databases &amp; continuous systems learning
              </p>
              <p className="text-sm text-[var(--fg-3)] leading-relaxed mb-6 font-normal">
                Developing reliable server-side APIs, database schemas, and authentication flows to power client applications. Actively dedicating focused hours into advanced backend architectures, caching patterns, and distributed systems.
              </p>

              {/* Active Roadmap Callout */}
              <div className="p-4 rounded-xl hairline-all bg-[var(--bg)]/70 mb-6 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-amber-400 mb-2 font-semibold tracking-wider uppercase">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    // ROADMAP // ACTIVE BACKEND EXPANSION
                  </span>
                  <span className="text-[var(--fg-3)] text-[9px]">[ IN INTENSIVE STUDY ]</span>
                </div>
                <p className="text-[var(--fg-2)] text-[11px] leading-relaxed mb-2 font-sans font-normal">
                  While my primary production focus is front-of-the-stack, I am actively going all-in on backend engineering: continuously deepening practical knowledge in distributed system design, relational database indexing, query optimization, and resilient event architectures.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded hairline-all bg-[var(--surface)] text-[var(--fg-2)]">System Architecture</span>
                  <span className="px-2 py-0.5 rounded hairline-all bg-[var(--surface)] text-[var(--fg-2)]">Database Optimization</span>
                  <span className="px-2 py-0.5 rounded hairline-all bg-[var(--surface)] text-[var(--fg-2)]">Distributed Caching</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 hairline-t">
              {[
                "Node.js",
                "Express.js",
                "PostgreSQL",
                "MongoDB",
                "Prisma ORM",
                "Supabase Database",
                "Firebase Firestore & Auth",
                "RESTful API Design",
                "JWT & Session Auth",
                "Redis Caching Basics",
                "Docker Containers",
                "API Rate Limiting",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full hairline-all bg-[var(--bg)] text-[11px] font-mono text-[var(--fg-2)] tracking-wider hover:text-amber-400 hover:border-amber-400/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 04. DEVELOPER WORKFLOW & TOOLING */}
          <div className="p-8 sm:p-10 rounded-2xl hairline-all bg-[var(--surface)]/30 hover:bg-[var(--surface)]/60 transition-colors flex flex-col justify-between border-l-2 border-l-purple-400">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-[var(--fg-3)]">
                <span className="flex items-center gap-2">
                  <FiTool className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold">[ 04 ]</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full hairline-all bg-purple-400/10 text-purple-400 text-[10px] tracking-wider uppercase">
                  PRODUCTION ECOSYSTEM
                </span>
              </div>

              <h3 className="text-2xl font-heading font-medium text-[var(--fg)] mb-2">
                Developer Workflow &amp; Tooling
              </h3>
              <p className="text-xs text-[var(--fg-2)] font-mono mb-4">
                Source control, design handoff &amp; modern deployment workflows
              </p>
              <p className="text-sm text-[var(--fg-3)] leading-relaxed mb-6 font-normal">
                A disciplined, battle-tested toolchain enabling clean code delivery, automated pipelines, and tight fidelity between UI/UX design and production code.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl hairline-all bg-[var(--bg)]/50 font-mono text-[11px]">
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Version Control</span>
                  <span className="text-[var(--fg)] font-medium">Git, GitHub, PR Reviews, Trunk-Based</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Design Collaboration</span>
                  <span className="text-[var(--fg)] font-medium">Figma, Tokens, Auto Layout, Specs</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">API Inspection</span>
                  <span className="text-[var(--fg)] font-medium">Postman, Thunder Client, REST specs</span>
                </div>
                <div>
                  <span className="text-[var(--fg-3)] block text-[10px] uppercase tracking-wider mb-1">Hosting &amp; CI/CD</span>
                  <span className="text-[var(--fg)] font-medium">Vercel, Netlify, GitHub Actions Basics</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 hairline-t">
              {[
                "Git",
                "GitHub",
                "VS Code",
                "Figma",
                "Vercel Deployment",
                "Postman / REST Client",
                "npm / pnpm / yarn",
                "ESLint & Prettier",
                "CI/CD Foundations",
                "Chrome DevTools",
                "Linux / CLI Basics",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full hairline-all bg-[var(--bg)] text-[11px] font-mono text-[var(--fg-2)] tracking-wider hover:text-purple-400 hover:border-purple-400/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
