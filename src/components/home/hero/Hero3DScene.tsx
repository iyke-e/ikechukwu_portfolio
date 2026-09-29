"use client";

import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import InteractiveScene, { SceneController } from "@/components/3d/InteractiveScene";
import { createSceneLighting } from "@/components/3d/SceneLighting";
import { createJuncaKineticCore } from "@/components/3d/JuncaKineticCore";

export default function Hero3DScene() {
  const isDragging = useRef(false);
  const previousPointerX = useRef(0);
  const dragRotationY = useRef(0);
  const dragVelocityY = useRef(0);

  const setupScene = useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): SceneController => {
      scene.fog = new THREE.FogExp2(0x07080a, 0.08);

      // Studio Lighting
      const lighting = createSceneLighting(scene, "hero");

      // Junca Studio Kinetic 3D Sculpture Core
      const kineticCore = createJuncaKineticCore("hero");
      kineticCore.group.position.set(0, 0, 0);
      kineticCore.group.scale.setScalar(1.15);
      scene.add(kineticCore.group);

      // Ambient Celestial Floating Stardust
      const particleCount = 200;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      }

      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.022,
        transparent: true,
        opacity: 0.45,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Interactive 360° Drag Controls with Inertia
      const dom = renderer.domElement;

      const onPointerDown = (e: PointerEvent) => {
        isDragging.current = true;
        previousPointerX.current = e.clientX;
        dragVelocityY.current = 0;
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - previousPointerX.current;
        previousPointerX.current = e.clientX;
        const rotDelta = deltaX * 0.012;
        dragRotationY.current += rotDelta;
        dragVelocityY.current = rotDelta;
      };

      const onPointerUp = () => {
        isDragging.current = false;
      };

      dom.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);

      camera.position.set(0, 0, 4.4);
      camera.lookAt(0, 0, 0);

      const update = (delta: number, normX: number, normY: number, reducedMotion: boolean) => {
        kineticCore.update(delta, normX, normY, reducedMotion);
        lighting.updateMouseLight(normX, normY);

        if (!reducedMotion) {
          // Drag rotation physics with spring return
          if (isDragging.current) {
            kineticCore.group.rotation.y = dragRotationY.current;
          } else {
            dragVelocityY.current *= 0.94;
            dragRotationY.current += dragVelocityY.current;

            // Spring return toward cursor alignment
            const targetBaseRotation = normX * 0.35;
            dragRotationY.current += (targetBaseRotation - dragRotationY.current) * 0.035;
            kineticCore.group.rotation.y = dragRotationY.current;
          }

          // Camera parallax
          const targetCamX = normX * 0.35;
          const targetCamY = normY * 0.22;
          camera.position.x += (targetCamX - camera.position.x) * 0.06;
          camera.position.y += (targetCamY - camera.position.y) * 0.06;
          camera.lookAt(0, 0, 0);

          // Particles rotation
          particles.rotation.y += delta * 0.02;
        }
      };

      const dispose = () => {
        dom.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        lighting.dispose();
        kineticCore.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        scene.remove(particles);
      };

      return { update, dispose };
    },
    []
  );

  return (
    <div
      data-cursor="drag"
      data-cursor-text="DRAG 360°"
      className="w-full h-[480px] sm:h-[540px] md:h-[620px] lg:h-[700px] relative pointer-events-auto cursor-grab active:cursor-grabbing select-none"
    >
      <InteractiveScene
        cameraFov={42}
        cameraPosition={[0, 0, 4.4]}
        setupScene={setupScene}
        className="w-full h-full"
      />
    </div>
  );
}
