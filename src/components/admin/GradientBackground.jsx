import { motion } from 'framer-motion';

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Mesh */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 150, 0],
          y: [0, -100, 0],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-blue-600/40 rounded-full mix-blend-screen filter blur-3xl opacity-50"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.4, 1],
          x: [0, -150, 0],
          y: [0, 100, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 3 }}
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-r from-pink-600/40 via-purple-600/40 to-cyan-600/40 rounded-full mix-blend-screen filter blur-3xl opacity-50"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1.5, 1],
          x: [0, 100, -50, 0],
          y: [0, -50, 80, 0]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-40"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1.5, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50"
        />
      ))}

      {/* Radial Glow Behind Cards */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-0" />
    </div>
  );
};

export default GradientBackground;
