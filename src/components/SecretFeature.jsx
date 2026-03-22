import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SecretFeature = () => {
  const [keySequence, setKeySequence] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const secretCode = 'MUSKAN';

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      // Only track letters
      if (!/^[A-Z]$/.test(key)) return;

      // Add key to sequence
      const newSequence = [...keySequence, key];
      
      // Keep only last 6 keys
      if (newSequence.length > 6) {
        newSequence.shift();
      }

      setKeySequence(newSequence);

      // Check if sequence matches MUSKAN
      const currentSequence = newSequence.join('');
      if (currentSequence.includes(secretCode)) {
        setShowMessage(true);
        setKeySequence([]);
        
        // Trigger confetti
        triggerConfetti();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  const triggerConfetti = () => {
    // Create confetti elements
    const colors = ['#ff69b4', '#ff1493', '#da70d6', '#ba55d3', '#9370db'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}vw;
        opacity: 0;
        pointer-events: none;
        z-index: 10000;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      `;
      
      document.body.appendChild(confetti);

      // Animate confetti
      setTimeout(() => {
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.opacity = '1';
        confetti.style.transform = `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {showMessage && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessage(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000]"
          />

          {/* Message Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 rounded-3xl max-w-2xl w-full p-12 text-center shadow-2xl shadow-purple-500/50 border border-white/20">
              {/* Heart Animation */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                💖
              </motion.div>

              {/* Message */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                This website is secretly made for someone special...
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-8"
              >
                Every line of code, every animation, every detail — all crafted with love 💫
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMessage(false)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Close ✨
                </motion.button>
              </motion.div>

              {/* Floating Hearts Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0,
                      y: Math.random() * 100 + '%',
                      x: Math.random() * 100 + '%',
                      scale: 0
                    }}
                    animate={{ 
                      opacity: [0, 0.6, 0],
                      y: [null, Math.random() * -200],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    className="absolute text-2xl"
                  >
                    ❤️
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SecretFeature;
