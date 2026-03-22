import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const Contact = ({ isDark = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Web3Forms API endpoint
      const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
      
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '3f37ab63-4172-49b6-98f2-df2b0ea48a57');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('from_name', 'Portfolio Contact Form');
      formDataToSend.append('subject', `New message from ${formData.name}`);
      
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:robinsgupta09@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" className="py-32 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-24">
            <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              Get in Touch
            </p>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500' 
                        : focusedField === 'name'
                        ? 'border-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : isDark 
                        ? 'border-white/10 bg-dark-800/50 text-white placeholder-gray-500' 
                        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'
                    } focus:outline-none`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500' 
                        : focusedField === 'email'
                        ? 'border-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : isDark 
                        ? 'border-white/10 bg-dark-800/50 text-white placeholder-gray-500' 
                        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'
                    } focus:outline-none`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500' 
                        : focusedField === 'message'
                        ? 'border-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : isDark 
                        ? 'border-white/10 bg-dark-800/50 text-white placeholder-gray-500' 
                        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'
                    } focus:outline-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 font-semibold rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
                    isDark 
                      ? 'bg-white text-dark-900 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                      : 'bg-dark-900 text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>

                {/* Success Message Popup */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSubmitted(false)} />
                      <motion.div 
                        className={`relative p-8 rounded-2xl text-center max-w-md ${isDark ? 'glass' : 'bg-white shadow-2xl'}`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle size={32} className="text-emerald-500" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Message Sent Successfully 🚀
                        </h3>
                        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Thank you for reaching out! I'll get back to you soon.
                        </p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-3 rounded-full bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
                        >
                          Got it!
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <div className="space-y-6">
                {/* Email */}
                <div className={`p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 ${isDark ? 'glass' : 'bg-white shadow-lg'}`}>
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Mail size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Email</p>
                    <a 
                      href="mailto:robinsgupta09@gmail.com"
                      className={`text-lg font-semibold hover:text-primary-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      robinsgupta09@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className={`p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 ${isDark ? 'glass' : 'bg-white shadow-lg'}`}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Phone size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Phone</p>
                    <a 
                      href="tel:+918708493016"
                      className={`text-lg font-semibold hover:text-emerald-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      +91 8708493016
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className={`p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 ${isDark ? 'glass' : 'bg-white shadow-lg'}`}>
                  <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                    <MapPin size={20} className="text-accent-500" />
                  </div>
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Location</p>
                    <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Chandigarh, India
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className={`p-6 rounded-2xl ${isDark ? 'glass' : 'bg-white shadow-lg'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Open to opportunities</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Available for full-time roles and freelance projects</p>
                </div>

                {/* Social Links */}
                <div>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Connect with me</p>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-xl transition-all duration-300 ${isDark ? 'glass text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
