"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectDevice3D from "@/components/3d/ProjectDevice3D";
import ProjectDetailModal from "@/components/portfolio/ProjectDetailModal";
import {
  FiArrowUpRight,
  FiExternalLink,
  FiLayers,
  FiSmartphone,
  FiArrowRight,
  FiGithub,
  FiLock,
} from "react-icons/fi";
import initialProjectsData from "@/data/initialProjects";

export default function Projects() {
  // Only Voice of the East and Crestmonie by default, dynamically synced with /api/projects
  const [projects, setProjects] = useState<any[]>(
    initialProjectsData.filter((p) => p.published !== false)
  );
  const [activeProjectId, setActiveProjectId] = useState<string>("voice-of-the-east");
  const [viewMode, setViewMode] = useState<"stage" | "editorial">("stage");
  const [activeTab, setActiveTab] = useState<"mission" | "architecture" | "stack">("mission");
  const [selectedModalProject, setSelectedModalProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync with dynamic API to reflect any Admin CMS updates
  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
            if (!data.some((p) => p.id === activeProjectId)) {
              setActiveProjectId(data[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Using static projects fallback:", err);
      }
    };

    fetchLiveProjects();
  }, []);

  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0] || initialProjectsData[0];

  const handleOpenDetail = (proj: any) => {
    const modalPayload = {
      ...proj,
      stack: proj.tags.map((t: string) => ({ name: t, icon: "" })),
    };
    setSelectedModalProject(modalPayload);
    setIsModalOpen(true);
  };

  return (
    <section id="work" className="py-24 hairline-b scroll-mt-20 relative overflow-hidden">
      
      {/* Background Ambient Color Wash syncing with active project */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 opacity-20"
        style={{
          backgroundColor:
            activeProject.id === "voice-of-the-east" ? "#10b981" : "#0ea5e9",
        }}
      />

      <div className="pad-auto relative z-10">
        
        {/* Section Header & View Mode Switcher (NO CMS button exposed) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
              // 01 Selected Portfolio [0{projects.length} Flagship Systems]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)]">
              Featured Flagship Products
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* 3D Stage vs Editorial View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-full hairline-all bg-[var(--surface)]">
              <button
                onClick={() => setViewMode("stage")}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "stage"
                    ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                    : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                }`}
              >
                <FiSmartphone className="w-3.5 h-3.5" />
                <span>3D Stage</span>
              </button>
              <button
                onClick={() => setViewMode("editorial")}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "editorial"
                    ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                    : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                }`}
              >
                <FiLayers className="w-3.5 h-3.5" />
                <span>Editorial Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CINEMATIC 3D SMARTPHONE STAGE WITH VIDEO LOOP OR LIVE SIMULATION  */}
        {/* ========================================================================= */}
        {viewMode === "stage" && (
          <div className="rounded-3xl hairline-all bg-[var(--surface)]/25 backdrop-blur-xl p-6 sm:p-10 md:p-12 mb-12">
            
            {/* Project Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-8 hairline-b mb-10">
              {projects.map((proj, idx) => {
                const isSelected = proj.id === activeProject.id;
                const numStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[var(--fg)] text-[var(--bg)] font-bold shadow-lg scale-102"
                        : "hairline-all bg-[var(--surface)]/50 text-[var(--fg-2)] hover:text-[var(--fg)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <span className={isSelected ? "text-[var(--red)]" : "text-[var(--fg-3)]"}>
                      [{numStr}]
                    </span>
                    <span>{proj.name}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />}
                  </button>
                );
              })}
            </div>

            {/* Stage Layout: Left Info & Telemetry, Right 3D Device Viewport */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Presentation & Telemetry */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  
                  {/* Eyebrow metadata */}
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--fg-3)] uppercase tracking-wider mb-2">
                    <span className="px-2.5 py-0.5 rounded-full hairline-all bg-[var(--bg)] text-[var(--fg-2)]">
                      {activeProject.category === "mobile" ? "Cross-Platform Mobile App" : "Web Platform"}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">{activeProject.status || "Active (Google Play)"}</span>
                  </div>

                  {/* Monumental Headline */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)] mb-3">
                    {activeProject.name}
                  </h3>
                  <p className="text-sm sm:text-base font-mono text-[var(--fg-3)] mb-6 max-w-xl">
                    {activeProject.tagline}
                  </p>

                  {/* Interactive Inspector Tabs */}
                  <div className="flex items-center gap-2 pb-3 mb-4 hairline-b text-xs font-mono">
                    <button
                      onClick={() => setActiveTab("mission")}
                      className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer relative ${
                        activeTab === "mission"
                          ? "text-[var(--fg)] font-semibold"
                          : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      <span>01. Strategy &amp; Problem</span>
                      {activeTab === "mission" && (
                        <span className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[var(--red)]" />
                      )}
                    </button>

                    <span className="text-[var(--fg-3)]">/</span>

                    <button
                      onClick={() => setActiveTab("architecture")}
                      className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer relative ${
                        activeTab === "architecture"
                          ? "text-[var(--fg)] font-semibold"
                          : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      <span>02. Architecture &amp; Benchmarks</span>
                      {activeTab === "architecture" && (
                        <span className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[var(--red)]" />
                      )}
                    </button>

                    <span className="text-[var(--fg-3)]">/</span>

                    <button
                      onClick={() => setActiveTab("stack")}
                      className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer relative ${
                        activeTab === "stack"
                          ? "text-[var(--fg)] font-semibold"
                          : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      <span>03. Tech Toolchain</span>
                      {activeTab === "stack" && (
                        <span className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[var(--red)]" />
                      )}
                    </button>
                  </div>

                  {/* Tab Body Content */}
                  <div className="min-h-[140px] py-2 mb-8">
                    {activeTab === "mission" && (
                      <div className="space-y-3 animate-fadeIn">
                        <p className="text-sm md:text-base text-[var(--fg-2)] leading-relaxed font-normal">
                          {activeProject.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px] text-[var(--fg-3)]">
                          <div>
                            <span className="text-[var(--fg-muted)] block">ENGINEERING ROLE</span>
                            <span className="text-[var(--fg)] font-medium">{activeProject.role || "Lead Mobile Developer"}</span>
                          </div>
                          <div>
                            <span className="text-[var(--fg-muted)] block">DEVELOPMENT CYCLE</span>
                            <span className="text-[var(--fg)] font-medium">{activeProject.duration || "6 Weeks"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "architecture" && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                          {activeProject.metrics?.map((m: string, i: number) => (
                            <div key={i} className="p-3 rounded-xl hairline-all bg-[var(--bg)]/80 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                              <span className="text-[var(--fg-2)] text-[11px]">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "stack" && (
                      <div className="space-y-3 animate-fadeIn">
                        <p className="text-xs font-mono text-[var(--fg-3)] mb-2">
                          Production packages &amp; native modules integrated:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-full hairline-all bg-[var(--bg)] text-xs font-mono text-[var(--fg)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Triggers */}
                <div className="flex flex-wrap items-center gap-4 pt-4 hairline-t">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
                    >
                      <span>{activeProject.category === "mobile" ? "Launch on Google Play" : "Open Live App"}</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {activeProject.sourceUrl && !activeProject.isPrivateRepo ? (
                    <a
                      href={activeProject.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
                    >
                      <span>Source Code</span>
                      <FiGithub className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full hairline-all bg-[var(--surface)]/30 text-[var(--fg-3)] font-mono text-[11px] uppercase tracking-wider">
                      <FiLock className="w-3 h-3 text-amber-500" />
                      <span>Private IP</span>
                    </span>
                  )}

                  <button
                    onClick={() => handleOpenDetail(activeProject)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
                  >
                    <span>Deep Case Study</span>
                    <FiArrowUpRight className="w-3.5 h-3.5 text-[var(--red)]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Physical 3D Smartphone Mockup Simulator */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <ProjectDevice3D project={activeProject} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: EDITORIAL ARCHIVE GRID (JUNCA STUDIO SPLIT CARDS)                 */}
        {/* ========================================================================= */}
        {viewMode === "editorial" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 animate-fadeIn mb-12">
            {projects.map((item, idx) => {
              const numStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
              const totalStr = projects.length < 10 ? `0${projects.length}` : `${projects.length}`;

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  data-cursor="view"
                  data-cursor-text="CASE"
                  className="group flex flex-col gap-5 cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[var(--surface)] hairline-all group-hover:border-[var(--fg-3)] transition-all duration-500">
                    <Image
                      src={item.imageUrl || "/projectsimg/voice_of_the_east.png"}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      {item.tags.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--bg)] hairline-all flex items-center justify-center text-[var(--fg)] shadow-md group-hover:bg-[var(--red)] group-hover:text-white group-hover:border-[var(--red)] transition-all duration-300">
                      <FiArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--fg-3)] uppercase tracking-wider mb-1">
                        <span>{numStr} / {totalStr}</span>
                        <span>•</span>
                        <span>{item.category === "mobile" ? "Mobile Application" : "Web Platform"}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">{item.status || "Active"}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-heading font-medium text-[var(--fg)] group-hover:text-[var(--red)] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--fg-2)] mt-1.5 line-clamp-2 max-w-lg leading-relaxed font-normal">
                        {item.tagline || item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* LINK TO COMPLETE REPERTOIRE DIRECTORY (SCALES AS PROJECTS GROW)           */}
        {/* ========================================================================= */}
        <div className="pt-6 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full hairline-all bg-[var(--surface)]/40 hover:bg-[var(--surface)] text-[var(--fg)] font-mono text-xs uppercase tracking-wider transition-all"
          >
            <span>Explore Complete Engineering Archive &amp; Repertoire</span>
            <FiArrowRight className="w-4 h-4 text-[var(--red)] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedModalProject}
      />
    </section>
  );
}
