import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

const Hero = ({ isDark = true }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Web Developer',
    'AI & Data Science Student',
    'Problem Solver',
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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
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
      {/* Three.js Background - Only in dark mode */}
      {isDark && (
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      )}
      
      {/* Overlay for text readability */}
      <div className={`absolute inset-0 z-[1] transition-colors duration-500 ${isDark ? 'bg-gradient-to-r from-dark-900/80 via-dark-900/50 to-transparent' : 'bg-white/30'}`} />
      
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 w-full relative z-10">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Role Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className={`inline-block px-6 py-2 rounded-full text-sm font-medium tracking-wide ${isDark ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-primary-100 text-primary-700 border border-primary-200'}`}>
              Front-End Developer | AI Enthusiast
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-6 leading-[0.9]"
          >
            <span className="text-gradient">Robins</span>
            <br />
            <span className={`transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Gupta</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className={`text-xl sm:text-2xl lg:text-3xl font-medium mb-8 max-w-3xl transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Building modern, scalable, and user-focused digital experiences.
          </motion.p>

          {/* Typing Animation */}
          <motion.div
            variants={itemVariants}
            className="h-12 sm:h-14 mb-12"
          >
            <span className={`text-xl sm:text-2xl font-light transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {displayText}
              <span className={`inline-block w-[3px] h-7 sm:h-8 ml-1 animate-pulse transition-colors duration-500 ${isDark ? 'bg-primary-500' : 'bg-primary-600'}`} />
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mb-16"
          >
            <motion.button
              onClick={scrollToProjects}
              className={`group px-8 py-4 font-semibold rounded-full btn-lift flex items-center gap-3 transition-all duration-500 ${isDark ? 'bg-white text-dark-900' : 'bg-dark-900 text-white'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className={`px-8 py-4 border font-semibold rounded-full transition-all duration-500 ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-gray-900/20 text-gray-900 hover:bg-gray-900/5'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6"
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
                className={`p-3 rounded-full transition-all duration-500 ${isDark ? 'glass-light text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'}`}
                whileHover={{ scale: 1.1, y: -3 }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white/40 rounded-full"
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
