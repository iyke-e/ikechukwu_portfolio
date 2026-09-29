"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectDetailModal from "@/components/portfolio/ProjectDetailModal";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiSearch,
  FiSmartphone,
  FiGlobe,
  FiDatabase,
  FiArrowUpRight,
  FiLock,
  FiServer,
  FiCpu,
  FiTrendingUp,
  FiCloud,
  FiLayers,
} from "react-icons/fi";
import initialProjectsData from "@/data/initialProjects";

export default function PortfolioDirectoryPage() {
  const [projects, setProjects] = useState<any[]>(initialProjectsData);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedModalProject, setSelectedModalProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryIcon = (slugOrIcon: string, className = "w-3 h-3") => {
    const key = (slugOrIcon || "").toLowerCase();
    if (key.includes("mobile") || key.includes("phone")) return <FiSmartphone className={className} />;
    if (key.includes("web") || key.includes("globe")) return <FiGlobe className={className} />;
    if (key.includes("backend") || key.includes("server")) return <FiServer className={className} />;
    if (key.includes("ai") || key.includes("cpu")) return <FiCpu className={className} />;
    if (key.includes("fintech") || key.includes("trending") || key.includes("bank")) return <FiTrendingUp className={className} />;
    if (key.includes("cloud") || key.includes("devops")) return <FiCloud className={className} />;
    return <FiLayers className={className} />;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          fetch("/api/projects?all=true"),
          fetch("/api/categories"),
        ]);
        if (projRes.ok) {
          const data = await projRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }
      } catch (err) {
        console.error("Using local database fallback:", err);
      }
    };

    loadData();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ? true : p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags?.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (proj: any) => {
    const modalPayload = {
      ...proj,
      stack: proj.tags.map((t: string) => ({ name: t, icon: "" })),
    };
    setSelectedModalProject(modalPayload);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-28 pb-24">
      <div className="pad-auto">
        
        {/* Navigation Breadcrumb Back to Home */}
        <div className="mb-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--fg-3)] hover:text-[var(--fg)] transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 text-[var(--red)] group-hover:-translate-x-1 transition-transform" />
            <span>Return to Main Portfolio Stage</span>
          </Link>
        </div>

        {/* Monumental Page Header */}
        <div className="max-w-4xl pb-12 hairline-b">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
            <span>Complete Engineering Directory &amp; Archive</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-medium tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
            All Software Engineering Projects
          </h1>

          <p className="text-base sm:text-lg text-[var(--fg-2)] leading-relaxed font-normal">
            A comprehensive repository of cross-platform mobile apps (React Native, Flutter), distributed web platforms (Next.js, TypeScript), and cloud backend infrastructure (Node.js, PostgreSQL, MongoDB, Firebase).
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Dynamic Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full hairline-all bg-[var(--surface)]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                  : "text-[var(--fg-3)] hover:text-[var(--fg)]"
              }`}
            >
              All Projects [{projects.length}]
            </button>

            {categories.map((cat) => {
              const count = projects.filter((p) => p.category?.toLowerCase() === cat.slug.toLowerCase()).length;
              if (count === 0 && selectedCategory !== cat.slug) return null;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                      ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                      : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                  }`}
                >
                  {getCategoryIcon(cat.slug, "w-3 h-3")}
                  <span>{cat.name} [{count}]</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--fg-3)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tech, title, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full hairline-all bg-[var(--surface)] text-xs font-mono text-[var(--fg)] outline-none focus:border-[var(--red)] transition-colors placeholder:text-[var(--fg-3)]/50"
            />
          </div>
        </div>

        {/* Projects Grid Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item, idx) => {
            const numStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
            const isLive = item.published !== false;

            return (
              <div
                key={item.id || item.name}
                onClick={() => handleOpenDetail(item)}
                className="group p-6 rounded-3xl hairline-all bg-[var(--surface)]/25 hover:bg-[var(--surface)]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/40 hairline-all mb-5">
                    <Image
                      src={item.imageUrl || "/projectsimg/voice_of_the_east.png"}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border backdrop-blur-md ${
                          isLive
                            ? "bg-black/70 border-emerald-500/40 text-emerald-400"
                            : "bg-black/70 border-white/20 text-white/60"
                        }`}
                      >
                        {isLive ? "● Flagship Live" : "○ Staged / Draft"}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--red)] group-hover:border-[var(--red)] transition-colors">
                      <FiArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--fg-3)] uppercase tracking-wider mb-1.5">
                    <span>{numStr}</span>
                    <span>•</span>
                    <span>{item.category === "mobile" ? "Mobile Native" : "Fullstack Web"}</span>
                    <span>•</span>
                    <span>{item.duration || "Production"}</span>
                  </div>

                  <h3 className="text-xl font-heading font-medium text-[var(--fg)] group-hover:text-[var(--red)] transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[var(--fg-2)] leading-relaxed line-clamp-3 mb-4 font-normal">
                    {item.tagline || item.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 hairline-t">
                    {item.tags?.slice(0, 4).map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono hairline-all bg-[var(--bg)] text-[var(--fg-3)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Triggers */}
                  <div className="mt-4 pt-3 flex items-center justify-between font-mono text-xs text-[var(--fg-3)]">
                    <span className="group-hover:text-[var(--fg)] transition-colors">
                      Inspect Case Study &rarr;
                    </span>
                    <div className="flex items-center gap-3">
                      {item.sourceUrl && !item.isPrivateRepo ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--fg-3)] hover:text-[var(--fg)] flex items-center gap-1"
                        >
                          <FiGithub className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-[var(--fg-3)] flex items-center gap-1">
                          <FiLock className="w-2.5 h-2.5 text-amber-500" />
                          <span>Private</span>
                        </span>
                      )}

                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--red)] hover:underline flex items-center gap-1"
                        >
                          <span>Live</span>
                          <FiExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm font-mono text-[var(--fg-3)]">
              No engineering projects match &quot;{searchTerm}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full hairline-all font-mono text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedModalProject}
      />
    </div>
  );
}
