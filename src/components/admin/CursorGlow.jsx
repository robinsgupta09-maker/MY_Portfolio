import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setCursorPosition(newPosition);
      
      // Add trail
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setTrails(prev => [...prev.slice(-15), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trails.length > 0) {
      const timer = setTimeout(() => {
        setTrails(prev => prev.slice(1));
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [trails]);

  return (
    <>
      {/* Main Cursor Glow */}
      <motion.div
        animate={{ x: cursorPosition.x - 20, y: cursorPosition.y - 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="fixed w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-60 pointer-events-none z-[9999]"
      />
      
      {/* Cursor Trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{ 
            left: trail.x, 
            top: trail.y,
          }}
          className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-lg pointer-events-none"
        />
      ))}
    </>
  );
};

export default CursorGlow;
