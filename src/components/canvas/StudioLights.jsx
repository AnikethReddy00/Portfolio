'use client';

import React from 'react';

export default function StudioLights() {
  return (
    <>
      {/* Studio Ambient Illumination */}
      <ambientLight intensity={1.35} color="#ffffff" />

      {/* Key Light (Soft, from top-left front) */}
      <directionalLight
        position={[3, 5, 5]}
        intensity={0.8}
        color="#ffffff"
      />

      {/* Fill Light (Softer, from right front) */}
      <directionalLight
        position={[-3, 3, 4]}
        intensity={0.4}
        color="#f8faff"
      />

      {/* Subtle Rim / Top Light for hair and shoulder separation */}
      <directionalLight
        position={[0, 6, -3]}
        intensity={0.3}
        color="#ffffff"
      />
    </>
  );
}
