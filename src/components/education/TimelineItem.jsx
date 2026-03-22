import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const TimelineItem = ({ item, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const icons = {
    education: GraduationCap,
    achievement: Award,
    certification: BookOpen
  };

  const Icon = icons[item.type] || GraduationCap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-12 pb-12 group"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-transparent" />
      )}

      {/* Glowing Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        whileHover={{ scale: 1.3, boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)' }}
        className="absolute left-0 top-8 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-gray-900 shadow-lg shadow-purple-500/50 z-10"
      >
        {/* Inner Glow */}
        <div className="absolute inset-0 rounded-full bg-white/30 blur-sm" />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          rotateX: 2,
          rotateY: -2,
          boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)'
        }}
        className="relative glass p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 bg-gradient-to-br from-gray-900/80 to-purple-900/10"
        style={{ perspective: '1000px' }}
      >
        {/* Icon Badge */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 12 }}
          className="absolute -top-6 left-6 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
        >
          <Icon size={24} className="text-white" />
        </motion.div>

        {/* Content */}
        <div className="pt-4">
          {/* Date */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.4 }}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3"
          >
            {item.date}
          </motion.span>

          {/* Title */}
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.5 }}
            className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            {item.title}
          </motion.h3>

          {/* Institution */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.6 }}
            className="text-gray-400 mb-3"
          >
            {item.institution}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.7 }}
            className="text-gray-300 text-sm leading-relaxed"
          >
            {item.description}
          </motion.p>

          {/* Grade/Achievement Badge */}
          {item.grade && (
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
            >
              <Award size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-300">{item.grade}</span>
            </motion.div>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-xl" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineItem;
