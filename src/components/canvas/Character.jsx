'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { shapeCursorInput, smoothDamp, degToRad } from '@/utils/math';

// 3D Plane Dimensions
const PLANE_SIZE = 3.6;

// Kinematic Vertical Tilt & Roll Limits (radians)
const MAX_PITCH = degToRad(9.0);   // Vertical look up/down (±9°)
const MAX_ROLL = degToRad(3.0);    // Subtle anatomical head roll (±3°)
const MICRO_YAW = degToRad(4.0);   // Subtle 3D yaw interpolation

const DAMPING_LAMBDA = 9.5;        // Smooth, responsive, critically-damped spring response

// Custom GLSL Cross-Fade Shader for continuous 7-angle morphing
const HeadBlendShader = {
  uniforms: {
    uTexA: { value: null },
    uTexB: { value: null },
    uMix: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexA;
    uniform sampler2D uTexB;
    uniform float uMix;
    varying vec2 vUv;

    void main() {
      vec4 colA = texture2D(uTexA, vUv);
      vec4 colB = texture2D(uTexB, vUv);

      float t = smoothstep(0.0, 1.0, uMix);
      vec4 color = mix(colA, colB, t);

      if (color.a < 0.005) discard;
      gl_FragColor = color;
    }
  `,
};

export default function Character({ pointerRef }) {
  const { viewport } = useThree();

  // Load all 7 high-definition head angle textures
  const textures = useTexture([
    '/character/hd_head_0.png',
    '/character/hd_head_1.png',
    '/character/hd_head_2.png',
    '/character/hd_head_3.png',
    '/character/hd_head_4.png',
    '/character/hd_head_5.png',
    '/character/hd_head_6.png',
  ]);

  // Configure high-resolution texture parameters & filtering
  useMemo(() => {
    textures.forEach((tex) => {
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.anisotropy = 16;
        tex.needsUpdate = true;
      }
    });
  }, [textures]);

  // Create custom shader material
  const headMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexA: { value: textures[3] },
        uTexB: { value: textures[3] },
        uMix: { value: 0.0 },
      },
      vertexShader: HeadBlendShader.vertexShader,
      fragmentShader: HeadBlendShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [textures]);

  // References
  const headGroupRef = useRef();
  const entryY = useRef(-3.5); // Starts below viewport for entrance pull-up

  // Mutable continuous animation values (no GC allocations in frame loop)
  const currentAngleIndex = useRef(3.0); // 3.0 = center forward (frame 3)
  const currentPitch = useRef(0.0);
  const currentRoll = useRef(0.0);
  const currentMicroYaw = useRef(0.0);
  const currentSlideX = useRef(0.0); // Lateral slide offset when sections appear
  const currentTransY = useRef(0.0);

  // GSAP Entrance pull-up animation from the bottom on start
  useEffect(() => {
    gsap.to(entryY, {
      current: 0.15, // Resting position slightly elevated
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.1,
    });
  }, []);

  // Responsive scaling
  const responsiveScale = useMemo(() => {
    const minDim = Math.min(viewport.width, viewport.height);
    const aspect = viewport.width / viewport.height;

    if (aspect < 0.8) {
      // Mobile Portrait
      return (minDim / PLANE_SIZE) * 0.90;
    } else {
      // Desktop / Tablet
      return (viewport.height / PLANE_SIZE) * 0.78;
    }
  }, [viewport.width, viewport.height]);

  // 60Hz / 120Hz / 144Hz Frame Loop
  useFrame((state, delta) => {
    if (!headGroupRef.current || !pointerRef.current) return;

    const pointer = pointerRef.current;
    const isOutside = pointer.isOutside;
    const reducedMotion = pointer.reducedMotion;

    // Target inputs
    let targetX = 0;
    let targetY = 0;

    if (!isOutside) {
      targetX = shapeCursorInput(pointer.x, 1.25);
      targetY = shapeCursorInput(pointer.y, 1.25);
    }

    if (reducedMotion) {
      targetX *= 0.15;
      targetY *= 0.15;
    }

    // Map horizontal cursor (-1 to +1) to continuous variation angle index (0.0 to 6.0)
    // Cursor left (-1) -> looks left (index 0.0)
    // Cursor right (+1) -> looks right (index 6.0)
    const targetAngleIdx = 3.0 + targetX * 3.0;

    // Counter-lateral sliding:
    // If face is looking LEFT (targetX < 0) -> entire character slides RIGHT (+X)
    // If face is looking RIGHT (targetX > 0) -> entire character slides LEFT (-X)
    // In viewport world units (e.g. ~ ±0.75 world units)
    const targetSlideX = -targetX * 0.75;

    // Vertical pitch, roll, and micro-yaw targets
    const targetPitch = targetY * MAX_PITCH;
    const targetRoll = -targetX * MAX_ROLL;
    const targetMicroYaw = -targetX * MICRO_YAW;
    const targetTransY = targetY * 0.05;

    // Frame-rate-independent exponential dampening
    currentAngleIndex.current = smoothDamp(
      currentAngleIndex.current,
      targetAngleIdx,
      DAMPING_LAMBDA,
      delta
    );

    currentPitch.current = smoothDamp(currentPitch.current, targetPitch, DAMPING_LAMBDA, delta);
    currentRoll.current = smoothDamp(currentRoll.current, targetRoll, DAMPING_LAMBDA, delta);
    currentMicroYaw.current = smoothDamp(currentMicroYaw.current, targetMicroYaw, DAMPING_LAMBDA, delta);

    currentSlideX.current = smoothDamp(currentSlideX.current, targetSlideX, DAMPING_LAMBDA, delta);
    currentTransY.current = smoothDamp(currentTransY.current, targetTransY, DAMPING_LAMBDA, delta);

    // Calculate active textures and smooth cross-fade mix factor
    const clampedIdx = Math.max(0.0, Math.min(6.0, currentAngleIndex.current));
    const idxA = Math.min(5, Math.floor(clampedIdx));
    const idxB = Math.min(6, idxA + 1);
    const mixFactor = clampedIdx - idxA;

    // Update shader uniforms
    if (headMaterial.uniforms) {
      headMaterial.uniforms.uTexA.value = textures[idxA];
      headMaterial.uniforms.uTexB.value = textures[idxB];
      headMaterial.uniforms.uMix.value = mixFactor;
    }

    // Microscopic organic breathing/floating idle
    const time = state.clock.elapsedTime;
    const floatY = reducedMotion ? 0 : Math.sin(time * 1.5) * 0.018;

    // Apply continuous 3D pitch, roll, and micro-yaw
    headGroupRef.current.rotation.set(
      currentPitch.current,
      currentMicroYaw.current,
      currentRoll.current,
      'YXZ'
    );

    // Apply lateral slide X + entrance Y + vertical translation + floating motion
    headGroupRef.current.position.set(
      currentSlideX.current,
      entryY.current + currentTransY.current + floatY,
      0
    );
  });

  return (
    <group
      ref={headGroupRef}
      scale={[responsiveScale, responsiveScale, responsiveScale]}
    >
      <mesh material={headMaterial}>
        <planeGeometry args={[PLANE_SIZE, PLANE_SIZE, 16, 16]} />
      </mesh>
    </group>
  );
}
