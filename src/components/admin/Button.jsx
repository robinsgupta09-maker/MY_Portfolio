import { motion } from 'framer-motion';
import { useState } from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  icon: Icon,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = { x, y, id: Date.now() };
    setRipples([...ripples, ripple]);
    
    setTimeout(() => {
      setRipples(ripples.filter(r => r.id !== ripple.id));
    }, 600);
  };

  const handleClick = (e) => {
    createRipple(e);
    if (onClick) onClick(e);
  };

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-500/50',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      className={`relative overflow-hidden rounded-xl font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Ripple Effect */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bg-white/40 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && <Icon size={18} className="transition-transform group-hover:rotate-12" />}
        {children}
      </span>
      
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/10 to-pink-400/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

export default Button;
