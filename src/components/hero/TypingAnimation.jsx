import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingAnimation = () => {
  const roles = [
    'Frontend Developer',
    'AI Enthusiast',
    'Building futuristic web experiences 🚀'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <div className="relative z-10 text-center">
      {/* Typing Animation Only - Clean and Minimal */}
      <div className="h-16 flex items-center justify-center">
        <span className="text-2xl md:text-3xl text-gray-300 font-mono">
          {displayedText}
          <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-purple-400`}>|</span>
        </span>
      </div>
    </div>
  );
};

export default TypingAnimation;
