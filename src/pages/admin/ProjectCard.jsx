import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index, onEdit, onDelete }) => {
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
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        rotateX: 3,
        rotateY: -3
      }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl bg-[#111] cursor-pointer"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Animated Gradient Border */}
      <div 
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`
        }}
      />
      
      {/* Glow Border Animation */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${variation.primary}-500/50 transition-all duration-500`} />
      
      {/* Card Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Hover Overlay with Reveal Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-center justify-center gap-3 pointer-events-none">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            className={`p-3 rounded-full bg-gradient-to-r ${variation.gradient} text-white shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 cursor-pointer pointer-events-auto z-30 hover:shadow-xl`}
            title="Edit"
          >
            <Edit2 size={20} className="group-hover:rotate-12 transition-transform" />
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.15, rotate: -12 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            className="p-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 cursor-pointer pointer-events-auto z-30 hover:shadow-xl"
            title="Delete"
          >
            <Trash2 size={20} />
          </motion.button>
          
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.15, rotate: 12 }}
            onClick={(e) => e.stopPropagation()}
            className={`p-3 rounded-full bg-gradient-to-r ${variation.gradient} text-white shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 cursor-pointer pointer-events-auto z-30 hover:shadow-xl`}
            title="View Live"
          >
            <Eye size={20} />
          </motion.a>
        </div>

        {/* Image with Moving Gradient Shine */}
        <div className="aspect-video rounded-xl mb-4 overflow-hidden relative group/image">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 z-20" />
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
        <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${variation.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tech Stack with Pulse Effect */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`px-3 py-1 text-xs rounded-full bg-${variation.primary}-500/20 text-${variation.primary}-300 border border-${variation.primary}-500/30 cursor-default`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links with Gradient Backgrounds */}
        <div className="flex items-center gap-2 mb-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-sm group/link border border-purple-500/20 hover:border-purple-500/40"
          >
            <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 text-sm group/link border border-blue-500/20 hover:border-blue-500/40"
          >
            <ExternalLink size={16} className="group-hover/link:-rotate-12 transition-transform" />
            Live
          </a>
        </div>

        {/* Action Buttons with Micro Animations */}
        <div className="flex gap-2 mt-auto">
          <motion.button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${variation.gradient} text-white transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-${variation.primary}-500/40`}
          >
            <Edit2 size={16} className="transition-transform group-hover:rotate-12" />
            Edit
          </motion.button>
          <motion.button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/40"
          >
            <Trash2 size={16} className="transition-transform hover:rotate-12" />
          </motion.button>
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

export default ProjectCard;
