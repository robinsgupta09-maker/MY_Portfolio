import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import MouseSpotlight from './components/effects/MouseSpotlight';
import ScrollProgress from './components/effects/ScrollProgress';
import SecretFeature from './components/SecretFeature';
import AdminPage from './pages/admin/AdminPage';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  // Safety timeout - ensure loading never gets stuck
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Loading timeout reached, forcing completion');
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <Routes>
            {/* Main Portfolio Route */}
            <Route
              path="/"
              element={
                <motion.div
                  key="app"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark' : 'bg-gray-50'}`}
                  data-theme={isDark ? 'dark' : 'light'}
                  style={isDark ? {
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #1e1b4b 70%, #0f172a 100%)',
                    backgroundAttachment: 'fixed'
                  } : {}}
                >
                  {/* Global Effects */}
                  <ScrollProgress />
                  {isDark && <MouseSpotlight />}
                  <SecretFeature />

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
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
