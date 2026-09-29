"use client";

import React from "react";
import Link from "next/link";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import HeroMinimal3D from "@/components/3d/HeroMinimal3D";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 md:pt-28 hairline-b overflow-hidden"
    >
      {/* Editorial Corner Crosshairs */}
      <div className="hidden sm:block absolute top-24 left-6 text-[var(--fg-3)] font-mono text-xs select-none pointer-events-none opacity-40">
        +
      </div>
      <div className="hidden sm:block absolute top-24 right-6 text-[var(--fg-3)] font-mono text-xs select-none pointer-events-none opacity-40">
        +
      </div>

      {/* Main Grid: Typography & Minimalist 3D Sculpture */}
      <div className="pad-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 my-auto z-10 py-12 md:py-16">
        
        {/* Left Column: Monumental Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Eyebrow Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-[11px] tracking-widest uppercase text-[var(--fg-3)]">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
              Software Engineer &amp; Craftsman
            </span>
            <span className="text-[var(--fg-muted)] hidden sm:inline">
              [ 6.5244° N, 3.3792° E // WAT ]
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.4rem] font-heading font-medium tracking-tight text-[var(--fg)] leading-[1.05] sm:leading-[0.98] mb-8">
            Turning complex systems into <span className="text-[var(--red)]">refined, high-performance</span> digital products.
          </h1>

          {/* Editorial Supporting Description */}
          <p className="text-base sm:text-lg text-[var(--fg-2)] leading-relaxed max-w-xl mb-10 font-normal">
            Full-stack software engineer architecting native mobile apps (<strong className="text-[var(--fg)] font-medium">React Native</strong>, <strong className="text-[var(--fg)] font-medium">Flutter</strong>), scalable web systems (<strong className="text-[var(--fg)] font-medium">Next.js</strong>, <strong className="text-[var(--fg)] font-medium">TypeScript</strong>), and resilient cloud backend architectures (<strong className="text-[var(--fg)] font-medium">Node.js</strong>, <strong className="text-[var(--fg)] font-medium">PostgreSQL</strong>, <strong className="text-[var(--fg)] font-medium">Firebase</strong>).
          </p>

          {/* Minimalist CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#work"
              data-cursor="pointer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all"
            >
              <span>Explore Selected Work</span>
              <FiArrowDownRight className="w-4 h-4" />
            </Link>

            <Link
              href="#contact"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] font-mono text-xs font-medium uppercase tracking-wider hover:bg-[var(--surface-hover)] transition-all"
            >
              <span>Start Conversation</span>
              <FiArrowUpRight className="w-3.5 h-3.5 text-[var(--red)]" />
            </Link>
          </div>
        </div>

        {/* Right Column: High-End Minimalist 3D Geometry */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <HeroMinimal3D />
        </div>
      </div>

      {/* Hairline Technical Specification Bar */}
      <div className="w-full hairline-t py-4 bg-[var(--surface)]/40">
        <div className="pad-auto flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[var(--fg-3)]">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="text-[var(--fg-2)]">// ENGINEERING SCOPE:</span>
            <span>MOBILE ECOSYSTEMS</span>
            <span>•</span>
            <span>DISTRIBUTED WEB PLATFORMS</span>
            <span>•</span>
            <span>CLOUD &amp; BACKEND APIS</span>
            <span>•</span>
            <span>DATA INFRASTRUCTURE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--red)]">● PRODUCTION GRADE</span>
            <span className="hidden sm:inline">LAGOS // UTC+1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
