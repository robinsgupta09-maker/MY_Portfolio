import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Trophy, Target, Code2, Award, Cloud, Medal, Cpu } from 'lucide-react';

const Counter = ({ from, to, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(to);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, to]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return <span ref={ref}>{displayValue}</span>;
};

const Achievements = ({ isDark = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    {
      icon: Code2,
      value: 10,
      suffix: '+',
      label: 'Projects Built',
      description: 'Full-stack applications',
    },
    {
      icon: Trophy,
      value: 1,
      suffix: 'st',
      label: 'Hackathon Rank',
      description: '24-hour coding competition',
    },
    {
      icon: Cloud,
      value: 1,
      suffix: '+',
      label: 'Certifications',
      description: 'AWS Generative AI',
    },
    {
      icon: Award,
      value: 1,
      suffix: '+',
      label: 'Year Experience',
      description: 'Professional work',
    },
  ];

  const achievements = [
    {
      icon: Trophy,
      title: '1st Rank - 24hr Hackathon',
      description: 'Won first place in university-level competitive coding event among 50+ teams',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Cloud,
      title: 'AWS Generative AI Certified',
      description: 'Earned AWS certification in Generative AI technologies and cloud fundamentals',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Cpu,
      title: 'Engineering Day Showcase',
      description: 'Featured project selected for display at university Engineering Day event',
      color: 'from-primary-500 to-accent-500',
    },
  ];

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

  return (
    <section id="achievements" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-24">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              Track Record
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-gradient">Achievements</span>
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group"
              >
                <div className={`h-full p-6 lg:p-8 rounded-2xl text-center transition-all duration-500 ${isDark ? 'glass card-hover' : 'bg-white shadow-lg hover:shadow-xl'}`}>
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon size={24} className="text-white" />
                  </motion.div>

                  {/* Counter */}
                  <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                    <Counter from={0} to={stat.value} />
                    {stat.suffix}
                  </div>

                  {/* Label */}
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.label}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievements Cards */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className={`text-2xl font-semibold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Notable <span className="text-gradient">Achievements</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`h-full p-8 rounded-3xl transition-all duration-500 ${isDark ? 'glass card-hover' : 'bg-white shadow-lg hover:shadow-xl'}`}>
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <achievement.icon size={28} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
