"use client";

import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import InteractiveScene, { SceneController } from "@/components/3d/InteractiveScene";
import { createSceneLighting } from "@/components/3d/SceneLighting";
import { createTechnologyCloud, TechItemData } from "@/components/3d/TechnologyObject";

interface Skills3DSceneProps {
  onHoverTech: (tech: TechItemData | null) => void;
}

export default function Skills3DScene({ onHoverTech }: Skills3DSceneProps) {
  const onHoverRef = useRef(onHoverTech);
  onHoverRef.current = onHoverTech;

  const setupScene = useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera): SceneController => {
      scene.fog = new THREE.FogExp2(0x0a0a0c, 0.12);

      const lighting = createSceneLighting(scene, "skills");

      // Orbital Technology Cloud
      const techCloud = createTechnologyCloud(camera, (item) => {
        onHoverRef.current(item);
      });
      scene.add(techCloud.group);

      // Ambient celestial dust
      const starsCount = 180;
      const starsGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      starsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const starsMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.025,
        transparent: true,
        opacity: 0.35,
      });
      const starField = new THREE.Points(starsGeo, starsMat);
      scene.add(starField);

      camera.position.set(0, 0, 4.8);
      camera.lookAt(0, 0, 0);

      const update = (delta: number, normX: number, normY: number, reducedMotion: boolean) => {
        techCloud.handlePointerMove(normX, normY);
        techCloud.update(delta, normX, normY, reducedMotion);
        lighting.updateMouseLight(normX, normY);

        if (!reducedMotion) {
          starField.rotation.y += delta * 0.02;
        }
      };

      const dispose = () => {
        lighting.dispose();
        techCloud.dispose();
        starsGeo.dispose();
        starsMat.dispose();
        scene.remove(starField);
      };

      return { update, dispose };
    },
    []
  );

  return (
    <div className="w-full h-[460px] md:h-[560px] lg:h-[620px] relative pointer-events-auto">
      <InteractiveScene
        cameraFov={45}
        cameraPosition={[0, 0, 4.8]}
        setupScene={setupScene}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
