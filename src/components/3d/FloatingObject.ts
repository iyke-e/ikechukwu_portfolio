import * as THREE from "three";

export interface FloatingItem {
  id: string;
  name: string;
  category: string;
  description: string;
  group: THREE.Group;
  basePosition: THREE.Vector3;
  baseRotation: THREE.Euler;
  floatSpeed: number;
  floatHeight: number;
  rotationSpeed: THREE.Vector3;
}

export function createFloatingArtifacts(): {
  group: THREE.Group;
  items: FloatingItem[];
  update: (delta: number, normX: number, normY: number, reducedMotion?: boolean) => void;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const items: FloatingItem[] = [];

  // Common materials
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1f2430, metalness: 0.8, roughness: 0.2 });
  const glowingCyan = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.6, roughness: 0.1 });
  const glowingPurple = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 0.6, roughness: 0.1 });
  const glowingGreen = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.5, roughness: 0.2 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.85, opacity: 0.4, transparent: true, roughness: 0.1 });

  // 1. Smartphone (Mobile Development)
  const phoneGroup = new THREE.Group();
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.76, 0.04), darkMetal);
  phoneGroup.add(phoneBody);
  const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.7), glowingCyan);
  phoneScreen.position.z = 0.022;
  phoneGroup.add(phoneScreen);

  items.push({
    id: "phone",
    name: "Cross-Platform Mobile",
    category: "Flutter & React Native",
    description: "Production mobile apps for iOS and Android with native performance.",
    group: phoneGroup,
    basePosition: new THREE.Vector3(-1.9, 0.9, 0.2),
    baseRotation: new THREE.Euler(0.2, 0.4, -0.1),
    floatSpeed: 1.2,
    floatHeight: 0.1,
    rotationSpeed: new THREE.Vector3(0.1, 0.2, 0.05),
  });

  // 2. Laptop (Full Stack Engineering)
  const laptopGroup = new THREE.Group();
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.025, 0.45), darkMetal);
  laptopGroup.add(lapBase);
  const lapScreen = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.025), darkMetal);
  lapScreen.position.set(0, 0.22, -0.22);
  lapScreen.rotation.x = 0.25;
  laptopGroup.add(lapScreen);
  const lapDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.39), glowingPurple);
  lapDisplay.position.set(0, 0.22, -0.205);
  lapDisplay.rotation.x = 0.25;
  laptopGroup.add(lapDisplay);

  items.push({
    id: "laptop",
    name: "Full Stack Architecture",
    category: "Next.js & Node.js",
    description: "High-throughput server infrastructure, SSR pipelines, and web applications.",
    group: laptopGroup,
    basePosition: new THREE.Vector3(1.9, 0.8, -0.1),
    baseRotation: new THREE.Euler(0.15, -0.5, 0.1),
    floatSpeed: 1.0,
    floatHeight: 0.08,
    rotationSpeed: new THREE.Vector3(0.08, -0.15, 0.04),
  });

  // 3. Code Editor Window (Clean Code & Architecture)
  const codeGroup = new THREE.Group();
  const codePanel = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.48), darkMetal);
  codeGroup.add(codePanel);
  // Window buttons
  const redDot = new THREE.Mesh(new THREE.CircleGeometry(0.02, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  redDot.position.set(-0.27, 0.2, 0.005);
  codeGroup.add(redDot);
  const yelDot = new THREE.Mesh(new THREE.CircleGeometry(0.02, 12), new THREE.MeshBasicMaterial({ color: 0xeab308 }));
  yelDot.position.set(-0.21, 0.2, 0.005);
  codeGroup.add(yelDot);
  const grnDot = new THREE.Mesh(new THREE.CircleGeometry(0.02, 12), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
  grnDot.position.set(-0.15, 0.2, 0.005);
  codeGroup.add(grnDot);
  // Code lines
  for (let i = 0; i < 4; i++) {
    const lineMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x38bdf8 : 0x94a3b8 });
    const codeLine = new THREE.Mesh(new THREE.PlaneGeometry(0.35 + (i % 3) * 0.1, 0.02), lineMat);
    codeLine.position.set(-0.05, 0.12 - i * 0.08, 0.005);
    codeGroup.add(codeLine);
  }

  items.push({
    id: "editor",
    name: "TypeScript & Clean Code",
    category: "Architecture",
    description: "Strict typing, modular state patterns, and maintainable scalable codebases.",
    group: codeGroup,
    basePosition: new THREE.Vector3(-1.7, -0.7, 0.3),
    baseRotation: new THREE.Euler(-0.1, 0.35, 0.1),
    floatSpeed: 1.4,
    floatHeight: 0.09,
    rotationSpeed: new THREE.Vector3(-0.05, 0.1, 0.02),
  });

  // 4. API Interface Node
  const apiGroup = new THREE.Group();
  const apiCore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), glowingCyan);
  apiGroup.add(apiCore);
  const apiRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.02, 8, 24), darkMetal);
  apiRing.rotation.x = Math.PI / 3;
  apiGroup.add(apiRing);

  items.push({
    id: "api",
    name: "REST & Realtime APIs",
    category: "Backend Services",
    description: "Express, Node.js, WebSockets, MongoDB, and Firebase realtime subscriptions.",
    group: apiGroup,
    basePosition: new THREE.Vector3(1.7, -0.8, 0.2),
    baseRotation: new THREE.Euler(0.3, -0.2, -0.2),
    floatSpeed: 1.1,
    floatHeight: 0.12,
    rotationSpeed: new THREE.Vector3(0.2, 0.3, 0.1),
  });

  // 5. AI Neural Orb (AI Interface & ML Integration)
  const aiGroup = new THREE.Group();
  const aiInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 1), glowingPurple);
  aiGroup.add(aiInner);
  const aiOuter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.28, 1),
    new THREE.MeshStandardMaterial({ color: 0xc084fc, wireframe: true })
  );
  aiGroup.add(aiOuter);

  items.push({
    id: "ai",
    name: "AI & Intelligent UX",
    category: "Machine Learning",
    description: "Inference pipelines, Hugging Face LLM agents, and generative workflows.",
    group: aiGroup,
    basePosition: new THREE.Vector3(0, 1.8, -0.4),
    baseRotation: new THREE.Euler(0, 0, 0),
    floatSpeed: 0.9,
    floatHeight: 0.15,
    rotationSpeed: new THREE.Vector3(0.25, 0.25, 0.1),
  });

  // 6. Cloud Infrastructure
  const cloudGroup = new THREE.Group();
  const cloudSphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), glassMat);
  const cloudSphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), glassMat);
  cloudSphere2.position.set(0.15, 0.05, 0);
  const cloudSphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), glassMat);
  cloudSphere3.position.set(-0.15, -0.02, 0);
  cloudGroup.add(cloudSphere1, cloudSphere2, cloudSphere3);

  items.push({
    id: "cloud",
    name: "Cloud & Deployment",
    category: "DevOps",
    description: "Vercel, Firebase hosting, Docker containers, and CI/CD pipelines.",
    group: cloudGroup,
    basePosition: new THREE.Vector3(-1.1, 1.4, -0.5),
    baseRotation: new THREE.Euler(0.1, 0.2, 0),
    floatSpeed: 1.3,
    floatHeight: 0.07,
    rotationSpeed: new THREE.Vector3(0.05, 0.1, 0.03),
  });

  // 7. Creative Camera & Graphic Design
  const cameraGroup = new THREE.Group();
  const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.25, 0.18), darkMetal);
  cameraGroup.add(camBody);
  const camLens = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.14, 16), darkMetal);
  camLens.rotation.x = Math.PI / 2;
  camLens.position.set(0, 0, 0.12);
  cameraGroup.add(camLens);
  const camAperture = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), glowingCyan);
  camAperture.position.set(0, 0, 0.191);
  cameraGroup.add(camAperture);

  items.push({
    id: "design",
    name: "UI/UX & Visual Design",
    category: "Figma & Creative",
    description: "Years of graphic design experience driving high-fidelity digital interfaces.",
    group: cameraGroup,
    basePosition: new THREE.Vector3(1.1, 1.5, -0.4),
    baseRotation: new THREE.Euler(0.2, -0.3, 0.1),
    floatSpeed: 1.2,
    floatHeight: 0.1,
    rotationSpeed: new THREE.Vector3(0.1, -0.15, 0.05),
  });

  // 8. Video Editing Timeline
  const timelineGroup = new THREE.Group();
  const trackGeo = new THREE.BoxGeometry(0.7, 0.18, 0.04);
  const trackMesh = new THREE.Mesh(trackGeo, darkMetal);
  timelineGroup.add(trackMesh);
  // Audio clip slice
  const clip1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.02), glowingGreen);
  clip1.position.set(-0.16, 0.03, 0.025);
  timelineGroup.add(clip1);
  // Video clip slice
  const clip2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.02), glowingPurple);
  clip2.position.set(0.12, -0.03, 0.025);
  timelineGroup.add(clip2);
  // Playhead marker
  const playhead = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.16, 0.03), glowingCyan);
  playhead.position.set(0.04, 0, 0.03);
  timelineGroup.add(playhead);

  items.push({
    id: "timeline",
    name: "Interactive Media & Audio",
    category: "Creative Tech",
    description: "Rich audio streaming feeds, sound design integration, and dynamic animation.",
    group: timelineGroup,
    basePosition: new THREE.Vector3(0, -1.6, 0.1),
    baseRotation: new THREE.Euler(0.2, 0, 0.05),
    floatSpeed: 0.95,
    floatHeight: 0.09,
    rotationSpeed: new THREE.Vector3(0.06, 0.08, 0.04),
  });

  // Add all item groups to parent group
  items.forEach((item) => {
    item.group.position.copy(item.basePosition);
    item.group.rotation.copy(item.baseRotation);
    group.add(item.group);
  });

  let timeAlive = 0;

  const update = (delta: number, normX: number, normY: number, reducedMotion = false) => {
    timeAlive += delta;

    items.forEach((item) => {
      if (!reducedMotion) {
        // Natural float offset
        const yOffset = Math.sin(timeAlive * item.floatSpeed + item.basePosition.x) * item.floatHeight;
        const xOffset = Math.cos(timeAlive * item.floatSpeed * 0.8 + item.basePosition.y) * (item.floatHeight * 0.5);

        // Cursor parallax response: objects gently shift toward / away from mouse cursor
        const mouseParallaxX = normX * 0.3 * (1 + Math.abs(item.basePosition.z));
        const mouseParallaxY = normY * 0.3 * (1 + Math.abs(item.basePosition.z));

        item.group.position.x = item.basePosition.x + xOffset + mouseParallaxX;
        item.group.position.y = item.basePosition.y + yOffset + mouseParallaxY;

        // Subtle continuous rotation
        item.group.rotation.x = item.baseRotation.x + Math.sin(timeAlive * item.rotationSpeed.x) * 0.15;
        item.group.rotation.y = item.baseRotation.y + timeAlive * item.rotationSpeed.y;
        item.group.rotation.z = item.baseRotation.z + Math.cos(timeAlive * item.rotationSpeed.z) * 0.1;
      }
    });
  };

  const dispose = () => {
    group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    });
  };

  return { group, items, update, dispose };
}
