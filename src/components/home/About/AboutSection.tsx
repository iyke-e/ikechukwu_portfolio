"use client";

import React from "react";
import Image from "next/image";
import { FiCode, FiCpu, FiAward, FiCompass, FiTerminal, FiLayers, FiCheckCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import MouseParallax from "@/components/3d/MouseParallax";
import { soundManager } from "@/utils/audioHaptics";

export default function AboutSection() {
  const engineeringPillars = [
    {
      title: "Mobile-First Cross-Platform",
      desc: "Architecting high-performance iOS and Android applications with React Native and Flutter.",
      icon: <FiCode className="w-5 h-5 text-sky-400" />,
      tag: "CORE PILLAR",
    },
    {
      title: "Full-Stack & Realtime Backends",
      desc: "Building reliable REST APIs, WebSocket channels, Firebase authentication, and Node.js microservices.",
      icon: <FiTerminal className="w-5 h-5 text-purple-400" />,
      tag: "INFRASTRUCTURE",
    },
    {
      title: "Modern Web & Dynamic CMS",
      desc: "Designing fast, responsive web portals and recruiter dashboards using Next.js, React, and Tailwind.",
      icon: <FiLayers className="w-5 h-5 text-emerald-400" />,
      tag: "PERFORMANCE",
    },
    {
      title: "AI Integration & Machine Learning",
      desc: "Connecting language models, Hugging Face pipelines, and AI-driven interactive user experiences.",
      icon: <FiCpu className="w-5 h-5 text-amber-400" />,
      tag: "INNOVATION",
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-white/10 relative scroll-mt-20 overflow-hidden">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Technical Header */}
      <div className="pad-auto mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-400 uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          // DOSSIER [02 // FOUNDATION & ARCHITECTURE]
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Behind the Code
        </h2>
        <p className="mt-3 text-white/60 text-base md:text-lg max-w-xl mx-auto">
          The engineering principles, academic foundation, and creative mindset behind every product.
        </p>
      </div>

      <div className="pad-auto max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: 3D Character Portrait Card */}
          <div className="lg:col-span-5">
            <MouseParallax
              maxTilt={7}
              scale={1.02}
              depth={20}
              glowColor="rgba(168, 85, 247, 0.2)"
            >
              <div className="relative rounded-[2.5rem] p-4 bg-[#090b11]/85 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-black/60 border border-white/10">
                  <Image
                    src="/characters/character_cyber.jpg"
                    alt="Egwim Ikechukwu in 3D"
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Overlay Info */}
                  <div className="absolute bottom-6 inset-x-6">
                    <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                      Software Developer
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      Egwim Ikechukwu
                    </h3>
                    <p className="text-xs text-white/65 mt-1 font-mono">
                      Lagos, Nigeria • 3+ Years Building Digital Products
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-3">
                      <a
                        href="https://github.com/iyke-e"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => soundManager.playHover()}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/iyke-gp"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => soundManager.playHover()}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                      >
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="https://twitter.com/Ikechukwu_eg"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => soundManager.playHover()}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                      >
                        <FaXTwitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </MouseParallax>
          </div>

          {/* Right Column: Engineering Pillars & Story */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Story & Background Card */}
            <div className="p-8 rounded-3xl bg-[#090b11]/70 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-3">
                <FiCompass className="w-4 h-4" />
                <span>// IDENTITY &amp; CORE FOCUS</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Turning Code into High-Performance Products
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                I am a Full Stack Developer specializing in mobile-first applications with <strong className="text-white">React Native</strong>, <strong className="text-white">Flutter</strong>, and modern web platforms with <strong className="text-white">Next.js</strong>. I focus on crafting seamless, cross-platform experiences and reliable, high-throughput backend systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <FiAward className="w-4 h-4 text-purple-400" />
                  <span>B.Sc. Computer Science Degree</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Rise Academy Mobile Trainee</span>
                </div>
              </div>
            </div>

            {/* 4 Technical Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engineeringPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                      {pillar.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
