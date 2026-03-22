import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Eye, Star, Archive, Reply, Check } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import Toast from '../../components/admin/Toast';

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Collaboration',
      message: 'Hi, I would like to discuss a potential project collaboration...',
      date: '2026-03-20',
      read: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Question about your experience',
      message: 'I was wondering if you could share more about your work at...',
      date: '2026-03-19',
      read: true,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      subject: 'Freelance Opportunity',
      message: 'We have an exciting freelance opportunity that matches your skills...',
      date: '2026-03-18',
      read: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleMarkAsRead = (messageId) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, read: true } : m
    ));
    setToast({ message: 'Message marked as read', type: 'info' });
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId));
    setToast({ message: 'Message deleted successfully', type: 'success' });
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsReadModalOpen(true);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Messages</h1>
        <p className="text-gray-400">View and manage contact form submissions</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-purple-500/20"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Mail size={24} className="text-purple-400" />
            </motion.div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{messages.length}</p>
              <p className="text-sm text-gray-400">Total Messages</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/20"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-yellow-500/20"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Star size={24} className="text-yellow-400" />
            </motion.div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{messages.filter(m => !m.read).length}</p>
              <p className="text-sm text-gray-400">Unread</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-green-500/20"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Check size={24} className="text-green-400" />
            </motion.div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{messages.filter(m => m.read).length}</p>
              <p className="text-sm text-gray-400">Read</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 5, scale: 1.01 }}
              className={`glass p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                !message.read ? 'border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10' : 'border-white/5'
              }`}
              onClick={() => handleViewMessage(message)}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    {message.name.charAt(0)}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg group-hover:text-purple-300 transition-colors">{message.name}</h3>
                      {!message.read && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 text-xs rounded-full bg-purple-500/30 text-purple-200 font-medium"
                        >
                          New
                        </motion.span>
                      )}
                      {message.read && (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 font-medium flex items-center gap-1">
                          <Check size={12} />
                          Read
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-purple-300 font-medium mb-1">{message.subject}</p>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">{message.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail size={12} />
                        {message.email}
                      </span>
                      <span>•</span>
                      <span>{message.date}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewMessage(message);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all"
                    title="Read Message"
                  >
                    <Eye size={18} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(message.id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Read Message Modal */}
      <Modal
        isOpen={isReadModalOpen}
        onClose={() => {
          setIsReadModalOpen(false);
          setSelectedMessage(null);
        }}
        title="Message Details"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold">
                {selectedMessage.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedMessage.name}</h3>
                <p className="text-sm text-gray-400">{selectedMessage.email}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold text-purple-300 mb-2">Subject</h4>
              <p className="text-white">{selectedMessage.subject}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold text-purple-300 mb-2">Message</h4>
              <p className="text-gray-300 leading-relaxed">{selectedMessage.message}</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm text-gray-400">Received on {selectedMessage.date}</span>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all"
                >
                  <Reply size={16} />
                  Reply
                </motion.button>
                <motion.button
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id);
                    setIsReadModalOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Messages;
