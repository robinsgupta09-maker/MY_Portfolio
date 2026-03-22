import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, FolderOpen, ArrowUpRight, Activity, Zap, Star } from 'lucide-react';
import Card from '../../components/admin/Card';
import Button from '../../components/admin/Button';

const Dashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    messages: 0,
    views: 0,
    visitors: 0
  });

  const [progressBars, setProgressBars] = useState({
    projects: 0,
    messages: 0,
    views: 0,
    visitors: 0
  });

  useEffect(() => {
    // Animate counters on mount
    const targets = { projects: 5, messages: 12, views: 1200, visitors: 847 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedStats({
        projects: Math.floor(targets.projects * easeOutQuart),
        messages: Math.floor(targets.messages * easeOutQuart),
        views: Math.floor(targets.views * easeOutQuart),
        visitors: Math.floor(targets.visitors * easeOutQuart)
      });

      // Animate progress bars
      setProgressBars({
        projects: (targets.projects / 10) * 100 * easeOutQuart,
        messages: (targets.messages / 20) * 100 * easeOutQuart,
        views: (targets.views / 2000) * 100 * easeOutQuart,
        visitors: (targets.visitors / 1000) * 100 * easeOutQuart
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);
  const stats = [
    { icon: FolderOpen, label: 'Total Projects', value: '5', change: '+2 this year', progress: progressBars.projects, color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, label: 'Messages', value: '12', change: '3 unread', progress: progressBars.messages, color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Profile Views', value: '1.2k', change: '+15% this month', progress: progressBars.views, color: 'from-green-500 to-emerald-500' },
    { icon: Users, label: 'Visitors', value: '847', change: '+8% this week', progress: progressBars.visitors, color: 'from-orange-500 to-red-500' },
  ];

  const recentActivity = [
    { type: 'message', text: 'New contact form submission', time: '2 hours ago' },
    { type: 'view', text: 'Profile reached 1k views', time: '5 hours ago' },
    { type: 'project', text: 'Project "AI Chatbot" updated', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your portfolio.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="group"
            glow
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg shadow-purple-500/30`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon size={24} className="text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold flex items-center gap-1 border border-green-500/30"
                >
                  <ArrowUpRight size={14} />
                  {stat.change}
                </motion.div>
              </div>
              
              <h3 className="text-4xl font-bold mb-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {index === 2 ? `${(animatedStats.views / 1000).toFixed(1)}k` : animatedStats[index === 0 ? 'projects' : index === 1 ? 'messages' : 'visitors']}
              </h3>
              <p className="text-sm text-gray-400 mb-4 font-medium">{stat.label}</p>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full shadow-lg shadow-purple-500/50 relative`}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                </motion.div>
              </div>
              
              {/* Additional Metrics */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-gray-500 flex items-center gap-1">
                  <Activity size={12} />
                  Target: {stat.label.includes('Projects') ? '10' : stat.label.includes('Messages') ? '20' : stat.label.includes('Views') ? '2k' : '1k'}
                </span>
                <span className="text-gray-400 font-semibold">
                  {Math.round(stat.progress)}%
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass p-6 rounded-xl border border-white/5"
      >
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="flex-1">
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold mb-2">Quick Update</h3>
          <p className="text-gray-400 text-sm mb-4">Update your profile information, skills, or contact details.</p>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            Edit Profile
          </button>
        </div>

        <div className="glass p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold mb-2">Add New Project</h3>
          <p className="text-gray-400 text-sm mb-4">Showcase your latest work by adding a new project.</p>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            Add Project
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
