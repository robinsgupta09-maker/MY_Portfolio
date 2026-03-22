import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Briefcase, MapPin, Link as LinkIcon, Check } from 'lucide-react';
import Toast from '../../components/admin/Toast';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: 'Robins Gupta',
    tagline: 'Full Stack Developer | AI Enthusiast',
    email: 'robinsgupta09@gmail.com',
    location: 'India',
    bio: 'Passionate developer with expertise in building modern web applications...',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: '',
  });
  const [toast, setToast] = useState(null);
  const [preferences, setPreferences] = useState({
    showContactForm: true,
    enableChatbot: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save to backend
    console.log('Settings saved:', formData);
    setToast({ message: 'Settings saved successfully!', type: 'success' });
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Settings</h1>
        <p className="text-gray-400">Manage your profile information and preferences</p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <User size={24} />
          </div>
          Profile Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600 resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            <Save size={20} />
            Save Changes
          </motion.button>
        </form>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <LinkIcon size={24} />
          </div>
          Social Links
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Twitter URL
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-600"
            />
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Briefcase size={24} />
          </div>
          Preferences
        </h2>

        <div className="space-y-4">
          <motion.div 
            className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
            whileHover={{ scale: 1.01 }}
          >
            <div>
              <h3 className="font-semibold mb-1">Show Contact Form</h3>
              <p className="text-sm text-gray-400">Display contact form on portfolio</p>
            </div>
            <motion.button
              onClick={() => setPreferences({ ...preferences, showContactForm: !preferences.showContactForm })}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                preferences.showContactForm ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/10'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ x: preferences.showContactForm ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-lg"
              />
            </motion.button>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
            whileHover={{ scale: 1.01 }}
          >
            <div>
              <h3 className="font-semibold mb-1">Enable Chatbot</h3>
              <p className="text-sm text-gray-400">Show AI chatbot widget</p>
            </div>
            <motion.button
              onClick={() => setPreferences({ ...preferences, enableChatbot: !preferences.enableChatbot })}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                preferences.enableChatbot ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/10'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ x: preferences.enableChatbot ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-lg"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
