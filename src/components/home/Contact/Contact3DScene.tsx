"use client";

import React, { useCallback } from "react";
import * as THREE from "three";
import InteractiveScene, { SceneController } from "@/components/3d/InteractiveScene";
import { createSceneLighting } from "@/components/3d/SceneLighting";
import { createJuncaKineticCore } from "@/components/3d/JuncaKineticCore";

export default function Contact3DScene() {
  const setupScene = useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera): SceneController => {
      scene.fog = new THREE.FogExp2(0x07080a, 0.1);

      // Studio Workspace Lighting Rig
      const lighting = createSceneLighting(scene, "contact");

      // Junca Obsidian Transmission Node (Indigo Energy Core)
      const kineticCore = createJuncaKineticCore("contact");
      kineticCore.group.position.set(0, 0, 0);
      kineticCore.group.scale.setScalar(1.05);
      scene.add(kineticCore.group);

      // Minimalist Obsidian Pedestal
      const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.12, 32);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: 0x090a0f,
        roughness: 0.3,
        metalness: 0.9,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.set(0, -1.5, 0);
      scene.add(pedestal);

      // Concentric glowing ring on pedestal
      const pedRingGeo = new THREE.RingGeometry(1.4, 1.43, 48);
      const pedRingMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const pedRing = new THREE.Mesh(pedRingGeo, pedRingMat);
      pedRing.rotation.x = Math.PI / 2;
      pedRing.position.set(0, -1.43, 0);
      scene.add(pedRing);

      camera.position.set(0, 0.2, 4.2);
      camera.lookAt(0, 0, 0);

      const update = (delta: number, normX: number, normY: number, reducedMotion: boolean) => {
        kineticCore.update(delta, normX, normY, reducedMotion);
        lighting.updateMouseLight(normX, normY);

        if (!reducedMotion) {
          const targetCamX = normX * 0.3;
          const targetCamY = 0.2 + normY * 0.18;
          camera.position.x += (targetCamX - camera.position.x) * 0.05;
          camera.position.y += (targetCamY - camera.position.y) * 0.05;
          camera.lookAt(0, 0, 0);
        }
      };

      const dispose = () => {
        lighting.dispose();
        kineticCore.dispose();
        pedestalGeo.dispose();
        pedestalMat.dispose();
        pedRingGeo.dispose();
        pedRingMat.dispose();
        scene.remove(pedestal);
        scene.remove(pedRing);
      };

      return { update, dispose };
    },
    []
  );

  return (
    <div
      data-cursor="drag"
      data-cursor-text="INTERACT"
      className="w-full h-[450px] sm:h-[500px] md:h-[580px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    >
      <InteractiveScene
        cameraFov={42}
        cameraPosition={[0, 0.2, 4.2]}
        setupScene={setupScene}
        className="w-full h-full"
      />
    </div>
  );
}
