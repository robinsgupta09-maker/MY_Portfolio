import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import CursorGlow from './components/CursorGlow';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-dark-900' : 'bg-gray-50'}`}
          data-theme={isDark ? 'dark' : 'light'}
        >
          {/* Cursor Glow Effect - Desktop Only */}
          <CursorGlow />

          {/* Animated Background - Only show in dark mode */}
          {isDark && <AnimatedBackground />}

          {/* Navigation */}
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          {/* Main Content */}
          <main className={`relative z-10 transition-colors duration-500 ${isDark ? '' : 'text-gray-900'}`}>
            <Hero isDark={isDark} />
            <About isDark={isDark} />
            <Education isDark={isDark} />
            <Skills isDark={isDark} />
            <Experience isDark={isDark} />
            <Projects isDark={isDark} />
            <Achievements isDark={isDark} />
            <Contact isDark={isDark} />
          </main>

          {/* Footer */}
          <Footer isDark={isDark} />

          {/* AI Chatbot */}
          <Chatbot isDark={isDark} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
