import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Hero3D from './hero/Hero3D';

const Hero = ({ isDark = true }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Frontend Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Explorer',
  ];

  useEffect(() => {
    const role = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? role.substring(0, displayText.length - 1)
            : role.substring(0, displayText.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden transition-colors duration-500 ${isDark ? '' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      {/* Dark Mode 3D Background */}
      {isDark && (
        <div className="absolute inset-0 w-full h-full">
          <Hero3D />
        </div>
      )}
      
      {/* Overlay for text readability - only in light mode */}
      {!isDark && (
        <div className="absolute inset-0 z-[1] transition-colors duration-500 bg-white/30" />
      )}
      
      {/* Main Content - Centered Design */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 w-full relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name - Modern Gradient Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Robins
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Gupta
            </span>
          </motion.h1>

          {/* Role Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className={`inline-block px-6 py-2 rounded-full text-sm font-semibold tracking-wide ${isDark ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30' : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200'}`}>
              Frontend Developer | AI Enthusiast
            </span>
          </motion.div>

          {/* Powerful Intro Line */}
          <motion.p
            variants={itemVariants}
            className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-6 max-w-4xl mx-auto transition-colors duration-500 ${isDark ? 'text-[#e2e8f0]' : 'text-gray-900'}`}
          >
            "I design and build modern web experiences that solve real-world problems."
          </motion.p>

          {/* Value Proposition */}
          <motion.p
            variants={itemVariants}
            className={`text-lg sm:text-xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${isDark ? 'text-[#94a3b8]' : 'text-gray-700'}`}
          >
            I build fast, scalable, and user-focused applications.
          </motion.p>

          {/* Personal Touch */}
          <motion.p
            variants={itemVariants}
            className={`text-base sm:text-lg italic mb-12 max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-[#94a3b8]/80' : 'text-gray-600'}`}
          >
            Passionate about creating clean UI and solving real problems with code. 💻
          </motion.p>

          {/* Typing Animation */}
          <motion.div
            variants={itemVariants}
            className="h-12 sm:h-14 mb-12"
          >
            <span className={`text-xl sm:text-2xl font-light transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {displayText}
              <span className={`inline-block w-[3px] h-7 sm:h-8 ml-1 animate-pulse transition-colors duration-500 ${isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-blue-600'}`} />
            </span>
          </motion.div>

          {/* CTA Buttons - Centered */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10"
          >
            <motion.button
              onClick={scrollToProjects}
              className={`group px-10 py-5 font-semibold rounded-full btn-lift flex items-center gap-3 transition-all duration-500 shadow-lg hover:shadow-2xl ${isDark ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-500/50 hover:scale-105' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-500/30 hover:scale-105'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className={`px-10 py-5 border-2 font-semibold rounded-full transition-all duration-500 backdrop-blur-sm hover:border-[#94a3b8]/70 hover:shadow-lg ${isDark ? 'border-[#94a3b8]/50 text-[#e2e8f0] hover:bg-[#94a3b8]/10' : 'border-gray-900/30 text-gray-900 hover:bg-gray-900/5'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Connect
            </motion.button>
          </motion.div>

          {/* Trust Element */}
          <motion.div
            variants={itemVariants}
            className={`mb-12 text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
          >
            ✨ 5+ Projects Built | Open to Opportunities
          </motion.div>

          {/* Social Links - Centered */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:robinsgupta09@gmail.com', label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-500 backdrop-blur-sm ${isDark ? 'glass-light text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110' : 'bg-gray-200/50 text-gray-600 hover:text-gray-900 hover:bg-gray-300/70 hover:scale-110'}`}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${isDark ? 'border-white/30' : 'border-gray-900/30'}`}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className={`w-1 h-2 rounded-full ${isDark ? 'bg-white/50' : 'bg-gray-900/50'}`}
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
