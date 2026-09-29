"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { soundManager } from "@/utils/audioHaptics";
import { RiSparklingFill } from "react-icons/ri";

export type CharacterStyle = "studio" | "cyber" | "clay";

const CHARACTERS: Record<
  CharacterStyle,
  {
    name: string;
    label: string;
    src: string;
    tag: string;
    glow: string;
    accent: string;
  }
> = {
  studio: {
    name: "Studio 3D",
    label: "STUDIO ED.",
    src: "/characters/character_studio.jpg",
    tag: "High-Fidelity 3D Portrait // Octane Render",
    glow: "rgba(56, 189, 248, 0.25)",
    accent: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  },
  cyber: {
    name: "Cyber 3D",
    label: "CYBER ED.",
    src: "/characters/character_cyber.jpg",
    tag: "Futuristic Mobile Hologram // Arcane Tech",
    glow: "rgba(168, 85, 247, 0.25)",
    accent: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
  clay: {
    name: "Clay 3D",
    label: "CLAY ED.",
    src: "/characters/character_clay.jpg",
    tag: "Minimalist Matte Clay Figurine // Apple Style",
    glow: "rgba(245, 158, 11, 0.25)",
    accent: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
};

export default function Hero3DCharacter() {
  const [activeStyle, setActiveStyle] = useState<CharacterStyle>("studio");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const current = CHARACTERS[activeStyle];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 12,
      y: normX * 12,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.7,
    });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleSelectStyle = (style: CharacterStyle) => {
    soundManager.playClick();
    setActiveStyle(style);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Interactive Framed Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="explore"
        data-cursor-text="INSPECT"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          transition: "transform 0.12s ease-out",
        }}
        className="relative w-full max-w-[460px] aspect-square rounded-[2.5rem] p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl group cursor-pointer select-none"
      >
        {/* Dynamic Specular Light Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[2.5rem] transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, ${current.glow}, transparent 70%)`,
          }}
        />

        {/* Technical Blueprint Corner Crosshairs */}
        <div className="absolute top-4 left-4 z-20 text-white/30 font-mono text-[10px] pointer-events-none">+</div>
        <div className="absolute top-4 right-4 z-20 text-white/30 font-mono text-[10px] pointer-events-none">+</div>
        <div className="absolute bottom-12 left-4 z-20 text-white/30 font-mono text-[10px] pointer-events-none">+</div>
        <div className="absolute bottom-12 right-4 z-20 text-white/30 font-mono text-[10px] pointer-events-none">+</div>

        {/* Top Floating HUD Tag */}
        <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-white/70 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            3D DEV IDENTITY
          </span>
          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            [IKECHUKWU // 2026]
          </span>
        </div>

        {/* Inner Image Viewport with Smooth Zoom */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black/70 border border-white/10">
          <Image
            src={current.src}
            alt={current.name}
            fill
            priority
            unoptimized
            className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 460px"
          />

          {/* Vignette Shadow Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Bottom Caption Pill */}
          <div className="absolute bottom-4 inset-x-4 z-20 pointer-events-none">
            <div className="p-3 rounded-2xl bg-black/75 border border-white/15 backdrop-blur-md flex items-center justify-between shadow-xl">
              <div>
                <p className="text-xs font-bold text-white tracking-wide">
                  Egwim Ikechukwu
                </p>
                <p className="text-[10px] font-mono text-white/50">
                  {current.tag}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sky-400 text-xs font-mono">
                <RiSparklingFill className="w-3.5 h-3.5" />
                <span>3D RENDER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style Switcher Bar */}
      <div className="mt-5 flex items-center gap-2 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
        {(Object.keys(CHARACTERS) as CharacterStyle[]).map((styleKey) => {
          const item = CHARACTERS[styleKey];
          const isSelected = activeStyle === styleKey;
          return (
            <button
              key={styleKey}
              onClick={() => handleSelectStyle(styleKey)}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.35)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
