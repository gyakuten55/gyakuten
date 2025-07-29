'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SimpleSphere({ color = '#8f2c34' }: { color?: string }) {
  const meshRef = useRef<THREE.LineSegments>(null);
  
  // シンプルなIcosahedronのワイヤーフレーム
  const geometry = new THREE.IcosahedronGeometry(1, 2);
  const edges = new THREE.EdgesGeometry(geometry);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={edges}>
      <lineBasicMaterial 
        color={color} 
        transparent 
        opacity={0.8}
        linewidth={2}
      />
    </lineSegments>
  );
}

export default function ServiceSphere({ color }: { color?: string }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <SimpleSphere color={color} />
    </Canvas>
  );
}