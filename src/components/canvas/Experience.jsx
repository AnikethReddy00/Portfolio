'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Character from './Character';
import StudioLights from './StudioLights';
import CameraRig from './CameraRig';
import HeroText from '../dom/HeroText';
import PortfolioSections from '../dom/PortfolioSections';
import { usePointerTracker } from '@/hooks/usePointerTracker';

export default function Experience() {
  const pointerRef = usePointerTracker();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#fcfcfc]" />
    );
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-[#fcfcfc] overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        className="w-full h-full"
        style={{ touchAction: 'pan-y' }}
        eventPrefix="client"
      >
        <color attach="background" args={['#fcfcfc']} />
        <CameraRig pointerRef={pointerRef} />
        <StudioLights />
        <Suspense fallback={null}>
          <Character pointerRef={pointerRef} />
        </Suspense>
      </Canvas>

      {/* Left & Right Interactive Portfolio Sections */}
      <PortfolioSections pointerRef={pointerRef} />

      {/* Hero Headline & Instructions */}
      <HeroText pointerRef={pointerRef} />
    </div>
  );
}
