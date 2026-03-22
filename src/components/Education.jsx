import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, School, Award } from 'lucide-react';

const Education = ({ isDark = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const education = [
    {
      degree: 'B.Tech in AI & Data Science',
      institution: 'Punjab Technical University',
      duration: '2023 – 2027',
      icon: GraduationCap,
      highlight: true,
      details: ['Focusing on Machine Learning & Web Development', 'Active in coding competitions & hackathons'],
    },
    {
      degree: 'Class XII (Science)',
      institution: 'Senior Secondary School',
      duration: '2023',
      icon: School,
      highlight: false,
    },
    {
      degree: 'Class X',
      institution: 'Secondary School',
      duration: '2021',
      icon: Award,
      highlight: false,
    },
  ];

  return (
    <section id="education" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-24">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              Education
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Academic <span className="text-gradient">Background</span>
            </h2>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className={`group relative rounded-2xl p-8 lg:p-10 transition-all duration-500 ${
                  edu.highlight 
                    ? (isDark ? 'glass border border-primary-500/30' : 'bg-white shadow-xl border-2 border-primary-200') 
                    : (isDark ? 'glass-light' : 'bg-gray-100')
                }`}
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                    edu.highlight 
                      ? 'bg-gradient-to-br from-primary-500 to-accent-500' 
                      : (isDark ? 'bg-white/10' : 'bg-gray-200')
                  }`}>
                    <edu.icon size={28} className={edu.highlight ? 'text-white' : (isDark ? 'text-gray-400' : 'text-gray-600')} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {edu.degree}
                      </h3>
                      <span className={`text-sm font-medium px-4 py-1 rounded-full ${
                        edu.highlight 
                          ? (isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-700') 
                          : (isDark ? 'text-gray-500' : 'text-gray-600')
                      }`}>
                        {edu.duration}
                      </span>
                    </div>
                    <p className={`text-lg mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {edu.institution}
                    </p>
                    
                    {/* Details for highlighted item */}
                    {edu.details && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {edu.details.map((detail, i) => (
                          <span 
                            key={i}
                            className={`text-sm px-4 py-2 rounded-full ${isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Highlight Badge */}
                {edu.highlight && (
                  <div className="absolute -top-3 right-8">
                    <span className="px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-full">
                      Current
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
