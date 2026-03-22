import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const PortfolioProjectCard = ({ project, index, onClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Card variations for different glow colors
  const cardVariations = [
    { primary: 'purple', secondary: 'pink', gradient: 'from-purple-500 to-pink-500' },
    { primary: 'blue', secondary: 'cyan', gradient: 'from-blue-500 to-cyan-500' },
    { primary: 'pink', secondary: 'rose', gradient: 'from-pink-500 to-rose-500' },
  ];
  
  const variation = cardVariations[index % 3];
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        rotateX: 5,
        rotateY: -5
      }}
      onMouseMove={handleMouseMove}
      onClick={() => onClick(project)}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl bg-[#111] cursor-pointer border border-white/5 hover:border-purple-500/50"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Mouse-follow Spotlight Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`
        }}
      />

      {/* Glow Border Animation */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${variation.primary}-500/50 transition-all duration-500 z-30`} />
      
      {/* Card Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Hover Overlay with Reveal Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-40 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg"
            >
              View Details
            </motion.span>
          </motion.div>
        </div>

        {/* Image with Moving Gradient Shine */}
        <div className="aspect-video rounded-xl mb-4 overflow-hidden relative group/image border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 z-20" />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        </div>
        
        {/* Content */}
        <motion.h3 
          className={`text-xl font-bold mb-2 bg-gradient-to-r ${variation.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tech Stack with Pulse Effect */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.slice(0, 4).map((tech, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`px-3 py-1 text-xs rounded-full bg-${variation.primary}-500/20 text-${variation.primary}-300 border border-${variation.primary}-500/30 cursor-default hover:border-${variation.primary}-500/50 transition-all`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-sm border border-purple-500/20 hover:border-purple-500/40"
          >
            <Github size={16} className="transition-transform group-hover:rotate-12" />
            Code
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 text-sm border border-blue-500/20 hover:border-blue-500/40"
          >
            <ExternalLink size={16} className="transition-transform group-hover:-rotate-12" />
            Live
          </motion.a>
        </div>
      </div>
      
      {/* Background Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100,
              y: Math.random() * 100
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              x: Math.random() * 200,
              y: Math.random() * 200
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className={`absolute w-1 h-1 bg-${variation.primary}-400 rounded-full blur-[1px]`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioProjectCard;
