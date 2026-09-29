"use client";

import React, { useState } from "react";
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi";

const services = [
  {
    num: "01",
    title: "Cross-Platform Mobile Engineering",
    short: "React Native & Flutter iOS / Android systems",
    desc: "Architecting native-grade mobile applications with smooth 60fps gesture handling, offline-first SQLite/Zustand caching, push notification infrastructure, and automated App Store & Google Play deployment pipelines.",
    tech: ["React Native", "Flutter", "Expo", "Dart", "TypeScript", "Offline Sync", "App Store Deploys"],
  },
  {
    num: "02",
    title: "Full-Stack Web Architecture",
    short: "Next.js, React, TypeScript & Server Systems",
    desc: "Designing fast, accessible, and high-converting web applications with server-side rendering, type-safe full-stack workflows, responsive fluid layouts, and uncompromising attention to typography and load velocity.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "RESTful APIs"],
  },
  {
    num: "03",
    title: "Backend Services & Full-Stack Integration",
    short: "Node.js, Express, PostgreSQL, Prisma, MongoDB & Cloud APIs",
    desc: "Developing reliable server-side APIs, database schemas with PostgreSQL and MongoDB, authentication flows, and cloud integrations (Supabase, Firebase, Node.js). Actively dedicating deep focus to advancing backend systems architecture, caching strategies, and scalable cloud infrastructure.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma ORM", "Supabase", "Firebase", "REST APIs", "Docker", "Active Deep-Dive"],
  },
  {
    num: "04",
    title: "Interactive Spatial Craft & AI Integration",
    short: "Three.js, WebGL & Intelligent Interfaces",
    desc: "Infusing digital applications with tasteful Three.js interactive graphics, spatial animations, and direct integrations with open-source LLMs and AI pipelines to create memorable, next-generation user journeys.",
    tech: ["Three.js", "WebGL", "GSAP", "Hugging Face APIs", "LLM Workflows", "Gamification"],
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleService = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="py-24 hairline-b scroll-mt-20">
      <div className="pad-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
              // 02 Services &amp; Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)]">
              Engineering Disciplines
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider max-w-xs">
            Disciplined execution across mobile, cloud, and reactive web interfaces.
          </p>
        </div>

        {/* Hairline Accordion / Rows */}
        <div className="hairline-t">
          {services.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.num}
                className="hairline-b group transition-colors hover:bg-[var(--surface)]/30"
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleService(idx)}
                  className="w-full py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start md:items-center gap-6">
                    <span className="font-mono text-xs text-[var(--fg-3)] group-hover:text-[var(--red)] transition-colors">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-[var(--fg)] group-hover:translate-x-1 transition-transform">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-[var(--fg-3)] mt-1">
                        {item.short}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto pl-10 md:pl-0">
                    <span className="hidden sm:inline-block font-mono text-[11px] text-[var(--fg-3)] uppercase tracking-wider">
                      {isOpen ? "[ Collapse ]" : "[ Expand ]"}
                    </span>
                    <div className="w-9 h-9 rounded-full hairline-all flex items-center justify-center text-[var(--fg)] group-hover:border-[var(--red)] group-hover:text-[var(--red)] transition-colors">
                      {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="pb-8 pt-2 pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
                    <div className="lg:col-span-8">
                      <p className="text-sm md:text-base text-[var(--fg-2)] leading-relaxed mb-6 font-normal">
                        {item.desc}
                      </p>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--fg-3)] mb-3">
                        Tech Toolchain
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full hairline-all bg-[var(--surface)] text-[10px] font-mono text-[var(--fg-2)] tracking-wider"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
