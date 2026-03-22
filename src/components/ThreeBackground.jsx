import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Neon Colors
const NEON_GREEN = '#00ff88';
const NEON_PURPLE = '#b829dd';
const NEON_CYAN = '#00d4ff';
const NEON_PINK = '#ff00ff';

// Floating Cube with Glow
const NeonCube = ({ position, color, scale, speed, rotationSpeed }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.01;
      meshRef.current.rotation.y += rotationSpeed * 0.015;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// Floating Rectangle
const NeonRectangle = ({ position, color, scale, speed, rotationSpeed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.008;
      meshRef.current.rotation.z += rotationSpeed * 0.012;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + 1) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1.5, 0.3, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

// Floating Triangle (Tetrahedron)
const NeonTriangle = ({ position, color, scale, speed, rotationSpeed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.02;
      meshRef.current.rotation.x += rotationSpeed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + 2) * 0.35;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <tetrahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

// Floating Ring
const NeonRing = ({ position, color, scale, speed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[0.7, 0.15, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// Particle System for depth
const Particles = () => {
  const pointsRef = useRef();
  const particleCount = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={NEON_CYAN}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Camera controller for mouse parallax
const CameraController = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mousePosition.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main Scene
const Scene = () => {
  const shapes = useMemo(() => [
    // Neon Green Cubes
    { type: 'cube', position: [-5, 2, -6], color: NEON_GREEN, scale: 1, speed: 0.8, rotationSpeed: 0.5 },
    { type: 'cube', position: [6, -2, -8], color: NEON_GREEN, scale: 0.7, speed: 1.2, rotationSpeed: 0.7 },
    { type: 'cube', position: [-3, -4, -5], color: NEON_GREEN, scale: 0.5, speed: 1, rotationSpeed: 0.6 },
    
    // Neon Purple Cubes
    { type: 'cube', position: [4, 3, -7], color: NEON_PURPLE, scale: 0.9, speed: 0.9, rotationSpeed: 0.4 },
    { type: 'cube', position: [-6, -1, -4], color: NEON_PURPLE, scale: 0.6, speed: 1.1, rotationSpeed: 0.8 },
    
    // Neon Cyan Cubes
    { type: 'cube', position: [2, 4, -6], color: NEON_CYAN, scale: 0.8, speed: 0.7, rotationSpeed: 0.5 },
    { type: 'cube', position: [-4, -3, -7], color: NEON_CYAN, scale: 0.5, speed: 1.3, rotationSpeed: 0.9 },
    
    // Neon Pink Cubes
    { type: 'cube', position: [5, 1, -5], color: NEON_PINK, scale: 0.6, speed: 1, rotationSpeed: 0.6 },
    
    // Rectangles
    { type: 'rectangle', position: [-2, 3, -8], color: NEON_CYAN, scale: 1.2, speed: 0.9, rotationSpeed: 0.5 },
    { type: 'rectangle', position: [3, -3, -6], color: NEON_PURPLE, scale: 0.9, speed: 1.1, rotationSpeed: 0.7 },
    { type: 'rectangle', position: [-5, 0, -7], color: NEON_GREEN, scale: 1, speed: 0.8, rotationSpeed: 0.4 },
    { type: 'rectangle', position: [6, 2, -5], color: NEON_PINK, scale: 0.8, speed: 1.2, rotationSpeed: 0.6 },
    
    // Triangles
    { type: 'triangle', position: [0, 5, -8], color: NEON_PURPLE, scale: 1.1, speed: 1, rotationSpeed: 0.8 },
    { type: 'triangle', position: [-3, -2, -6], color: NEON_CYAN, scale: 0.9, speed: 0.9, rotationSpeed: 0.5 },
    { type: 'triangle', position: [4, -4, -7], color: NEON_GREEN, scale: 0.8, speed: 1.1, rotationSpeed: 0.7 },
    { type: 'triangle', position: [-6, 3, -5], color: NEON_PINK, scale: 0.7, speed: 0.8, rotationSpeed: 0.6 },
    
    // Rings
    { type: 'ring', position: [2, 0, -9], color: NEON_CYAN, scale: 1.3, speed: 0.6 },
    { type: 'ring', position: [-4, 4, -6], color: NEON_PURPLE, scale: 1, speed: 0.8 },
    { type: 'ring', position: [5, -1, -8], color: NEON_GREEN, scale: 0.9, speed: 1 },
  ], []);

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} color={NEON_CYAN} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={NEON_PURPLE} />
      <pointLight position={[10, -10, 5]} intensity={0.8} color={NEON_GREEN} />
      <pointLight position={[-10, 10, 5]} intensity={0.8} color={NEON_PINK} />
      
      <Particles />
      
      {shapes.map((shape, index) => {
        const props = {
          key: index,
          position: shape.position,
          color: shape.color,
          scale: shape.scale,
          speed: shape.speed,
          rotationSpeed: shape.rotationSpeed,
        };
        
        if (shape.type === 'cube') return <NeonCube {...props} />;
        if (shape.type === 'rectangle') return <NeonRectangle {...props} />;
        if (shape.type === 'triangle') return <NeonTriangle {...props} />;
        if (shape.type === 'ring') return <NeonRing {...props} position={shape.position} color={shape.color} scale={shape.scale} speed={shape.speed} />;
        return null;
      })}
    </>
  );
};

// Main Component
const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-950/50 to-black/70 pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default ThreeBackground;
