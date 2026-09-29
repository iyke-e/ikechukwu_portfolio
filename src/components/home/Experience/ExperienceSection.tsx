"use client";

import React from "react";
import { experiences } from "@/data/experiences";

export default function ExperienceSection() {
  return (
    <section id="journey" className="py-24 hairline-b scroll-mt-20">
      <div className="pad-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
              // 04 Chronology &amp; Impact
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)]">
              Professional Journey
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider max-w-xs">
            Commercial organizations &amp; independent consulting delivering mobile applications and production platforms.
          </p>
        </div>

        {/* Minimalist Ledger Table with Hairlines */}
        <div className="hairline-t">
          {experiences.map((item, idx) => {
            const numStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <div
                key={`${item.company}-${item.year}`}
                className="py-10 hairline-b grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group hover:bg-[var(--surface)]/25 transition-colors"
              >
                {/* Column 1: Index & Timeline Period */}
                <div className="lg:col-span-3 flex items-start gap-4">
                  <span className="font-mono text-xs text-[var(--fg-3)] group-hover:text-[var(--red)] transition-colors">
                    {numStr}
                  </span>
                  <div>
                    <span className="font-mono text-xs tracking-wider text-[var(--fg-2)] uppercase block">
                      {item.year}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full hairline-all text-[10px] font-mono text-[var(--fg-3)] uppercase">
                        {item.type}
                      </span>
                      {item.year.includes("Present") && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 hairline-all border-emerald-500/30 text-[10px] font-mono uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: Role & Organization */}
                <div className="lg:col-span-4">
                  <h3 className="text-xl sm:text-2xl font-heading font-medium text-[var(--fg)] group-hover:translate-x-1 transition-transform">
                    {item.role}
                  </h3>
                  <p className="text-xs font-mono text-[var(--fg-3)] mt-1 uppercase tracking-wider">
                    {item.company}
                  </p>
                </div>

                {/* Column 3: Impact Narrative */}
                <div className="lg:col-span-5">
                  <p className="text-sm text-[var(--fg-2)] leading-relaxed font-normal">
                    {item.description}
                  </p>
                  {item.activeProject && (
                    <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl hairline-all bg-[var(--surface)] font-mono text-[11px] text-[var(--fg)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Active Client Project in Development &amp; Architecture</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
