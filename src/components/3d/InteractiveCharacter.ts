import * as THREE from "three";

export type CharacterPose = "hero" | "about" | "contact";

export interface CharacterController {
  group: THREE.Group;
  headGroup: THREE.Group;
  eyesGroup: THREE.Group;
  leftPupil: THREE.Mesh;
  rightPupil: THREE.Mesh;
  leftEyelid: THREE.Mesh;
  rightEyelid: THREE.Mesh;
  laptopGroup?: THREE.Group;
  update: (delta: number, normX: number, normY: number, reducedMotion?: boolean) => void;
  dispose: () => void;
}

export function createInteractiveCharacter(pose: CharacterPose = "hero"): CharacterController {
  const group = new THREE.Group();

  // Materials
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xd49b72, // Warm bronze tone
    roughness: 0.6,
    metalness: 0.05,
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x18181b, // Dark charcoal black
    roughness: 0.85,
    metalness: 0.1,
  });

  const clothMaterial = new THREE.MeshStandardMaterial({
    color: pose === "contact" ? 0x1e1e24 : 0x12141a, // Premium dark hoodie / knit
    roughness: 0.75,
    metalness: 0.15,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1, // Indigo accent
    roughness: 0.3,
    metalness: 0.8,
  });

  const headphoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x27272a,
    roughness: 0.4,
    metalness: 0.6,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.3,
    metalness: 0.7,
  });

  // Torso / Body Group
  const bodyGroup = new THREE.Group();
  group.add(bodyGroup);

  // Torso base (hoodie)
  const torsoGeo = new THREE.CylinderGeometry(0.8, 0.95, 1.6, 24);
  const torsoMesh = new THREE.Mesh(torsoGeo, clothMaterial);
  torsoMesh.position.y = -0.9;
  bodyGroup.add(torsoMesh);

  // Shoulders curvature
  const shoulderGeo = new THREE.CapsuleGeometry(0.35, 1.2, 16, 16);
  const shoulderMesh = new THREE.Mesh(shoulderGeo, clothMaterial);
  shoulderMesh.rotation.z = Math.PI / 2;
  shoulderMesh.position.set(0, -0.15, 0);
  bodyGroup.add(shoulderMesh);

  // Collar ring
  const collarGeo = new THREE.TorusGeometry(0.38, 0.08, 12, 24);
  const collarMesh = new THREE.Mesh(collarGeo, clothMaterial);
  collarMesh.rotation.x = Math.PI / 2;
  collarMesh.position.set(0, 0.05, 0);
  bodyGroup.add(collarMesh);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.4, 16);
  const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
  neckMesh.position.set(0, 0.2, 0);
  bodyGroup.add(neckMesh);

  // Head Group (rotates with gaze)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.55, 0);
  group.add(headGroup);

  // Head shape (sculpted jaw + cranium)
  const craniumGeo = new THREE.SphereGeometry(0.55, 24, 24);
  craniumGeo.scale(0.9, 1.05, 0.95);
  const craniumMesh = new THREE.Mesh(craniumGeo, skinMaterial);
  craniumMesh.position.set(0, 0.1, 0);
  headGroup.add(craniumMesh);

  const jawGeo = new THREE.CylinderGeometry(0.42, 0.3, 0.45, 16);
  jawGeo.scale(0.95, 1, 0.9);
  const jawMesh = new THREE.Mesh(jawGeo, skinMaterial);
  jawMesh.position.set(0, -0.15, 0.05);
  headGroup.add(jawMesh);

  // Hair (stylish textured fade on top)
  const hairTopGeo = new THREE.SphereGeometry(0.56, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.52);
  hairTopGeo.scale(0.93, 1.08, 0.98);
  const hairTopMesh = new THREE.Mesh(hairTopGeo, hairMaterial);
  hairTopMesh.position.set(0, 0.12, -0.02);
  headGroup.add(hairTopMesh);

  // Hair sides fade
  const hairSidesGeo = new THREE.CylinderGeometry(0.54, 0.52, 0.35, 20);
  const hairSidesMesh = new THREE.Mesh(hairSidesGeo, hairMaterial);
  hairSidesMesh.position.set(0, 0.18, -0.05);
  headGroup.add(hairSidesMesh);

  // Modern Glasses Frames
  const glassesGroup = new THREE.Group();
  glassesGroup.position.set(0, 0.1, 0.5);

  const rimLeft = new THREE.TorusGeometry(0.13, 0.02, 8, 20);
  const rimLeftMesh = new THREE.Mesh(rimLeft, frameMaterial);
  rimLeftMesh.position.set(-0.21, 0, 0);
  glassesGroup.add(rimLeftMesh);

  const rimRight = new THREE.TorusGeometry(0.13, 0.02, 8, 20);
  const rimRightMesh = new THREE.Mesh(rimRight, frameMaterial);
  rimRightMesh.position.set(0.21, 0, 0);
  glassesGroup.add(rimRightMesh);

  const bridgeGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8);
  const bridgeMesh = new THREE.Mesh(bridgeGeo, frameMaterial);
  bridgeMesh.rotation.z = Math.PI / 2;
  bridgeMesh.position.set(0, 0.02, 0);
  glassesGroup.add(bridgeMesh);

  const lensLeft = new THREE.CircleGeometry(0.12, 16);
  const lensLeftMesh = new THREE.Mesh(lensLeft, glassMaterial);
  lensLeftMesh.position.set(-0.21, 0, 0);
  glassesGroup.add(lensLeftMesh);

  const lensRight = new THREE.CircleGeometry(0.12, 16);
  const lensRightMesh = new THREE.Mesh(lensRight, glassMaterial);
  lensRightMesh.position.set(0.21, 0, 0);
  glassesGroup.add(lensRightMesh);

  headGroup.add(glassesGroup);

  // Eyes Group (inner eyeballs + pupils)
  const eyesGroup = new THREE.Group();
  eyesGroup.position.set(0, 0.1, 0.44);

  const scleraGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const scleraMat = new THREE.MeshBasicMaterial({ color: 0xf4f4f5 });

  const leftEye = new THREE.Mesh(scleraGeo, scleraMat);
  leftEye.position.set(-0.21, 0, 0);
  eyesGroup.add(leftEye);

  const rightEye = new THREE.Mesh(scleraGeo, scleraMat);
  rightEye.position.set(0.21, 0, 0);
  eyesGroup.add(rightEye);

  // Pupils (track cursor independently within sclera!)
  const pupilGeo = new THREE.SphereGeometry(0.038, 12, 12);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111827 });

  const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
  leftPupil.position.set(-0.21, 0, 0.05);
  eyesGroup.add(leftPupil);

  const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
  rightPupil.position.set(0.21, 0, 0.05);
  eyesGroup.add(rightPupil);

  // Eyelids for realistic blinking!
  const eyelidGeo = new THREE.BoxGeometry(0.18, 0.09, 0.06);
  const eyelidMat = skinMaterial.clone();

  const leftEyelid = new THREE.Mesh(eyelidGeo, eyelidMat);
  leftEyelid.position.set(-0.21, 0.07, 0.06);
  eyesGroup.add(leftEyelid);

  const rightEyelid = new THREE.Mesh(eyelidGeo, eyelidMat);
  rightEyelid.position.set(0.21, 0.07, 0.06);
  eyesGroup.add(rightEyelid);

  headGroup.add(eyesGroup);

  // Headphones (representing developer's love for music)
  const headphonesGroup = new THREE.Group();
  const headbandGeo = new THREE.TorusGeometry(0.56, 0.04, 8, 24, Math.PI);
  const headbandMesh = new THREE.Mesh(headbandGeo, headphoneMaterial);
  headbandMesh.rotation.z = Math.PI;
  headbandMesh.position.set(0, 0.18, 0);
  headphonesGroup.add(headbandMesh);

  // Earcups
  const earcupGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16);
  const leftEarcup = new THREE.Mesh(earcupGeo, headphoneMaterial);
  leftEarcup.rotation.z = Math.PI / 2;
  leftEarcup.position.set(-0.56, 0.15, 0);
  headphonesGroup.add(leftEarcup);

  const rightEarcup = new THREE.Mesh(earcupGeo, headphoneMaterial);
  rightEarcup.rotation.z = Math.PI / 2;
  rightEarcup.position.set(0.56, 0.15, 0);
  headphonesGroup.add(rightEarcup);

  // Headphone ring accent
  const ringAccentGeo = new THREE.TorusGeometry(0.14, 0.02, 8, 16);
  const ringLeft = new THREE.Mesh(ringAccentGeo, accentMaterial);
  ringLeft.rotation.y = Math.PI / 2;
  ringLeft.position.set(-0.62, 0.15, 0);
  headphonesGroup.add(ringLeft);

  const ringRight = new THREE.Mesh(ringAccentGeo, accentMaterial);
  ringRight.rotation.y = Math.PI / 2;
  ringRight.position.set(0.62, 0.15, 0);
  headphonesGroup.add(ringRight);

  headGroup.add(headphonesGroup);

  // Pose-specific enhancements
  let laptopGroup: THREE.Group | undefined;

  if (pose === "contact") {
    // Add developer workstation laptop with screen illumination
    laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -0.65, 0.9);

    // Laptop base
    const baseGeo = new THREE.BoxGeometry(1.4, 0.04, 0.9);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.8, roughness: 0.2 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    laptopGroup.add(baseMesh);

    // Laptop screen
    const screenGeo = new THREE.BoxGeometry(1.4, 0.9, 0.04);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35,
      roughness: 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.45, -0.4);
    screenMesh.rotation.x = 0.25;
    laptopGroup.add(screenMesh);

    // Screen light casting up onto Ikechukwu's face
    const screenLight = new THREE.PointLight(0x38bdf8, 2, 4);
    screenLight.position.set(0, 0.5, -0.2);
    laptopGroup.add(screenLight);

    group.add(laptopGroup);
  }

  // Animation state
  let blinkTimer = 0;
  let isBlinking = false;
  let blinkProgress = 0;
  let timeAlive = 0;

  const update = (delta: number, normX: number, normY: number, reducedMotion = false) => {
    timeAlive += delta;

    // Natural breathing motion
    const breathOffset = Math.sin(timeAlive * 1.8) * 0.02;
    bodyGroup.position.y = breathOffset;
    bodyGroup.scale.x = 1 + breathOffset * 0.3;
    bodyGroup.scale.z = 1 + breathOffset * 0.3;

    if (!reducedMotion) {
      // Smooth head tracking: target yaw & pitch
      const targetYaw = normX * 0.45; // Turn head left/right
      const targetPitch = -normY * 0.25; // Tilt head up/down
      const targetRoll = normX * -0.06; // Slight natural head tilt

      headGroup.rotation.y += (targetYaw - headGroup.rotation.y) * 0.1;
      headGroup.rotation.x += (targetPitch - headGroup.rotation.x) * 0.1;
      headGroup.rotation.z += (targetRoll - headGroup.rotation.z) * 0.08;

      // Compound body tilt
      group.rotation.y += (normX * 0.15 - group.rotation.y) * 0.06;
      group.rotation.x += (-normY * 0.08 - group.rotation.x) * 0.06;

      // Realistic Eye pupil micro-tracking
      const pupilRangeX = 0.024;
      const pupilRangeY = 0.018;
      const targetPupilX = normX * pupilRangeX;
      const targetPupilY = normY * pupilRangeY;

      leftPupil.position.x = -0.21 + targetPupilX;
      leftPupil.position.y = targetPupilY;
      rightPupil.position.x = 0.21 + targetPupilX;
      rightPupil.position.y = targetPupilY;

      // Periodic natural blink
      blinkTimer += delta;
      if (!isBlinking && blinkTimer > 3.2 + Math.sin(timeAlive) * 1.2) {
        isBlinking = true;
        blinkProgress = 0;
        blinkTimer = 0;
      }

      if (isBlinking) {
        blinkProgress += delta * 12; // Fast blink
        const blinkAmount = Math.sin(Math.min(Math.PI, blinkProgress));
        leftEyelid.scale.y = 1 + blinkAmount * 1.8;
        rightEyelid.scale.y = 1 + blinkAmount * 1.8;
        leftEyelid.position.y = 0.07 - blinkAmount * 0.055;
        rightEyelid.position.y = 0.07 - blinkAmount * 0.055;

        if (blinkProgress >= Math.PI) {
          isBlinking = false;
          leftEyelid.scale.y = 1;
          rightEyelid.scale.y = 1;
          leftEyelid.position.y = 0.07;
          rightEyelid.position.y = 0.07;
        }
      }
    } else {
      // Reduced motion: subtle micro-sway only
      headGroup.rotation.y = Math.sin(timeAlive * 0.4) * 0.08;
      headGroup.rotation.x = Math.cos(timeAlive * 0.3) * 0.04;
    }

    if (pose === "about") {
      // Floating zen levitation
      group.position.y = Math.sin(timeAlive * 1.2) * 0.08;
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
    headGroup,
    eyesGroup,
    leftPupil,
    rightPupil,
    leftEyelid,
    rightEyelid,
    laptopGroup,
    update,
    dispose,
  };
}
