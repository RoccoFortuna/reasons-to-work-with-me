"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Mesh } from 'three';

function Blob({ animated }: { animated: boolean }) {
  const ref = useRef<Mesh>(null);
  // subtle rotation on raf
  useEffect(() => {
    if (!animated) return;
    let raf = 0;
    const loop = () => {
      if (ref.current) {
        ref.current.rotation.x += 0.0015;
        ref.current.rotation.y += 0.001;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.18} roughness={0.2} metalness={0.2} />
      {/* wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.82, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.2} transparent />
      </mesh>
    </mesh>
  );
}

export function Background() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-neonGradient" />
      {/* soft vignettes */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)'
      }} />
      {/* 3D element */}
      <div className="absolute inset-0 opacity-90">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: false }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} />
          <Blob animated={!reduce} />
          {!reduce && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />}
        </Canvas>
      </div>
      {/* Noise is added via globals.css using :before */}
    </div>
  );
}
