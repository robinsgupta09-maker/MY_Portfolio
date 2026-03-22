import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Globe, 
  Brain,
  FileCode,
  Palette,
  Database,
  Lightbulb,
  Users,
  Target,
  Layers,
  GitBranch,
  Terminal
} from 'lucide-react';

const Skills = ({ isDark = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 85, icon: Code2 },
        { name: 'JavaScript', level: 90, icon: FileCode },
        { name: 'HTML5 & CSS3', level: 95, icon: Palette },
        { name: 'Tailwind CSS', level: 88, icon: Layers },
      ],
    },
    {
      title: 'Backend & Database',
      icon: Database,
      color: 'from-primary-500 to-accent-500',
      skills: [
        { name: 'Node.js', level: 75, icon: Terminal },
        { name: 'Python', level: 80, icon: Code2 },
        { name: 'MongoDB', level: 70, icon: Database },
        { name: 'SQL', level: 72, icon: Database },
      ],
    },
    {
      title: 'Tools & Soft Skills',
      icon: Brain,
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'Git & GitHub', level: 85, icon: GitBranch },
        { name: 'Problem Solving', level: 90, icon: Lightbulb },
        { name: 'Team Collaboration', level: 88, icon: Users },
        { name: 'Critical Thinking', level: 85, icon: Target },
      ],
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
    <section id="skills" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-24">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              My Expertise
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="group"
              >
                <div className={`h-full p-8 lg:p-10 rounded-3xl transition-all duration-500 ${isDark ? 'glass card-hover' : 'bg-white shadow-xl hover:shadow-2xl'}`}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color}`}>
                      <category.icon size={28} className="text-white" />
                    </div>
                    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List with Progress Bars */}
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.5 
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <skill.icon size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {skill.name}
                          </span>
                          <span className={`text-xs ml-auto ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ 
                              delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.05,
                              duration: 0.8,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <motion.div variants={itemVariants} className="mt-20">
            <p className={`text-center mb-8 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Also experienced with</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'REST APIs',
                'VS Code',
                'Figma',
                'Responsive Design',
                'UI/UX',
                'Agile',
                'GitHub',
                'Postman',
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-default ${
                    isDark 
                      ? 'glass text-gray-300 hover:bg-white/10 hover:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
