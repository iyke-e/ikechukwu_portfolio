"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";

export default function HeroMinimal3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group for entire sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Geometry 1: Sleek Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.05, 0.28, 128, 32, 2, 3);
    
    // Geometry 2: Floating Orbital Gyroscope Ring
    const ringGeometry = new THREE.TorusGeometry(1.85, 0.02, 16, 100);
    const innerRingGeometry = new THREE.TorusGeometry(1.6, 0.015, 16, 100);

    // Geometry 3: Center Core Sphere (with subtle red beacon)
    const coreGeometry = new THREE.SphereGeometry(0.35, 32, 32);

    // Materials based on theme
    const isDark = theme === "dark";

    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x141416 : 0xe8e6df,
      metalness: isDark ? 0.85 : 0.2,
      roughness: isDark ? 0.22 : 0.35,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      reflectivity: 0.8,
    });

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x333333 : 0xc0bfb8,
      wireframe: false,
    });

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xed3327, // Junca Signature Red Accent
      emissive: 0xed3327,
      emissiveIntensity: isDark ? 0.7 : 0.4,
      roughness: 0.2,
    });

    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    sculptureGroup.add(knotMesh);

    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(innerRingGeometry, ringMaterial);
    ringMesh2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ringMesh2);

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(coreMesh);

    // Subtle floating dust particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x888888 : 0x999999,
      size: 0.025,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(isDark ? 0xffffff : 0x404040, isDark ? 0.8 : 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.5 : 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, isDark ? 1.0 : 0.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // Subtle Junca Red Rim Light
    const rimLight = new THREE.PointLight(0xed3327, isDark ? 3.0 : 1.5, 8);
    rimLight.position.set(0, -2, 2);
    scene.add(rimLight);

    // Mouse Interaction Tracking with Smooth Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = mouseX * 0.9;
      targetRotationX = -mouseY * 0.9;
    };

    const onMouseEnter = () => {
      isHovering = true;
    };

    const onMouseLeave = () => {
      isHovering = false;
      targetRotationX = 0;
      targetRotationY = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // Window Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous subtle ambient drift
      sculptureGroup.rotation.y += 0.35 * delta;
      sculptureGroup.rotation.x += 0.15 * delta;

      // Smooth lerp to user cursor
      sculptureGroup.rotation.y += (targetRotationY - sculptureGroup.rotation.y * 0.1) * 0.05;
      sculptureGroup.rotation.x += (targetRotationX - sculptureGroup.rotation.x * 0.1) * 0.05;

      // Independent counter-rotation for orbital rings
      ringMesh1.rotation.z = time * 0.25;
      ringMesh2.rotation.z = -time * 0.2;

      // Subtle breathing scale pulse on core
      const pulse = 1 + Math.sin(time * 2.5) * 0.04;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Slow particle drift
      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeometry.dispose();
      ringGeometry.dispose();
      innerRingGeometry.dispose();
      coreGeometry.dispose();
      knotMaterial.dispose();
      ringMaterial.dispose();
      coreMaterial.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Minimalist studio coordinate crosshair marks */}
      <div className="absolute top-2 left-2 font-mono text-[10px] text-[var(--fg-3)] pointer-events-none select-none opacity-40">
        +
      </div>
      <div className="absolute top-2 right-2 font-mono text-[10px] text-[var(--fg-3)] pointer-events-none select-none opacity-40">
        +
      </div>
      <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[var(--fg-3)] pointer-events-none select-none opacity-40">
        +
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[var(--fg-3)] pointer-events-none select-none opacity-40">
        +
      </div>

      {/* Subtle Junca-style technical caption */}
      <div className="absolute -bottom-6 inset-x-0 flex items-center justify-between text-[10px] font-mono text-[var(--fg-3)] uppercase tracking-widest pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
          REAL-TIME SPATIAL ARTIFACT
        </span>
        <span>DRAG TO ROTATE // 60FPS</span>
      </div>
    </div>
  );
}
