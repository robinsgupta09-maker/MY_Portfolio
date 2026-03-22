import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Brain, TicketCheck, Building2, Layout, Bot, ArrowRight } from 'lucide-react';

const Projects = ({ isDark = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filters = ['All', 'Web', 'AI', 'Systems'];

  const projects = [
    {
      id: 1,
      title: 'AI Route Optimization System',
      description: 'An intelligent route planning system that uses real-time traffic and weather data to optimize delivery routes.',
      image: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20',
      icon: Brain,
      category: 'AI',
      tech: ['Python', 'APIs', 'Machine Learning'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-blue-500 to-cyan-500',
      featured: true,
    },
    {
      id: 2,
      title: 'QuickDesk Help Desk System',
      description: 'A full-stack ticket management system for customer support with real-time updates and tracking.',
      image: 'bg-gradient-to-br from-primary-600/20 to-accent-600/20',
      icon: TicketCheck,
      category: 'Web',
      tech: ['React', 'Node.js', 'Express'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-primary-500 to-accent-500',
      featured: true,
    },
    {
      id: 3,
      title: 'CivicTrack Platform',
      description: 'A civic engagement platform where users can report and track local issues with real-time updates.',
      image: 'bg-gradient-to-br from-emerald-600/20 to-teal-600/20',
      icon: Building2,
      category: 'Systems',
      tech: ['MERN Stack', 'MongoDB', 'Express'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-emerald-500 to-teal-500',
      featured: false,
    },
    {
      id: 4,
      title: 'Smart Portfolio Website',
      description: 'A modern, animated personal portfolio built with advanced UI/UX, smooth animations, and responsive design.',
      image: 'bg-gradient-to-br from-orange-600/20 to-amber-600/20',
      icon: Layout,
      category: 'Web',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-orange-500 to-amber-500',
      featured: false,
    },
    {
      id: 5,
      title: 'AI Chatbot Assistant',
      description: 'An AI-powered chatbot that can answer queries, assist users, and simulate real conversations.',
      image: 'bg-gradient-to-br from-purple-600/20 to-pink-600/20',
      icon: Bot,
      category: 'AI',
      tech: ['JavaScript', 'APIs', 'NLP'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-purple-500 to-pink-500',
      featured: false,
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // 3D Tilt effect handler
  const handleMouseMove = (e, projectId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    setHoveredProject(projectId);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setHoveredProject(null);
  };

  return (
    <section id="projects" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 lg:mb-20">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              Featured Work
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Selected <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? (isDark ? 'bg-white text-dark-900' : 'bg-dark-900 text-white')
                    : (isDark ? 'glass text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`h-full rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 ${isDark ? 'glass' : 'bg-white shadow-xl'}`}>
                    {/* Project Image */}
                    <div className={`relative h-80 ${project.image} flex items-center justify-center overflow-hidden`}>
                      <motion.div
                        className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-2xl`}
                        animate={{
                          scale: hoveredProject === project.id ? 1.15 : 1,
                          rotate: hoveredProject === project.id ? 5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <project.icon size={56} className="text-white" />
                      </motion.div>

                      {/* Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-dark-900' : 'from-gray-900'} via-transparent to-transparent`}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: hoveredProject === project.id ? 0.9 : 0.5 }}
                      />

                      {/* Featured Badge */}
                      {project.featured && (
                        <span className="absolute top-5 left-5 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-sm font-medium text-white">
                          Featured
                        </span>
                      )}

                      {/* Category Badge */}
                      <span className={`absolute top-5 ${project.featured ? 'right-5' : 'left-5'} px-4 py-2 rounded-full text-sm font-medium ${isDark ? 'glass text-white' : 'bg-white/90 text-gray-900'}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-10">
                      <h3 className={`text-2xl lg:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                      </h3>
                      <p className={`mb-8 leading-relaxed text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isDark ? 'glass text-white hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={18} />
                          GitHub
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isDark ? 'bg-white text-dark-900 hover:bg-gray-100' : 'bg-dark-900 text-white hover:bg-gray-800'}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Projects Button */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 group ${isDark ? 'border border-white/20 text-white hover:bg-white/5' : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Projects on GitHub
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
