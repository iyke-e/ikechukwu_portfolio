"use client";

import React from "react";

export default function ApproachSection() {
  const pillars = [
    {
      num: "01",
      title: "60FPS Fluidity & Speed",
      desc: "Zero bloated abstractions. Every animation, gesture responder, and state transition is optimized for instantaneous native responsiveness across mobile devices and modern desktop browsers.",
    },
    {
      num: "02",
      title: "Architectural Rigor",
      desc: "Strictly typed TypeScript, clean modular separation of concerns, offline-first data caching with Zustand/SQLite, and dependable backend APIs engineered for durability.",
    },
    {
      num: "03",
      title: "Obsessive Human Craft",
      desc: "Subtle micro-interactions, deliberate typographic hierarchy, natural physics-based animations, and clean whitespace that turn intricate technical tools into intuitive user experiences.",
    },
  ];

  const metrics = [
    { value: "03+", label: "Years Commercial Craft" },
    { value: "15+", label: "Mobile Apps & Systems" },
    { value: "99.9%", label: "Production Crash-Free Rate" },
    { value: "60FPS", label: "Smooth Gesture Target" },
  ];

  return (
    <section id="approach" className="py-24 hairline-b scroll-mt-20">
      <div className="pad-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
          // 03 Engineering Philosophy
        </div>

        {/* Massive Junca Studio Statement */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[var(--fg)] leading-[1.05]">
            I don&apos;t just write code. I engineer <span className="text-[var(--red)]">tactile products</span> that people genuinely enjoy using.
          </h2>
        </div>

        {/* 3-Column Editorial Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 hairline-t hairline-b">
          {pillars.map((p, idx) => (
            <div
              key={p.num}
              className={`p-8 sm:p-10 flex flex-col justify-between min-h-[260px] ${
                idx < 2 ? "md:hairline-r" : ""
              } hairline-b md:border-b-0 group hover:bg-[var(--surface)]/30 transition-colors`}
            >
              <div className="font-mono text-xs text-[var(--fg-3)] group-hover:text-[var(--red)] transition-colors mb-6">
                [ {p.num} // PRINCIPLE ]
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium text-[var(--fg)] mb-3">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-2)] leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics Ledger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)]">
                {m.value}
              </span>
              <span className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-wider mt-2">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
