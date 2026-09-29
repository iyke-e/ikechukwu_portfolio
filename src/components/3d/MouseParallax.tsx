"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useParallax";

interface MouseParallaxProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
  scale?: number; // scale factor on hover
  depth?: number; // visual translateZ in px
  glowColor?: string;
  onClick?: () => void;
}

export default function MouseParallax({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.025,
  depth = 30,
  glowColor = "rgba(99, 102, 241, 0.15)",
  onClick,
}: MouseParallaxProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / rect.width) * 2 - 1;
      const normY = (clientY / rect.height) * 2 - 1;

      // Invert Y for standard natural tilt
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      setTilt({ x: tiltX, y: tiltY });
      setGlare({
        x: (clientX / rect.width) * 100,
        y: (clientY / rect.height) * 100,
        opacity: 0.8,
      });
    },
    [maxTilt, reducedMotion]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const transformStyle = reducedMotion
    ? undefined
    : {
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(${depth}px) scale(${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative group preserve-3d cursor-pointer ${className}`}
    >
      {/* Dynamic Lighting Glare Overlay */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Content wrapper with translate-z support */}
      <div className="w-full h-full transform-style-preserve-3d">{children}</div>
    </div>
  );
}
