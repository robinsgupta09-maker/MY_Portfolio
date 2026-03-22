import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Hero3D = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle Animated Background Gradient */}
      <motion.div
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15), transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {/* Minimal Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Mouse Parallax Content */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Minimal content - typing animation handles text */}
        </div>
      </motion.div>

      {/* Subtle Particle System */}
      <ParticleField />
    </div>
  );
};

const ParticleField = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{ 
            opacity: [0, Math.random() * 0.3 + 0.1, 0],
            y: [null, Math.random() * -100],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-0.5 h-0.5 bg-white/50 rounded-full"
        />
      ))}
    </div>
  );
};

export default Hero3D;
