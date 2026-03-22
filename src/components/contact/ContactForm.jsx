import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader } from 'lucide-react';

const ContactForm = ({ isDark = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Name Input with Floating Label */}
      <div className="relative group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer placeholder-transparent"
          placeholder="Your Name"
        />
        <label className="absolute left-4 top-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-gray-900 peer-focus:px-2 peer-focus:text-purple-400 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-gray-900 peer-valid:px-2">
          Your Name
        </label>
        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="h-full rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
        </div>
      </div>

      {/* Email Input with Floating Label */}
      <div className="relative group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer placeholder-transparent"
          placeholder="Your Email"
        />
        <label className="absolute left-4 top-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-gray-900 peer-focus:px-2 peer-focus:text-purple-400 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-gray-900 peer-valid:px-2">
          Your Email
        </label>
        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="h-full rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl" />
        </div>
      </div>

      {/* Message Input with Floating Label */}
      <div className="relative group">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer placeholder-transparent resize-none"
          placeholder="Your Message"
        />
        <label className="absolute left-4 top-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-gray-900 peer-focus:px-2 peer-focus:text-purple-400 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-gray-900 peer-valid:px-2">
          Your Message
        </label>
        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="h-full rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl" />
        </div>
      </div>

      {/* Submit Button with Animation */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isSuccess}
        whileHover={{ scale: isSuccess ? 1 : 1.02 }}
        whileTap={{ scale: isSuccess ? 1 : 0.98 }}
        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-500 ${
          isSuccess
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin" size={20} />
            Sending...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={20} />
            Message Sent Successfully! ✨
          </>
        ) : (
          <>
            <Send size={20} className="transition-transform group-hover:translate-x-1" />
            Send Message
          </>
        )}
      </motion.button>

      {/* Success Animation */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300 text-center"
        >
          Thank you! I'll get back to you soon. 💫
        </motion.div>
      )}
    </motion.form>
  );
};

export default ContactForm;
