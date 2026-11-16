"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { HealoraOrbProps } from "./types";

/**
 * Hero 3D visual (only 3D on the site, per motion budget). Loaded lazily
 * by Hero with a static fallback; honors reduced-motion at the Hero level.
 */
export default function HealoraOrb({ color = "#0b7a75" }: HealoraOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 3, 3]} intensity={1.3} />
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <MeshDistortMaterial color={color} roughness={0.25} distort={0.28} speed={1.4} />
        </mesh>
      </Float>
    </Canvas>
  );
}
