import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = ({ isDark = true }) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:robinsgupta09@gmail.com', label: 'Email' },
  ];

  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className={`py-12 lg:py-16 border-t transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <motion.a
              href="#"
              className="text-2xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient">Robins</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>.</span>
            </motion.a>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              © {currentYear} Robins Gupta. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            {footerLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 underline-animation ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={scrollToTop}
              className={`p-3 rounded-full transition-all duration-300 ${isDark ? 'glass text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>

        {/* Made with love */}
        <motion.div 
          className={`mt-12 pt-8 border-t text-center transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-gray-200'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className={`text-sm flex items-center justify-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Robins Gupta
          </p>
          {/* Admin Portal Link */}
          <div className="mt-4">
            <button 
              onClick={() => navigate('/admin')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Admin Portal
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
