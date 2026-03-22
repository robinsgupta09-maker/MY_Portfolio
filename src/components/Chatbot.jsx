import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX, Mail, Github, Linkedin } from 'lucide-react';
import { chatbotService } from '../services/chatbotService';

const Chatbot = ({ isDark = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Robins AI 🤖. Ask me anything about his work, skills, or how to contact him!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [detectedLanguage, setDetectedLanguage] = useState('en');
  const [userName, setUserName] = useState(null);
  const [showMemoryIndicator, setShowMemoryIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const quickActions = [
    { label: 'About Me', query: 'Tell me about yourself' },
    { label: 'Skills', query: 'What are your skills?' },
    { label: 'Projects', query: 'Show me your projects' },
    { label: 'Contact', query: 'How can I contact you?' }
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Detect language from text
  const detectLanguage = useCallback((text) => {
    // Simple language detection based on character patterns
    const hindiPattern = /[\u0900-\u097F]/;
    const hasHindi = hindiPattern.test(text);
    
    // Check for Hinglish patterns (Roman Hindi)
    const hinglishWords = ['bhai', 'hai', 'kaise', 'kya', 'ho', 'main', 'mera', 'tum', 'aap', 'nahi', 'haan', 'theek', 'bahut', 'acha'];
    const lowerText = text.toLowerCase();
    const hasHinglish = hinglishWords.some(word => lowerText.includes(word));
    
    if (hasHindi) return 'hi';
    if (hasHinglish) return 'hi'; // Treat Hinglish as Hindi for TTS
    return 'en';
  }, []);

  // Text-to-Speech function
  const speakText = useCallback((text, lang = 'en') => {
    if (!speechEnabled || !synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on detected language
    const langMap = {
      'hi': 'hi-IN',
      'en': 'en-US',
      'pa': 'pa-IN'
    };
    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [speechEnabled]);

  // Toggle speech recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputMessage('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Toggle speech output
  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text = inputMessage) => {
    if (!text.trim()) return;

    // Detect language from user input
    const lang = detectLanguage(text);
    setDetectedLanguage(lang);

    const userMessage = {
      id: Date.now(),
      text: text,
      isUser: true,
      timestamp: new Date(),
      language: lang
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    try {
      // Get chat history for context (last 5 messages)
      const chatHistory = messages.slice(-5).map(msg => ({
        text: msg.text,
        isUser: msg.isUser
      }));

      const response = await chatbotService.sendMessage(text, chatHistory);
      
      // Update user name from memory if detected
      if (response.memory?.userName && !userName) {
        setUserName(response.memory.userName);
        setShowMemoryIndicator(true);
        setTimeout(() => setShowMemoryIndicator(false), 3000);
      }
      
      // If API fails, use fallback
      let finalMessage = response.success 
        ? response.message 
        : chatbotService.getFallbackResponse(text);

      // Check if fallback trigger is returned
      const isFallback = finalMessage === "FALLBACK_TRIGGER";
      
      if (isFallback) {
        const fallbackData = chatbotService.getFallbackMessage(lang);
        finalMessage = fallbackData.message;
      }

      // Detect language of response for TTS
      const responseLang = detectLanguage(finalMessage);

      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          text: finalMessage,
          isUser: false,
          timestamp: new Date(),
          language: responseLang,
          isFallback: isFallback,
          originalQuery: text
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        
        // Speak the response
        speakText(finalMessage, responseLang);
      }, 500 + Math.random() * 500); // Natural typing delay

    } catch (error) {
      setIsTyping(false);
      const errorMessage = "😅 I'm having trouble right now. Please try again!";
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: errorMessage,
        isUser: false,
        timestamp: new Date()
      }]);
      speakText(errorMessage, 'en');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (query) => {
    handleSendMessage(query);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]' 
                : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]'
            }`}
          >
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] rounded-3xl overflow-hidden shadow-2xl ${
              isDark 
                ? 'glass border border-white/10' 
                : 'bg-white border border-gray-200 shadow-2xl'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gradient-to-r from-primary-600 to-accent-600'}`}>
                  <Bot size={20} className="text-white" />
                  {isSpeaking && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-primary-500/50" />
                  )}
                  {/* Memory indicator */}
                  <AnimatePresence>
                    {showMemoryIndicator && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                        title="Memory active"
                      >
                        <Sparkles size={10} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {userName ? `Hi ${userName}!` : 'Robins AI'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : userName ? 'Remembering you' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Speech Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleSpeech}
                  className={`p-2 rounded-full transition-colors ${
                    speechEnabled 
                      ? (isDark ? 'text-primary-400 hover:bg-primary-500/20' : 'text-primary-600 hover:bg-primary-100')
                      : (isDark ? 'text-gray-500 hover:text-gray-400 hover:bg-white/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200')
                  }`}
                  title={speechEnabled ? 'Voice response ON' : 'Voice response OFF'}
                >
                  {speechEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`flex gap-2 p-3 overflow-x-auto border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action.query)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isDark 
                      ? 'bg-white/5 text-gray-300 hover:bg-primary-500/20 hover:text-primary-400 border border-white/10' 
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 border border-gray-200'
                  }`}
                >
                  {action.label}
                </motion.button>
              ))}
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 h-[320px] ${isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg ${
                      message.isUser 
                        ? (isDark ? 'bg-gradient-to-br from-primary-500 to-primary-600' : 'bg-gradient-to-br from-primary-600 to-primary-700')
                        : (isDark ? 'bg-gradient-to-br from-primary-500 via-accent-500 to-accent-600' : 'bg-gradient-to-br from-primary-600 via-accent-600 to-accent-700')
                    }`}
                  >
                    {message.isUser ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Sparkles size={16} className="text-white" />
                    )}
                  </motion.div>

                  {/* Message Bubble */}
                  <div className={`max-w-[78%] ${message.isUser ? 'text-right' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
                        message.isUser
                          ? (isDark 
                              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-primary-500/20' 
                              : 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-primary-600/20')
                          : (isDark 
                              ? 'bg-gradient-to-br from-white/10 to-white/5 text-gray-100 border border-white/10 shadow-black/20' 
                              : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 border border-gray-200 shadow-gray-200/50')
                      }`}
                    >
                      {message.text}
                    </motion.div>
                    
                    {/* WhatsApp Fallback Button */}
                    {message.isFallback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3"
                      >
                        <a
                          href={chatbotService.getWhatsAppLink(message.originalQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          {chatbotService.getFallbackMessage(message.language).buttonText}
                        </a>
                      </motion.div>
                    )}
                    
                    {/* Contact Links for Contact Queries */}
                    {!message.isUser && (message.text.toLowerCase().includes('email') || message.text.toLowerCase().includes('contact') || message.text.toLowerCase().includes('reach')) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        <a
                          href="mailto:robinsgupta09@gmail.com"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isDark 
                              ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          <Mail size={14} />
                          Email
                        </a>
                        <a
                          href="https://github.com/robinsgupta09-maker"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isDark 
                              ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          <Github size={14} />
                          GitHub
                        </a>
                        <a
                          href="https://www.linkedin.com/in/robins-gupta-5a1b912a3/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isDark 
                              ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          <Linkedin size={14} />
                          LinkedIn
                        </a>
                      </motion.div>
                    )}
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`text-xs mt-1.5 flex items-center gap-1 ${message.isUser ? 'justify-end' : ''} ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                    >
                      {formatTime(message.timestamp)}
                      {message.language && message.language !== 'en' && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                          {message.language}
                        </span>
                      )}
                    </motion.p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gradient-to-r from-primary-600 to-accent-600'}`}>
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
                      />
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
                      />
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <div className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10' : 'bg-white border border-gray-200'} ${isListening ? 'ring-2 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}>
                {/* Voice Input Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-all ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200')
                  }`}
                  title={isListening ? 'Stop listening' : 'Voice input'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </motion.button>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? 'Listening... Speak now' : "Type a message or use voice..."}
                  disabled={isListening}
                  className={`flex-1 px-4 py-2 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} ${isListening ? 'animate-pulse' : ''}`}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping || isListening}
                  className={`p-2 rounded-full transition-all ${
                    inputMessage.trim() && !isTyping && !isListening
                      ? (isDark ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-[0_0_15px_rgba(99,102,241,0.4)]')
                      : (isDark ? 'text-gray-500' : 'text-gray-400')
                  }`}
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className={`text-xs text-center mt-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {isListening ? '🎤 Speak now...' : 'Press Enter to send or click mic for voice input'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
