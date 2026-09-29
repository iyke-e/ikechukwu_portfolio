"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  FiPlay,
  FiPause,
  FiTrendingUp,
  FiCheckCircle,
  FiVolume2,
  FiVolumeX,
  FiRadio,
  FiDollarSign,
  FiActivity,
  FiSmartphone,
  FiMonitor,
  FiLayers,
  FiTerminal,
  FiLock,
  FiExternalLink,
} from "react-icons/fi";

interface ProjectDevice3DProps {
  project: {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
    liveUrl?: string;
    accentColor?: string;
    videoUrl?: string;
  };
}

export default function ProjectDevice3D({ project }: ProjectDevice3DProps) {
  const isWebProject = project.category === "web";
  const isBackendProject = project.category === "backend";

  // Device presentation mode: desktop, mobile, dual, or terminal
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile" | "dual" | "terminal">(
    isWebProject ? "desktop" : isBackendProject ? "terminal" : "mobile"
  );

  // Sync mode whenever project category changes
  useEffect(() => {
    if (project.category === "web") {
      setDeviceMode("desktop");
    } else if (project.category === "backend") {
      setDeviceMode("terminal");
    } else {
      setDeviceMode("mobile");
    }
  }, [project.id, project.category]);

  // Audio / Trade simulation states for mobile demos
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [simulatedTradeDone, setSimulatedTradeDone] = useState(false);

  // Tilt and Glare physics
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Video playback states
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVoiceOfTheEast =
    project.id === "voice-of-the-east" || project.name.toLowerCase().includes("voice");

  // Candidate video source
  const candidateVideoUrl =
    project.videoUrl ||
    (isVoiceOfTheEast ? "/videos/voice_of_the_east.mp4" : "/videos/condor_crest.mp4");

  // Reset video error on project change
  useEffect(() => {
    setHasVideoError(false);
    setVideoLoaded(false);
  }, [project.id, project.videoUrl]);

  // Mouse tilt tracking with smooth physics
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 12,
      y: normX * 14,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleTradeSimulation = () => {
    setSimulatedTradeDone(true);
    setTimeout(() => setSimulatedTradeDone(false), 2400);
  };

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isVideoMuted;
    videoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const showVideo = candidateVideoUrl && !hasVideoError && videoLoaded;
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : `${project.id}.studio.dev`;

  return (
    <div className="relative w-full flex flex-col items-center select-none py-2">
      {/* Device Viewport Selector Bar (Available for web projects or anytime) */}
      {(isWebProject || deviceMode === "dual" || deviceMode === "desktop") && (
        <div className="mb-5 flex items-center gap-1.5 p-1 rounded-full hairline-all bg-[var(--surface)]/80 backdrop-blur-md shadow-lg z-20 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === "desktop"
                ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-sm"
                : "text-[var(--fg-3)] hover:text-[var(--fg)]"
            }`}
          >
            <FiMonitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === "mobile"
                ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-sm"
                : "text-[var(--fg-3)] hover:text-[var(--fg)]"
            }`}
          >
            <FiSmartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode("dual")}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === "dual"
                ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-sm"
                : "text-[var(--fg-3)] hover:text-[var(--fg)]"
            }`}
          >
            <FiLayers className="w-3.5 h-3.5" />
            <span>Dual Stage</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: DESKTOP BROWSER CANVAS                                            */}
      {/* ========================================================================= */}
      {deviceMode === "desktop" && (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[580px] aspect-[16/10] transition-transform duration-300 ease-out"
          style={{
            perspective: "1200px",
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -inset-4 rounded-3xl blur-[80px] pointer-events-none transition-all duration-700 opacity-30"
            style={{ backgroundColor: project.accentColor || "#38bdf8" }}
          />

          <div
            className="relative w-full h-full rounded-2xl overflow-hidden hairline-all bg-[#0d0d0f] shadow-2xl flex flex-col transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* macOS Browser Window Header */}
            <div className="h-10 px-4 bg-[#18181b] border-b border-white/10 flex items-center justify-between flex-shrink-0 z-20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>

              {/* Address Bar */}
              <div className="flex-1 max-w-xs mx-auto px-3 py-1 rounded-md bg-[#0a0a0c] border border-white/10 flex items-center justify-center gap-2 text-white/60 font-mono text-[11px] truncate">
                <FiLock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{displayUrl}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                <span>16:10</span>
              </div>
            </div>

            {/* Browser Body Screen */}
            <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
              {candidateVideoUrl && (
                <video
                  ref={videoRef}
                  src={candidateVideoUrl}
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  onError={() => setHasVideoError(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    showVideo ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}

              {/* Fallback Cover Image */}
              <Image
                src={project.imageUrl || "/projectsimg/voice_of_the_east.png"}
                alt={project.name}
                fill
                unoptimized
                className={`object-cover transition-transform duration-700 hover:scale-105 ${
                  showVideo ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />

              {/* Glass Glare */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
                  opacity: glare.opacity,
                }}
              />

              {/* Video Controls Pill */}
              {showVideo && (
                <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
                  <button
                    onClick={toggleVideoPlayback}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    {isVideoPlaying ? <FiPause className="w-3 h-3" /> : <FiPlay className="w-3 h-3 ml-0.5" />}
                  </button>
                  <button
                    onClick={toggleVideoMute}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    {isVideoMuted ? <FiVolumeX className="w-3 h-3" /> : <FiVolume2 className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: PHYSICAL 3D SMARTPHONE SIMULATOR                                  */}
      {/* ========================================================================= */}
      {deviceMode === "mobile" && (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[9/18.5] mx-auto select-none"
          style={{ perspective: "1200px" }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 -inset-x-8 rounded-full blur-[100px] pointer-events-none transition-all duration-700 opacity-40"
            style={{ backgroundColor: project.accentColor || "#10b981" }}
          />

          <div
            className="relative w-full h-full rounded-[48px] p-3 sm:p-3.5 bg-gradient-to-b from-[#242426] via-[#121214] to-[#050505] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-300 ease-out flex flex-col"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Screen Bezel */}
            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col justify-between border border-white/10">
              
              {/* Dynamic Island */}
              <div className="relative z-30 pt-3 flex items-center justify-center">
                <div className="w-24 h-5 rounded-full bg-black border border-white/15 shadow-inner flex items-center justify-between px-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0c] border border-white/20" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
                </div>
              </div>

              {/* Screen Content Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {candidateVideoUrl && (
                  <video
                    ref={videoRef}
                    src={candidateVideoUrl}
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setHasVideoError(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      showVideo ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}

                <Image
                  src={project.imageUrl || "/projectsimg/voice_of_the_east.png"}
                  alt={project.name}
                  fill
                  unoptimized
                  className={`object-cover object-center transition-opacity duration-700 ${
                    showVideo ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Glare Reflection */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                    opacity: glare.opacity,
                  }}
                />
              </div>

              {/* Bottom Interactive Lock Screen Panel when no video is playing */}
              {!showVideo && (
                <div className="relative z-30 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  {isVoiceOfTheEast ? (
                    <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <FiRadio className="w-3 h-3 animate-pulse" />
                          <span>TTS Live Narration</span>
                        </span>
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                        >
                          {isPlayingAudio ? <FiPause className="w-2.5 h-2.5" /> : <FiPlay className="w-2.5 h-2.5 ml-0.5" />}
                        </button>
                      </div>
                      <p className="font-heading text-xs font-semibold line-clamp-1">Voice of the East Broadcast</p>
                      <p className="font-mono text-[9px] text-white/60">Igbo Heritage &amp; Oral Archival Stream</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-[10px]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sky-400 font-bold">CRESTMONIE TRADE</span>
                        <span className="text-emerald-400">+4.2%</span>
                      </div>
                      <button
                        onClick={handleTradeSimulation}
                        className={`w-full mt-2 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-colors ${
                          simulatedTradeDone ? "bg-emerald-500 text-black" : "bg-sky-500 text-black"
                        }`}
                      >
                        {simulatedTradeDone ? "ORDER FILLED ✓" : "SIMULATE BUY"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Home Indicator */}
              <div className="relative z-30 pb-2 flex justify-center">
                <div className="w-28 h-1 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: DUAL STAGE (DESKTOP BROWSER + OVERLAPPING MOBILE PHONE)           */}
      {/* ========================================================================= */}
      {deviceMode === "dual" && (
        <div className="relative w-full max-w-[620px] aspect-[16/11] flex items-center justify-center">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-[90px] pointer-events-none opacity-30"
            style={{ backgroundColor: project.accentColor || "#6366f1" }}
          />

          {/* Background: Desktop Browser */}
          <div className="absolute inset-0 w-full h-[85%] rounded-2xl overflow-hidden hairline-all bg-[#0e0e11] shadow-2xl flex flex-col transform -translate-x-4">
            <div className="h-9 px-3.5 bg-[#18181b] border-b border-white/10 flex items-center justify-between z-20">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="px-3 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-white/50 flex items-center gap-1">
                <FiLock className="w-2.5 h-2.5 text-emerald-400" />
                <span>{displayUrl}</span>
              </div>
              <span className="text-[9px] font-mono text-white/30">Desktop</span>
            </div>

            <div className="relative flex-1 w-full bg-black">
              <Image
                src={project.imageUrl || "/projectsimg/voice_of_the_east.png"}
                alt={project.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Foreground: Overlapping Smartphone */}
          <div className="absolute right-0 bottom-0 w-[190px] aspect-[9/18.5] rounded-[32px] p-2 bg-[#121214] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transform translate-x-2 translate-y-3 z-30">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-black flex flex-col justify-between">
              <div className="pt-2 flex justify-center z-20">
                <div className="w-14 h-3.5 rounded-full bg-black border border-white/15" />
              </div>
              
              <Image
                src={project.imageUrl || "/projectsimg/voice_of_the_east.png"}
                alt={project.name}
                fill
                unoptimized
                className="object-cover"
              />

              <div className="pb-1.5 flex justify-center z-20">
                <div className="w-14 h-0.5 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: BACKEND TELEMETRY & TERMINAL CANVAS                               */}
      {/* ========================================================================= */}
      {deviceMode === "terminal" && (
        <div className="relative w-full max-w-[560px] aspect-[16/10] rounded-2xl hairline-all bg-[#0a0a0c] p-5 shadow-2xl flex flex-col justify-between font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] text-[var(--fg-3)]">
            <div className="flex items-center gap-2 text-emerald-400">
              <FiTerminal className="w-4 h-4" />
              <span className="font-bold">SYSTEM TELEMETRY ENGINE</span>
            </div>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>CLUSTER HEALTHY</span>
            </span>
          </div>

          <div className="space-y-2 py-3 text-[11px] leading-relaxed text-[var(--fg-2)]">
            <p className="text-white/40">// Live Service Metrics</p>
            <p className="text-emerald-400 font-semibold">&gt; Kafka Event Stream: 24,500 msg/sec [Lag: 0ms]</p>
            <p className="text-sky-400">&gt; Redis Cache Cluster: Hit Rate 99.4% [Memory: 184MB]</p>
            <p className="text-amber-400">&gt; PostgreSQL Connection Pool: 18 active / 60 max [p99: 4.2ms]</p>
            <p className="text-purple-400">&gt; gRPC Microservices: TLS 1.3 mutual auth active</p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[var(--fg-3)]">
            <span>Container: Dockerized alpine-linux</span>
            <span>Uptime: 99.99%</span>
          </div>
        </div>
      )}

      {/* Stage Subtitle */}
      <div className="mt-4 flex items-center justify-between w-full max-w-[540px] px-2 font-mono text-[9px] text-[var(--fg-3)] uppercase tracking-widest pointer-events-none">
        <span className="flex items-center gap-1.5">
          {deviceMode === "desktop" ? (
            <FiMonitor className="w-3 h-3 text-[var(--red)]" />
          ) : (
            <FiSmartphone className="w-3 h-3 text-[var(--red)]" />
          )}
          <span>{deviceMode.toUpperCase()} STAGE SIMULATOR</span>
        </span>
        <span>HOVER OR TILT TO INSPECT</span>
      </div>
    </div>
  );
}
