import { motion } from 'framer-motion';

const SkillBar = ({ name, level, icon: Icon, delay, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-6 group"
    >
      {/* Skill Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 12 }}
              className={`p-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-20`}
            >
              <Icon size={18} className="text-white" />
            </motion.div>
          )}
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-semibold text-purple-400">{level}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700 group-hover:border-purple-500/50 transition-all duration-300">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Fill Animation */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color} relative overflow-hidden`}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-current opacity-50 blur-md group-hover:opacity-75 transition-opacity" />
        </motion.div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <div className={`h-full rounded-full bg-gradient-to-r ${color} blur-xl`} />
      </div>
    </motion.div>
  );
};

export default SkillBar;
