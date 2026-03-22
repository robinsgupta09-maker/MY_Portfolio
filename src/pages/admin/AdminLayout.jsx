import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, FolderOpen, Mail, Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import GradientBackground from '../../components/admin/GradientBackground';
import CursorGlow from '../../components/admin/CursorGlow';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'messages', icon: Mail, label: 'Messages' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex relative overflow-hidden">
      {/* Premium Gradient Background */}
      <GradientBackground />
      
      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          key={isSidebarOpen ? 'open' : 'closed'}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className={`fixed lg:relative z-40 h-screen glass border-r border-white/10 backdrop-blur-xl shadow-2xl ${
            isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'
          } overflow-hidden`}
        >
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ${!isSidebarOpen && 'lg:hidden'}`}>
                Admin Panel
              </h1>
            </motion.div>
            
            <nav className="mt-8 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {/* Active Indicator Animation */}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  
                  {/* Left Border Animation */}
                  <motion.div 
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full ${
                      activeTab === item.id ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />
                  
                  <item.icon size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className={`relative z-10 font-semibold ${!isSidebarOpen && 'lg:hidden'}`}>
                    {item.label}
                  </span>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.button
              onClick={handleLogout}
              whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/30"
            >
              <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              <span className={!isSidebarOpen && 'lg:hidden'}>Logout</span>
            </motion.button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Top Bar */}
        <header className="glass border-b border-white/10 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-purple-500/30"
          >
            {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </motion.button>
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-purple-500/50 border-2 border-white/20"
            >
              A
            </motion.div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
