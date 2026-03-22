import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, glow = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        rotateX: 2,
        rotateY: -2
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15,
        duration: 0.3 
      }}
      className={`relative group rounded-2xl ${className}`}
      {...props}
    >
      {/* Gradient Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-blue-600/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Light Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      {/* Main Card */}
      <div className={`relative glass rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:border-purple-500/30 transition-all duration-500 overflow-hidden`}>
        {/* Inner Glow */}
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
