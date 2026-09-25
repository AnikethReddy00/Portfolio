'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { smoothDamp } from '@/utils/math';

export default function CameraRig({ pointerRef }) {
  const cameraRef = useRef();
  const currentCamPos = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!cameraRef.current || !pointerRef.current) return;

    const pointer = pointerRef.current;
    const isOutside = pointer.isOutside;
    const reducedMotion = pointer.reducedMotion;

    // Extremely subtle camera micro-parallax (keeping camera rock-solid as requested)
    const targetCamX = (!isOutside && !reducedMotion) ? pointer.x * 0.05 : 0;
    const targetCamY = (!isOutside && !reducedMotion) ? pointer.y * 0.03 : 0;

    currentCamPos.current.x = smoothDamp(currentCamPos.current.x, targetCamX, 4.0, delta);
    currentCamPos.current.y = smoothDamp(currentCamPos.current.y, targetCamY, 4.0, delta);

    cameraRef.current.position.x = currentCamPos.current.x;
    cameraRef.current.position.y = currentCamPos.current.y;
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5.6]}
      fov={45}
      near={0.1}
      far={50}
    />
  );
}
