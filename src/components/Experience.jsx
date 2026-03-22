import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const Experience = ({ isDark = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      title: 'Software Engineer Intern',
      company: 'PG Tech Mohali',
      duration: 'Sep 2024 – Sep 2025',
      location: 'Mohali, Punjab',
      type: 'Internship',
      description: 'Developed and optimized responsive web interfaces, improving load times and user engagement.',
      impact: [
        { metric: '40%', label: 'Faster Load Times' },
        { metric: '25%', label: 'Improved UI Performance' },
        { metric: '5+', label: 'Projects Delivered' },
      ],
      achievements: [
        'Built responsive interfaces using React and modern CSS',
        'Optimized frontend performance reducing load time by 40%',
        'Collaborated with design team to implement pixel-perfect UIs',
        'Integrated REST APIs and improved data fetching efficiency',
      ],
    },
  ];

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

  return (
    <section id="experience" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-24">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              Work History
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Professional <span className="text-gradient">Experience</span>
            </h2>
          </motion.div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                variants={itemVariants}
                className="group"
              >
                <div className={`p-8 lg:p-12 rounded-3xl transition-all duration-500 ${isDark ? 'glass card-hover' : 'bg-white shadow-xl hover:shadow-2xl'}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Company Info */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                          <Briefcase size={28} className="text-white" />
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-700'}`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {exp.title}
                      </h3>
                      <p className="text-xl text-primary-500 font-medium mb-4">
                        {exp.company}
                      </p>

                      <div className={`space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={18} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2">
                      <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {exp.description}
                      </p>

                      {/* Impact Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {exp.impact.map((item, i) => (
                          <motion.div
                            key={i}
                            className={`text-center p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                          >
                            <p className="text-3xl font-bold text-gradient mb-1">{item.metric}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{item.label}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="space-y-4">
                        <h4 className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              className={`flex items-start gap-3 p-4 rounded-xl ${isDark ? 'glass-light' : 'bg-gray-50'}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            >
                              <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
