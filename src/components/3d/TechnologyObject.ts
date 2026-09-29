import * as THREE from "three";

export interface TechItemData {
  id: string;
  name: string;
  category: "mobile" | "frontend" | "backend" | "tools" | "ai";
  color: number;
  description: string;
  proficiency: string;
}

export const TECH_CATALOG: TechItemData[] = [
  {
    id: "react-native",
    name: "React Native",
    category: "mobile",
    color: 0x61dafb,
    description: "Cross-platform mobile apps for iOS and Android with native bridging.",
    proficiency: "Core Specialization",
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "mobile",
    color: 0x02569b,
    description: "High-performance compiled mobile applications with expressive Dart widgets.",
    proficiency: "Core Specialization",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    color: 0x38bdf8,
    description: "Component architecture, declarative UI, custom hooks, and concurrent features.",
    proficiency: "Advanced",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    color: 0xf1f5f9,
    description: "SSR, ISR, Server Actions, App Router, and edge-rendered web performance.",
    proficiency: "Advanced",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    color: 0x3b82f6,
    description: "Strict static typing, generative generics, and robust scalable abstractions.",
    proficiency: "Daily Driver",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    color: 0xfacc15,
    description: "Modern ESNext, asynchronous event loops, and DOM performance optimization.",
    proficiency: "Expert",
  },
  {
    id: "dart",
    name: "Dart",
    category: "mobile",
    color: 0x0ea5e9,
    description: "Sound null safety, asynchronous streams, and reactive Flutter state.",
    proficiency: "Advanced",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    color: 0x22c55e,
    description: "High-throughput asynchronous backends, microservices, and streaming APIs.",
    proficiency: "Advanced",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "backend",
    color: 0xf59e0b,
    description: "Firestore, Cloud Auth, Realtime DB, Cloud Functions, and push notifications.",
    proficiency: "Production Ready",
  },
  {
    id: "restapi",
    name: "REST APIs",
    category: "backend",
    color: 0x10b981,
    description: "Clean RESTful design, caching headers, rate limiting, and secure endpoints.",
    proficiency: "Expert",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "tools",
    color: 0xef4444,
    description: "Branching strategies, Git flow, code reviews, and CI/CD pipelines.",
    proficiency: "Daily Driver",
  },
  {
    id: "ai",
    name: "AI & LLMs",
    category: "ai",
    color: 0xa855f7,
    description: "Hugging Face Inference, conversational agents, and LLM-driven experiences.",
    proficiency: "Applied Engineering",
  },
];

export interface TechMeshEntry {
  data: TechItemData;
  meshGroup: THREE.Group;
  basePosition: THREE.Vector3;
  targetScale: number;
  currentScale: number;
}

export function createTechnologyCloud(
  camera: THREE.PerspectiveCamera,
  onHoverChange: (item: TechItemData | null) => void
): {
  group: THREE.Group;
  update: (delta: number, normX: number, normY: number, reducedMotion?: boolean) => void;
  handlePointerMove: (normX: number, normY: number) => void;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const techEntries: TechMeshEntry[] = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const total = TECH_CATALOG.length;
  const radiusX = 2.4;
  const radiusY = 1.6;

  TECH_CATALOG.forEach((item, index) => {
    // Distribute on an elliptical orbital ribbon
    const theta = (index / total) * Math.PI * 2;
    const phi = Math.sin(index * 1.5) * 0.5;

    const x = Math.cos(theta) * radiusX;
    const y = Math.sin(theta) * 0.4 + phi * radiusY;
    const z = Math.sin(theta) * 1.2;

    const meshGroup = new THREE.Group();
    meshGroup.position.set(x, y, z);

    // 3D Hexagonal / Rounded Token Token
    const tokenGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 6);
    tokenGeo.rotateX(Math.PI / 2);

    const mat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.8,
    });

    const bodyMesh = new THREE.Mesh(tokenGeo, mat);
    bodyMesh.userData = { techData: item };
    meshGroup.add(bodyMesh);

    // Glowing core rim
    const rimGeo = new THREE.TorusGeometry(0.27, 0.02, 8, 16);
    const rimMat = new THREE.MeshStandardMaterial({
      color: item.color,
      emissive: item.color,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    meshGroup.add(rimMesh);

    // Inner icon symbol plane
    const centerGeo = new THREE.CircleGeometry(0.2, 16);
    const centerMat = new THREE.MeshBasicMaterial({
      color: item.color,
      transparent: true,
      opacity: 0.85,
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.z = 0.045;
    meshGroup.add(centerMesh);

    group.add(meshGroup);

    techEntries.push({
      data: item,
      meshGroup,
      basePosition: new THREE.Vector3(x, y, z),
      targetScale: 1,
      currentScale: 1,
    });
  });

  let hoveredItem: TechItemData | null = null;

  const handlePointerMove = (normX: number, normY: number) => {
    mouse.x = normX;
    mouse.y = normY;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(group.children, true);

    let foundItem: TechItemData | null = null;

    if (intersects.length > 0) {
      let currentObj: THREE.Object3D | null = intersects[0].object;
      while (currentObj && !foundItem) {
        if (currentObj.userData?.techData) {
          foundItem = currentObj.userData.techData;
        }
        currentObj = currentObj.parent;
      }
    }

    if (foundItem !== hoveredItem) {
      hoveredItem = foundItem;
      onHoverChange(hoveredItem);
    }
  };

  let timeAlive = 0;

  const update = (delta: number, normX: number, normY: number, reducedMotion = false) => {
    timeAlive += delta;

    // Gentle global cloud orbital rotation
    const rotationRate = reducedMotion ? 0.05 : 0.15;
    group.rotation.y = timeAlive * rotationRate + normX * 0.2;
    group.rotation.x = Math.sin(timeAlive * 0.3) * 0.08 - normY * 0.15;

    techEntries.forEach((entry) => {
      const isHovered = hoveredItem?.id === entry.data.id;
      entry.targetScale = isHovered ? 1.35 : 1.0;

      // Smooth scale lerp
      entry.currentScale += (entry.targetScale - entry.currentScale) * 0.15;
      entry.meshGroup.scale.setScalar(entry.currentScale);

      // Make token face the camera
      entry.meshGroup.quaternion.copy(camera.quaternion);

      // Hover glow enhancement
      const rim = entry.meshGroup.children[1] as THREE.Mesh;
      if (rim && rim.material instanceof THREE.MeshStandardMaterial) {
        rim.material.emissiveIntensity = isHovered ? 2.5 : 0.8;
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

  return { group, update, handlePointerMove, dispose };
}
