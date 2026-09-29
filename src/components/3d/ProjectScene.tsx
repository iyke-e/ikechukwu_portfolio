"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectProp } from "@/data/project";
import MouseParallax from "./MouseParallax";
import { FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";
import { FaGooglePlay } from "react-icons/fa";
import { soundManager } from "@/utils/audioHaptics";

interface ProjectSceneProps {
  project: ProjectProp;
  onSelect: (project: ProjectProp) => void;
  index: number;
}

export default function ProjectScene({ project, onSelect, index }: ProjectSceneProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isPlayStore = project.liveUrl?.includes("play.google.com");

  return (
    <MouseParallax
      maxTilt={8}
      scale={1.03}
      depth={24}
      glowColor={
        project.category === "mobile"
          ? "rgba(56, 189, 248, 0.2)"
          : "rgba(168, 85, 247, 0.2)"
      }
      onClick={() => {
        soundManager.playClick();
        onSelect(project);
      }}
      className="w-full h-full"
    >
      <div
        data-cursor="explore"
        data-cursor-text="CASE STUDY"
        onMouseEnter={() => soundManager.playHover()}
        className="relative rounded-3xl p-6 md:p-8 bg-[#090b11]/85 border border-white/10 hover:border-white/25 backdrop-blur-2xl transition-all duration-500 shadow-2xl flex flex-col justify-between h-full group overflow-hidden"
      >
        {/* Junca Studio Corner Crosshairs */}
        <div className="absolute top-3 left-3 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute top-3 right-3 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute bottom-3 left-3 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute bottom-3 right-3 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>

        {/* Subtle Ambient Background Gradient */}
        <div
          className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40 ${
            project.category === "mobile" ? "bg-sky-500" : "bg-indigo-500"
          }`}
        />

        {/* Top bar: Technical Index & Category badge */}
        <div className="flex items-center justify-between mb-5 z-10">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-sky-400 tracking-widest">
              [{index < 9 ? `0${index + 1}` : index + 1} // {project.category.toUpperCase()}]
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                FEATURED
              </span>
            )}
          </div>

          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            {project.projectType[0] || "SYSTEM"}
          </span>
        </div>

        {/* 3D Visual Preview Pane with Parallax Image */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/50 group-hover:border-white/25 transition-all duration-500">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-108">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              unoptimized={typeof project.imageUrl === "string"}
              className={`object-cover object-center transition-all duration-700 ${
                imageLoaded ? "opacity-90 group-hover:opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-transparent opacity-65 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

          {/* Hover prompt pill */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 shadow-lg">
            <FiLayers className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Inspect Dossier</span>
          </div>
        </div>

        {/* Content details */}
        <div className="flex-1 flex flex-col justify-between z-10">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300 mb-2">
              {project.name}
            </h3>
            <p className="text-xs md:text-sm text-white/70 line-clamp-2 leading-relaxed mb-4 group-hover:text-white/90 transition-colors">
              {project.description}
            </p>
          </div>

          {/* Tech stack badges */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/5 text-white/70 group-hover:border-white/15 group-hover:text-white/90 transition-all"
                >
                  {tech.name}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="px-2 py-1 rounded-lg text-[11px] font-mono bg-white/5 text-white/40">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* Actions: View Details + Direct Links */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick();
                  onSelect(project);
                }}
                className="text-xs font-mono font-semibold text-white/90 hover:text-white flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              >
                <span>EXPLORE DOSSIER</span>
                <span className="text-sky-400 font-bold">&rarr;</span>
              </button>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => soundManager.playClick()}
                    title={isPlayStore ? "View on Google Play" : "Open Live Application"}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all duration-300"
                  >
                    {isPlayStore ? (
                      <FaGooglePlay className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <FiExternalLink className="w-3.5 h-3.5" />
                    )}
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => soundManager.playClick()}
                    title="View Source on GitHub"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all duration-300"
                  >
                    <FiGithub className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MouseParallax>
  );
}
