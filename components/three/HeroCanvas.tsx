"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Torus } from "@react-three/drei";
import * as THREE from "three";

function RotatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.z += 0.003;
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= 0.003;
      wireRef.current.rotation.y -= 0.006;
    }
  });

  return (
    <group>
      {/* Outer torus */}
      <Torus ref={meshRef} args={[1.2, 0.02, 16, 100]}>
        <meshStandardMaterial
          color="#915EFF"
          emissive="#915EFF"
          emissiveIntensity={0.8}
          wireframe
        />
      </Torus>
      {/* Inner torus knot */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[0.7, 0.15, 128, 16]} />
        <meshStandardMaterial
          color="#00D8FF"
          emissive="#00D8FF"
          emissiveIntensity={0.5}
          wireframe
          opacity={0.8}
          transparent
        />
      </mesh>
      {/* Icosahedron */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color="#FF6B9D"
          emissive="#FF6B9D"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
      {/* Point lights */}
      <pointLight color="#915EFF" intensity={3} distance={5} position={[2, 2, 2]} />
      <pointLight color="#00D8FF" intensity={2} distance={4} position={[-2, -2, 1]} />
      <pointLight color="#FF6B9D" intensity={1.5} distance={3} position={[0, 0, 3]} />
      <ambientLight intensity={0.2} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <RotatingShape />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
