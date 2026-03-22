import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const About = ({ isDark = true }) => {
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
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const highlights = [
    { value: '1+', label: 'Year Experience', icon: Calendar },
    { value: '10+', label: 'Projects Built', icon: MapPin },
    { value: '5+', label: 'Core Technologies', icon: GraduationCap },
  ];

  return (
    <section id="about" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-24">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              About Me
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Who I <span className="text-gradient">Am</span>
            </h2>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column - Bio */}
            <motion.div variants={itemVariants} className="space-y-8">
              <p className={`text-xl lg:text-2xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Passionate Front-End Developer and B.Tech AI & Data Science student focused on building modern, scalable web applications. Skilled in JavaScript, Python, and responsive UI development.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {highlights.map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    className={`text-center p-6 rounded-2xl ${isDark ? 'glass' : 'bg-white shadow-lg'}`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon size={24} className={`mx-auto mb-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                    <p className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Image/Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className={`relative rounded-3xl p-8 lg:p-12 ${isDark ? 'glass' : 'bg-white shadow-xl'}`}>
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Current Focus</p>
                    <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>React & Modern Frontend Architecture</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Education</p>
                    <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>B.Tech AI & Data Science (2023-2027)</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Location</p>
                    <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Chandigarh, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
