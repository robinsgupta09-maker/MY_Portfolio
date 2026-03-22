import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const FloatingShape = ({ delay, duration, x, y, scale, color, rotation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [scale * 0.8, scale, scale * 0.8],
        x: [x - 50, x + 50, x - 50],
        y: [y - 30, y + 30, y - 30],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`absolute rounded-full ${color} blur-xl`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${scale * 100}px`,
        height: `${scale * 100}px`,
        mixBlendMode: 'screen'
      }}
    />
  );
};

const Hero3D = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3), transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {/* Floating 3D Shapes */}
      <FloatingShape delay={0} duration={8} x={10} y={20} scale={3} color="bg-purple-500/30" rotation={0} />
      <FloatingShape delay={1} duration={10} x={80} y={15} scale={4} color="bg-blue-500/30" rotation={45} />
      <FloatingShape delay={2} duration={12} x={70} y={70} scale={2} color="bg-pink-500/30" rotation={90} />
      <FloatingShape delay={3} duration={9} x={20} y={80} scale={3.5} color="bg-cyan-500/30" rotation={135} />
      <FloatingShape delay={4} duration={11} x={50} y={40} scale={2.5} color="bg-indigo-500/30" rotation={180} />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          perspective: '1000px',
          transformStyle: 'preserve-3d'
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
        <div className="text-center px-4 max-w-5xl mx-auto">
          {/* Glowing Orb Behind Text */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-3xl opacity-20"
          />

          {/* Main Content will be added in TypingAnimation component */}
          <div className="relative z-10">
            {/* This space intentionally left blank for typing animation */}
          </div>
        </div>
      </motion.div>

      {/* Particle System */}
      <ParticleField />
    </div>
  );
};

const ParticleField = () => {
  const particles = Array.from({ length: 50 });

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
            opacity: [0, Math.random() * 0.5 + 0.2, 0],
            y: [null, Math.random() * -200],
            scale: [0, Math.random() * 1.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-purple-500/50"
        />
      ))}
    </div>
  );
};

export default Hero3D;
