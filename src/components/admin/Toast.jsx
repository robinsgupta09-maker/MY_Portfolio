import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle size={20} className="text-green-400" />,
    error: <XCircle size={20} className="text-red-400" />,
    warning: <AlertCircle size={20} className="text-yellow-400" />,
    info: <Info size={20} className="text-blue-400" />,
  };

  const bgColors = {
    success: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    error: 'from-red-500/20 to-rose-500/20 border-red-500/30',
    warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl glass border backdrop-blur-xl ${bgColors[type]} shadow-2xl`}
      >
        {icons[type]}
        <p className="text-white font-medium">{message}</p>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="ml-2 text-gray-400 hover:text-white transition-colors"
        >
          ×
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
