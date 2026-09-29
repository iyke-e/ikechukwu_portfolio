import * as THREE from "three";

export type CoreTheme = "hero" | "about" | "contact";

export interface KineticCoreController {
  group: THREE.Group;
  innerCrystal: THREE.Mesh;
  innerWireframe: THREE.Mesh;
  gimbalRingX: THREE.Group;
  gimbalRingY: THREE.Group;
  gimbalRingZ: THREE.Group;
  orbitingShards: THREE.Group[];
  update: (delta: number, normX: number, normY: number, reducedMotion?: boolean) => void;
  dispose: () => void;
}

export function createJuncaKineticCore(theme: CoreTheme = "hero"): KineticCoreController {
  const group = new THREE.Group();

  // Premium Physical Materials
  // 1. High-Polished Chrome
  const chromeMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1f5f9,
    metalness: 0.96,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
  });

  // 2. Deep Obsidian Ceramic
  const obsidianMat = new THREE.MeshStandardMaterial({
    color: 0x0c0e14,
    metalness: 0.88,
    roughness: 0.2,
  });

  // 3. Physical Glass Shell
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.85,
    roughness: 0.04,
    transmission: 0.94,
    thickness: 1.4,
    ior: 1.52,
    reflectivity: 0.9,
  });

  // 4. Emissive Energy Core
  const coreColor = theme === "about" ? 0xa855f7 : theme === "contact" ? 0x6366f1 : 0x38bdf8;
  const coreMat = new THREE.MeshStandardMaterial({
    color: coreColor,
    emissive: coreColor,
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  const wireMat = new THREE.MeshBasicMaterial({
    color: coreColor,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });

  // Inner Core Group
  const innerCoreGroup = new THREE.Group();
  group.add(innerCoreGroup);

  // Inner Faceted Crystal
  const crystalGeo = new THREE.IcosahedronGeometry(0.55, 0);
  const innerCrystal = new THREE.Mesh(crystalGeo, coreMat);
  innerCoreGroup.add(innerCrystal);

  // Outer Wireframe Cage around crystal
  const wireGeo = new THREE.IcosahedronGeometry(0.72, 1);
  const innerWireframe = new THREE.Mesh(wireGeo, wireMat);
  innerCoreGroup.add(innerWireframe);

  // Protective Refractive Glass Sphere
  const glassGeo = new THREE.SphereGeometry(0.85, 32, 32);
  const glassSphere = new THREE.Mesh(glassGeo, glassMat);
  innerCoreGroup.add(glassSphere);

  // Internal Point Light radiating from the crystal
  const coreLight = new THREE.PointLight(coreColor, 3.5, 6);
  innerCoreGroup.add(coreLight);

  // 1st Gyroscopic Gimbal Ring (Inner X-Axis)
  const gimbalRingX = new THREE.Group();
  group.add(gimbalRingX);

  const torusXGeo = new THREE.TorusGeometry(1.22, 0.038, 16, 64);
  const torusXMesh = new THREE.Mesh(torusXGeo, chromeMat);
  gimbalRingX.add(torusXMesh);

  // Technical joint mounts on Ring X
  const mountGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16);
  const mountX1 = new THREE.Mesh(mountGeo, obsidianMat);
  mountX1.position.set(1.22, 0, 0);
  gimbalRingX.add(mountX1);
  const mountX2 = new THREE.Mesh(mountGeo, obsidianMat);
  mountX2.position.set(-1.22, 0, 0);
  gimbalRingX.add(mountX2);

  // 2nd Gyroscopic Gimbal Ring (Middle Y-Axis)
  const gimbalRingY = new THREE.Group();
  group.add(gimbalRingY);

  const torusYGeo = new THREE.TorusGeometry(1.48, 0.045, 16, 64);
  const torusYMesh = new THREE.Mesh(torusYGeo, obsidianMat);
  torusYMesh.rotation.x = Math.PI / 2;
  gimbalRingY.add(torusYMesh);

  // Chrome accents along Ring Y
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const clipGeo = new THREE.BoxGeometry(0.12, 0.12, 0.09);
    const clipMesh = new THREE.Mesh(clipGeo, chromeMat);
    clipMesh.position.set(Math.cos(angle) * 1.48, 0, Math.sin(angle) * 1.48);
    gimbalRingY.add(clipMesh);
  }

  // 3rd Outer Equatorial Ring (Outer Z-Axis with tick notches)
  const gimbalRingZ = new THREE.Group();
  group.add(gimbalRingZ);

  const torusZGeo = new THREE.TorusGeometry(1.78, 0.03, 16, 72);
  const torusZMesh = new THREE.Mesh(torusZGeo, chromeMat);
  torusZMesh.rotation.y = Math.PI / 4;
  gimbalRingZ.add(torusZMesh);

  // Floating Kinetic Satellite Shards / Orbiters
  const orbitingShards: THREE.Group[] = [];
  const shardCount = 6;
  const shardOrbitRadius = 2.15;

  for (let i = 0; i < shardCount; i++) {
    const shardGroup = new THREE.Group();
    const theta = (i / shardCount) * Math.PI * 2;
    const phi = (i % 2 === 0 ? 0.35 : -0.35);

    shardGroup.position.set(
      Math.cos(theta) * shardOrbitRadius,
      Math.sin(theta) * 0.4 + phi,
      Math.sin(theta) * shardOrbitRadius
    );

    // Beveled aerodynamic technical prism
    const shardGeo = new THREE.ConeGeometry(0.12, 0.45, 4);
    shardGeo.rotateX(Math.PI / 2);
    const shardMesh = new THREE.Mesh(shardGeo, chromeMat);
    shardGroup.add(shardMesh);

    // Glowing tip
    const tipGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const tipMesh = new THREE.Mesh(tipGeo, coreMat);
    tipMesh.position.set(0, 0, 0.24);
    shardGroup.add(tipMesh);

    group.add(shardGroup);
    orbitingShards.push(shardGroup);
  }

  let timeAlive = 0;

  const update = (delta: number, normX: number, normY: number, reducedMotion = false) => {
    timeAlive += delta;

    // Core pulsing energy
    const pulse = 1 + Math.sin(timeAlive * 3.0) * 0.08;
    innerCrystal.scale.setScalar(pulse);
    innerWireframe.scale.setScalar(1 + Math.sin(timeAlive * 2.2) * 0.05);

    // Crystal rotation
    innerCrystal.rotation.x += delta * 0.6;
    innerCrystal.rotation.y += delta * 0.8;
    innerWireframe.rotation.y -= delta * 0.4;
    innerWireframe.rotation.z += delta * 0.3;

    if (!reducedMotion) {
      // Gyroscopic differential harmonic rotation (Junca Studio hallmark)
      gimbalRingX.rotation.x += delta * 0.5;
      gimbalRingX.rotation.y += delta * 0.3;

      gimbalRingY.rotation.y -= delta * 0.4;
      gimbalRingY.rotation.z += delta * 0.25;

      gimbalRingZ.rotation.z += delta * 0.35;
      gimbalRingZ.rotation.x -= delta * 0.2;

      // Orbiting satellites
      orbitingShards.forEach((shard, idx) => {
        const speed = 0.55 + idx * 0.05;
        const currentTheta = (idx / shardCount) * Math.PI * 2 + timeAlive * speed;
        shard.position.x = Math.cos(currentTheta) * shardOrbitRadius;
        shard.position.z = Math.sin(currentTheta) * shardOrbitRadius;
        shard.position.y = Math.sin(timeAlive * 1.5 + idx) * 0.35;
        shard.rotation.y = -currentTheta + Math.PI / 2;
        shard.rotation.z = Math.sin(timeAlive * 2 + idx) * 0.2;
      });

      // Subtle global tilt reacting to cursor
      group.rotation.x += (-normY * 0.35 - group.rotation.x) * 0.08;
      group.rotation.y += (normX * 0.45 - group.rotation.y) * 0.08;
    }
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

  return {
    group,
    innerCrystal,
    innerWireframe,
    gimbalRingX,
    gimbalRingY,
    gimbalRingZ,
    orbitingShards,
    update,
    dispose,
  };
}
