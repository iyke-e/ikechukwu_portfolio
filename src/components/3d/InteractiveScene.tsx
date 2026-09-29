"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useParallax";

export interface SceneController {
  update: (delta: number, normX: number, normY: number, reducedMotion: boolean) => void;
  dispose?: () => void;
}

interface InteractiveSceneProps {
  className?: string;
  cameraFov?: number;
  cameraPosition?: [number, number, number];
  setupScene: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) => SceneController;
}

export default function InteractiveScene({
  className = "w-full h-full",
  cameraFov = 45,
  cameraPosition = [0, 0, 5],
  setupScene,
}: InteractiveSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Determine initial dimensions
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Setup Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cameraFov, width / height, 0.1, 100);
    camera.position.set(...cameraPosition);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Call scene setup
    const controller = setupScene(scene, camera, renderer);
    setIsLoaded(true);

    // Mouse tracking variables
    let targetNormX = 0;
    let targetNormY = 0;
    let currentNormX = 0;
    let currentNormY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetNormX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
      targetNormY = Math.max(-1, Math.min(1, -(y / rect.height) * 2 + 1));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        targetNormX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
        targetNormY = Math.max(-1, Math.min(1, -(y / rect.height) * 2 + 1));
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Viewport IntersectionObserver to pause rendering when out of sight!
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Render loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip work if canvas is off-screen

      const delta = Math.min(clock.getDelta(), 0.1); // clamp delta
      const lerpSpeed = 0.1;
      currentNormX += (targetNormX - currentNormX) * lerpSpeed;
      currentNormY += (targetNormY - currentNormY) * lerpSpeed;

      controller.update(delta, currentNormX, currentNormY, reducedMotion);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (controller.dispose) controller.dispose();
      renderer.dispose();
    };
  }, [cameraFov, cameraPosition, reducedMotion, setupScene]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
