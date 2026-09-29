"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiActivity,
  FiCpu,
  FiShield,
  FiCheckCircle,
  FiLayers,
  FiRadio,
  FiTrendingUp,
  FiCompass,
  FiArrowUpRight,
  FiSmartphone,
  FiLock,
} from "react-icons/fi";
import { projectExtended } from "@/data/projectExtended";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any | null;
}

export default function ProjectDetailModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "deliverables" | "metrics">("architecture");

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const foundExtended = projectExtended.find((item) => item.name === project.name);

  const isVoiceOfTheEast =
    project.name.toLowerCase().includes("voice") || project.id === "voice-of-the-east";
  const isCrestmonie =
    project.name.toLowerCase().includes("crest") || project.id === "crestmonie";

  const themeAccent = isVoiceOfTheEast ? "#10b981" : isCrestmonie ? "#0ea5e9" : "#ed3327";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
    >
      {/* Cinematic Modal Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1150px] max-h-[92vh] rounded-[2.5rem] bg-[var(--bg)] hairline-all shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-[var(--fg)]"
      >
        {/* Dynamic Ambient Header Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{ backgroundColor: themeAccent }}
        />

        {/* Minimalist Top Control Bar */}
        <div className="relative z-20 px-6 sm:px-10 py-5 hairline-b flex items-center justify-between bg-[var(--bg)]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: themeAccent }}
            />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)]">
              // STUDIO DOSSIER // {project.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[10px] text-[var(--fg-muted)]">
              [ ESC TO EXIT ]
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hairline-all flex items-center justify-center text-[var(--fg-2)] hover:text-[var(--fg)] hover:border-[var(--red)] transition-all cursor-pointer"
              title="Close Case Study"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Cinematic Case Study Body */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-10 py-8 md:py-12 space-y-12">
          
          {/* Header Title Section */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--fg-3)] uppercase tracking-wider">
              <span className="px-3 py-1 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)]">
                {project.category === "mobile" ? "Cross-Platform Mobile" : "Web & Systems"}
              </span>
              <span>•</span>
              <span>{project.duration || foundExtended?.duration || "6 Weeks Sprint"}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">
                {project.status || foundExtended?.status || "Production Release"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[var(--fg)] leading-[1.02]">
              {project.name}
            </h1>

            <p className="text-base sm:text-xl font-mono text-[var(--fg-2)] leading-relaxed">
              {project.tagline || (foundExtended && foundExtended.description) || project.description}
            </p>
          </div>

          {/* Key Metrics & Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl hairline-all bg-[var(--surface)]/30">
            <div>
              <span className="font-mono text-[10px] text-[var(--fg-3)] uppercase tracking-widest block mb-1">
                ENGINEERING ROLE
              </span>
              <p className="font-heading text-lg font-medium text-[var(--fg)]">
                {project.role || foundExtended?.role || "Lead Mobile Developer"}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--fg-3)] uppercase tracking-widest block mb-1">
                EXECUTION TIMELINE
              </span>
              <p className="font-heading text-lg font-medium text-[var(--fg)]">
                {project.duration || foundExtended?.duration || "6 Weeks"}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--fg-3)] uppercase tracking-widest block mb-1">
                TEAM STRUCTURE
              </span>
              <p className="font-heading text-lg font-medium text-[var(--fg)]">
                {project.teamSize || foundExtended?.teamSize || "1 (Solo Lead)"}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--fg-3)] uppercase tracking-widest block mb-1">
                APP PERFORMANCE
              </span>
              <p className="font-heading text-lg font-medium text-emerald-400 flex items-center gap-1">
                <FiActivity className="w-4 h-4" />
                <span>60 FPS Native</span>
              </p>
            </div>
          </div>

          {/* Visual Showcase Banner */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden hairline-all bg-black/60 shadow-2xl">
            <Image
              src={
                typeof project.imageUrl === "string"
                  ? project.imageUrl
                  : project.imageUrl?.src || "/projectsimg/voice_of_the_east.png"
              }
              alt={project.name}
              fill
              unoptimized
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80">
              <span className="flex items-center gap-2">
                <FiSmartphone className="w-4 h-4 text-emerald-400" />
                <span>Production Mobile UI Flow</span>
              </span>
              <span className="hidden sm:inline">PROCESSED FOR HIGH-LATENCY PERFORMANCE</span>
            </div>
          </div>

          {/* Deep Architectural Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Problem & Strategy Statement */}
              <div className="p-8 rounded-3xl hairline-all bg-[var(--surface)]/20 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-3)] uppercase tracking-widest">
                  <FiCompass className="w-4 h-4 text-[var(--red)]" />
                  <span>The Challenge &amp; Problem Space</span>
                </div>
                <p className="text-sm sm:text-base text-[var(--fg-2)] leading-relaxed font-normal">
                  {foundExtended?.problem ||
                    "Building a platform with heavy multimedia content under constrained mobile networks requires an architectural balance between instant accessibility, offline durability, and zero UI thread stutter."}
                </p>
              </div>

              {/* Solution & Implementation */}
              <div className="p-8 rounded-3xl hairline-all bg-[var(--surface)]/20 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-3)] uppercase tracking-widest">
                  <FiCpu className="w-4 h-4 text-sky-400" />
                  <span>Architectural Solution</span>
                </div>
                <p className="text-sm sm:text-base text-[var(--fg-2)] leading-relaxed font-normal">
                  {foundExtended?.solution ||
                    project.description ||
                    "Engineered a resilient cross-platform client with custom state synchronizers, local SQLite caching, and decoupled API pipelines to ensure flawless operation regardless of connectivity state."}
                </p>
              </div>

              {/* Technical Challenges & Solutions */}
              {foundExtended?.challenges && (
                <div className="p-8 rounded-3xl hairline-all bg-[var(--surface)]/20 space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-3)] uppercase tracking-widest">
                    <FiShield className="w-4 h-4 text-amber-400" />
                    <span>Technical Challenge Solved</span>
                  </div>
                  {foundExtended.challenges.map((c, i) => (
                    <p key={i} className="text-xs sm:text-sm text-[var(--fg-2)] leading-relaxed">
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Deliverables & Tech Chips */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Core Deliverables Checklist */}
              <div className="p-8 rounded-3xl hairline-all bg-[var(--surface)]/20 space-y-4">
                <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-widest block mb-2">
                  // Core Engineering Deliverables
                </span>
                <div className="space-y-3">
                  {(foundExtended?.features || project.highlights || [
                    "Native gesture responsiveness and 60fps animations",
                    "Offline-first data caching and persistence layers",
                    "Push notification dispatch architecture",
                    "Production release on Google Play Store",
                  ]).map((feat: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-[var(--fg-2)] leading-relaxed">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmarks & Metrics */}
              {(foundExtended?.metrics || project.metrics) && (
                <div className="p-8 rounded-3xl hairline-all bg-[var(--surface)]/20 space-y-3">
                  <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-widest block mb-2">
                    // Quantified Benchmarks
                  </span>
                  <div className="space-y-2.5">
                    {(foundExtended?.metrics || project.metrics).map((m: string, i: number) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg-2)] flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Stack Chips */}
              <div className="p-8 rounded-3xl hairline-all bg-[var(--surface)]/20 space-y-3">
                <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-widest block mb-2">
                  // Toolchain &amp; Libraries
                </span>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).map((t: string) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Launchpad Buttons */}
          <div className="pt-8 hairline-t flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-xl cursor-pointer"
                >
                  <span>Launch on Google Play Store</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.sourceUrl && !project.isPrivateRepo ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
                >
                  <span>View Source on GitHub</span>
                  <FiGithub className="w-4 h-4" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full hairline-all bg-[var(--surface)]/60 text-[var(--fg-3)] font-mono text-xs tracking-wider">
                  <FiLock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Private Repository (Commercial IP / Protected)</span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-4 rounded-full hairline-all text-xs font-mono uppercase tracking-wider text-[var(--fg-3)] hover:text-[var(--fg)] cursor-pointer"
            >
              [ Close Case Study ]
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
