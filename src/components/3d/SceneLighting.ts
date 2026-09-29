import * as THREE from "three";

export interface LightingRig {
  ambient: THREE.AmbientLight;
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.DirectionalLight;
  rimLight: THREE.PointLight;
  mouseLight: THREE.PointLight;
  updateMouseLight: (normX: number, normY: number) => void;
  dispose: () => void;
}

export function createSceneLighting(scene: THREE.Scene, theme: "hero" | "about" | "skills" | "contact" = "hero"): LightingRig {
  // Ambient Light: soft, deep slate/blue tone to avoid pure black shadows
  const ambient = new THREE.AmbientLight(0x0e131f, 1.8);
  scene.add(ambient);

  // Key Light: directional, clean soft illumination from top-right
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  // Fill Light: subtle cool fill from left
  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
  fillLight.position.set(-4, 2, 2);
  scene.add(fillLight);

  // Rim Light: sharp specular rim from behind/bottom to separate character from background
  const rimLightColor = theme === "contact" ? 0x6366f1 : theme === "skills" ? 0x06b6d4 : 0x818cf8;
  const rimLight = new THREE.PointLight(rimLightColor, 3.5, 12);
  rimLight.position.set(0, -1, -3);
  scene.add(rimLight);

  // Mouse Light: responsive point light that drifts subtly with the cursor for physical interaction
  const mouseLight = new THREE.PointLight(0xffffff, 1.5, 8);
  mouseLight.position.set(0, 0, 3);
  scene.add(mouseLight);

  const updateMouseLight = (normX: number, normY: number) => {
    mouseLight.position.x = normX * 3.5;
    mouseLight.position.y = normY * 3.5 + 0.5;
    mouseLight.position.z = 2.8 - Math.abs(normX * normY) * 0.5;
  };

  const dispose = () => {
    scene.remove(ambient);
    scene.remove(keyLight);
    scene.remove(fillLight);
    scene.remove(rimLight);
    scene.remove(mouseLight);
    ambient.dispose();
    keyLight.dispose();
    fillLight.dispose();
    rimLight.dispose();
    mouseLight.dispose();
  };

  return { ambient, keyLight, fillLight, rimLight, mouseLight, updateMouseLight, dispose };
}
