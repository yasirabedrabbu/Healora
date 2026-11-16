"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 3, 3]} intensity={1.3} />
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <MeshDistortMaterial
            color="#0B7A75"
            roughness={0.25}
            distort={0.28}
            speed={1.4}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}