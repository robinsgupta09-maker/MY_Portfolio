import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, Check, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Toast from '../../components/admin/Toast';
import {
  onMessagesChange,
  markMessageAsRead,
  deleteMessage,
  getMessageStats
} from '../../services/firebaseMessagingService';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });

  // Set up real-time listener on mount
  useEffect(() => {
    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = onMessagesChange((newMessages) => {
      setMessages(newMessages);
      setLoading(false);
      
      // Update stats
      const total = newMessages.length;
      const unread = newMessages.filter(m => m.status === 'unread' || !m.read).length;
      const read = total - unread;
      setStats({ total, unread, read });
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleMarkAsRead = async (messageId, currentStatus) => {
    if (currentStatus === 'read') return; // Already read

    try {
      await markMessageAsRead(messageId);
      setToast({ message: 'Message marked as read', type: 'success' });
    } catch (error) {
      console.error('Error marking as read:', error);
      setToast({ message: 'Failed to mark as read', type: 'error' });
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setToast({ message: 'Message deleted successfully', type: 'success' });
      setIsModalOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      setToast({ message: 'Failed to delete message', type: 'error' });
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (message.status === 'unread' || !message.read) {
      handleMarkAsRead(message.id, message.status);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Messages</h1>
        <p className="text-gray-400">View and manage contact form submissions. Updates in real-time. 🔄</p>
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
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stats.total}
              </p>
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
              <AlertCircle size={24} className="text-yellow-400" />
            </motion.div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {stats.unread}
              </p>
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
              <CheckCircle2 size={24} className="text-green-400" />
            </motion.div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {stats.read}
              </p>
              <p className="text-sm text-gray-400">Read</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <Loader2 size={40} className="animate-spin text-purple-400" />
            <p className="ml-4 text-gray-400">Loading messages from Firestore...</p>
          </motion.div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Mail size={64} className="mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No messages yet</h3>
            <p className="text-gray-500">Contact form submissions will appear here in real-time 🔄</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
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
                  message.status === 'unread' || !message.read
                    ? 'border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10'
                    : 'border-white/5 hover:border-white/10'
                }`}
                onClick={() => handleViewMessage(message)}
              >
                {/* Unread Indicator */}
                {(message.status === 'unread' || !message.read) && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
                )}

                <div className="flex items-start justify-between gap-4 ml-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white truncate">{message.name}</h3>
                      {(message.status === 'unread' || !message.read) && (
                        <span className="px-2 py-1 text-xs bg-purple-500/30 text-purple-300 rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{message.email}</p>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{message.message}</p>
                    <div className="text-xs text-gray-500">{formatDate(message.timestamp || message.createdAt)}</div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMessage(message);
                      }}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      title="View"
                    >
                      <Eye size={18} className="text-blue-400" />
                    </motion.button>

                    {(message.status === 'unread' || !message.read) && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(message.id, message.status);
                        }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title="Mark as read"
                      >
                        <Check size={18} className="text-green-400" />
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMessage(message.id);
                      }}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {isModalOpen && selectedMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                <p className="text-gray-400">{selectedMessage.email}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Subject</label>
                <p className="text-white">{selectedMessage.subject || 'No Subject'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Message</label>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Date</label>
                <p className="text-gray-300">{formatDate(selectedMessage.timestamp || selectedMessage.createdAt)}</p>
              </div>

              <div className="flex gap-3 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  Close
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Messages;

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
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{messages.filter(m => !m.isRead).length}</p>
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
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{messages.filter(m => m.isRead).length}</p>
              <p className="text-sm text-gray-400">Read</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <Loader2 size={40} className="animate-spin text-purple-400" />
            <p className="ml-4 text-gray-400">Loading messages...</p>
          </motion.div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Mail size={64} className="mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No messages yet</h3>
            <p className="text-gray-500">Contact form submissions will appear here</p>
          </motion.div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={message._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 5, scale: 1.01 }}
              className={`glass p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                !message.isRead ? 'border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10' : 'border-white/5'
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
                      {!message.isRead && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 text-xs rounded-full bg-purple-500/30 text-purple-200 font-medium"
                        >
                          New
                        </motion.span>
                      )}
                      {message.isRead && (
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
                      <span>{new Date(message.createdAt).toLocaleDateString()}</span>
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
                      handleDeleteMessage(message._id);
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
          ))
        )}
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
