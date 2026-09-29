"use client";

import React, { useCallback } from "react";
import * as THREE from "three";
import InteractiveScene, { SceneController } from "@/components/3d/InteractiveScene";
import { createSceneLighting } from "@/components/3d/SceneLighting";
import { createJuncaKineticCore } from "@/components/3d/JuncaKineticCore";
import { createFloatingArtifacts } from "@/components/3d/FloatingObject";

export default function About3DScene() {
  const setupScene = useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera): SceneController => {
      scene.fog = new THREE.FogExp2(0x07080a, 0.08);

      // Studio Lighting
      const lighting = createSceneLighting(scene, "about");

      // Central Kinetic Holographic Core (Purple/Magenta Energy Theme)
      const kineticCore = createJuncaKineticCore("about");
      kineticCore.group.position.set(0, 0, 0);
      kineticCore.group.scale.setScalar(0.95);
      scene.add(kineticCore.group);

      // Surrounding Floating Developer Artifacts
      const artifacts = createFloatingArtifacts();
      scene.add(artifacts.group);

      // Orbital Horizon Ring
      const ringGeo = new THREE.RingGeometry(2.8, 2.82, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      ringMesh.position.y = -0.4;
      scene.add(ringMesh);

      camera.position.set(0, 0.1, 5.2);
      camera.lookAt(0, 0, 0);

      const update = (delta: number, normX: number, normY: number, reducedMotion: boolean) => {
        kineticCore.update(delta, normX, normY, reducedMotion);
        artifacts.update(delta, normX, normY, reducedMotion);
        lighting.updateMouseLight(normX, normY);

        if (!reducedMotion) {
          // Camera parallax
          const targetCamX = normX * 0.4;
          const targetCamY = 0.1 + normY * 0.25;
          camera.position.x += (targetCamX - camera.position.x) * 0.05;
          camera.position.y += (targetCamY - camera.position.y) * 0.05;
          camera.lookAt(0, 0, 0);

          ringMesh.rotation.z += delta * 0.04;
        }
      };

      const dispose = () => {
        lighting.dispose();
        kineticCore.dispose();
        artifacts.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        scene.remove(ringMesh);
      };

      return { update, dispose };
    },
    []
  );

  return (
    <div
      data-cursor="drag"
      data-cursor-text="EXPLORE 3D"
      className="w-full h-[520px] md:h-[620px] lg:h-[700px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    >
      <InteractiveScene
        cameraFov={45}
        cameraPosition={[0, 0.1, 5.2]}
        setupScene={setupScene}
        className="w-full h-full"
      />
    </div>
  );
}
