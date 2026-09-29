"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorMode, setCursorMode] = useState<"default" | "pointer" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute("data-cursor") as "default" | "pointer" | "view";
        const text = cursorTarget.getAttribute("data-cursor-text") || "";
        setCursorMode(mode || "pointer");
        setCursorText(text);
      } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setCursorMode("pointer");
        setCursorText("");
      } else {
        setCursorMode("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let frameId: number;
    const animate = () => {
      const factor = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * factor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 mix-blend-difference ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 ${
          cursorMode === "view"
            ? "w-0 h-0 opacity-0"
            : cursorMode === "pointer"
            ? "w-1.5 h-1.5 bg-white"
            : "w-1.5 h-1.5 bg-white"
        }`}
      />

      {/* Trailing Ring / View Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-white flex items-center justify-center transition-all duration-300 ${
          cursorMode === "default"
            ? "w-8 h-8 opacity-40 scale-100"
            : cursorMode === "pointer"
            ? "w-12 h-12 opacity-80 scale-110 bg-white/10"
            : "w-20 h-20 opacity-95 bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase scale-100"
        }`}
      >
        {cursorText && cursorMode === "view" && (
          <span className="text-black font-mono tracking-widest uppercase font-bold text-center px-1">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
