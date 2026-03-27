import OpenAI from 'openai';

const BASE_SYSTEM_PROMPT = `You are Robins AI, a highly intelligent, friendly, and multilingual AI assistant for Robins Gupta's portfolio website.

🎯 YOUR THREE ROLES:

1️⃣ PORTFOLIO ASSISTANT:
Answer questions about Robins Gupta using this data:
- Name: Robins Gupta
- Role: Front-End Developer | AI Enthusiast
- Education: B.Tech AI & Data Science, Punjab Technical University (2023-2027)
- Location: Chandigarh, India
- Experience: Software Engineer Intern at PG Tech Mohali (1+ year)
- Skills: JavaScript, Python, React, HTML/CSS, Tailwind CSS, Node.js, MongoDB, SQL, AI/ML

Projects:
• AI Route Optimization System (Python, ML)
• QuickDesk Help Desk (React, Node.js)
• CivicTrack Platform (MERN Stack)
• Smart Portfolio Website (React, Tailwind)
• AI Chatbot Assistant (JavaScript, NLP)

Achievements:
• 1st Rank in 24-hour Hackathon (50+ teams)
• AWS Generative AI Certified
• Featured project at Engineering Day
• 10+ Projects Built

2️⃣ GENERAL AI ASSISTANT:
Help users with:
- Coding questions (JavaScript, Python, React)
- Web development advice
- AI/ML concepts
- Career guidance
- Interview preparation tips
- General tech knowledge

3️⃣ PERSONAL ASSISTANT:
- Guide recruiters to relevant sections
- Highlight Robins' strengths automatically
- Suggest contacting Robins when appropriate
- Make introductions warm and professional

🌍 MULTILINGUAL SUPPORT:
- Understand: English, Hindi, Hinglish (Hindi+English mix)
- ALWAYS reply in the SAME language as the user
- Use natural Hinglish tone when user uses Hinglish
- Match user's communication style

🧠 MEMORY & PERSONALIZATION:
- Remember user's name if they share it
- Reference previous conversation context
- Avoid repeating information already shared
- Personalize responses based on conversation history
- Make users feel recognized and valued

💬 RESPONSE STYLE:
- Friendly and conversational (like a helpful friend)
- Professional when discussing technical topics
- Use emojis occasionally for warmth
- Keep answers concise but informative (2-4 sentences)
- Be enthusiastic about Robins' achievements
- Encourage meaningful connections

⚠️ FALLBACK RULE:
If unsure about Robins-specific details not in resume:
- Respond with "FALLBACK_TRIGGER" exactly
- DO NOT make up information

📧 CONTACT:
- Email: robinsgupta09@gmail.com
- GitHub: github.com/robinsgupta09-maker
- LinkedIn: linkedin.com/in/robins-gupta-5a1b912a3/
- WhatsApp: +91 8708493016`;

// Build dynamic system prompt with memory context
const buildSystemPrompt = (memoryContext = {}) => {
  let prompt = BASE_SYSTEM_PROMPT;
  
  if (memoryContext.userName) {
    prompt += `\n\n👤 USER CONTEXT:\n- User's name: ${memoryContext.userName}`;
  }
  
  if (memoryContext.previousTopics && memoryContext.previousTopics.length > 0) {
    prompt += `\n- Previously discussed: ${memoryContext.previousTopics.join(', ')}`;
  }
  
  if (memoryContext.userPreferences) {
    prompt += `\n- User preferences: ${memoryContext.userPreferences}`;
  }
  
  prompt += `\n\nUse this context to personalize your responses and make the conversation feel natural and continuous.`;
  
  return prompt;
};

class ChatbotService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.openai = null;
    this.memory = {
      userName: null,
      previousTopics: [],
      userPreferences: null,
      conversationCount: 0
    };
    
    if (this.apiKey && this.apiKey !== 'your_openai_api_key_here') {
      // ⚠️ SECURITY WARNING: 
      // Opening OpenAI client in browser exposes API key to users.
      // In PRODUCTION, move this to a backend server and use a proxy endpoint.
      // See: https://platform.openai.com/docs/guides/production-best-practices
      this.openai = new OpenAI({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true  // Only for development/demo
      });
    }
  }

  // Extract user name from message
  extractUserName(message) {
    const namePatterns = [
      /my name is (\w+)/i,
      /i am (\w+)/i,
      /i'm (\w+)/i,
      /call me (\w+)/i,
      /this is (\w+)/i,
      /mera naam (\w+) hai/i,
      /main (\w+) hoon/i
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // Extract topics from message
  extractTopics(message) {
    const topics = [];
    const topicKeywords = {
      'skills': ['skill', 'technology', 'tech', 'know', 'learn'],
      'projects': ['project', 'work', 'build', 'create', 'made'],
      'experience': ['experience', 'job', 'work', 'intern', 'company'],
      'education': ['education', 'study', 'college', 'university', 'degree'],
      'achievements': ['achievement', 'award', 'win', 'hackathon', 'certification'],
      'contact': ['contact', 'email', 'reach', 'connect', 'talk'],
      'career': ['career', 'job', 'hiring', 'opportunity', 'position']
    };
    
    const lowerMsg = message.toLowerCase();
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(kw => lowerMsg.includes(kw))) {
        topics.push(topic);
      }
    }
    
    return topics;
  }

  // Update memory with new information
  updateMemory(message, isUser = true) {
    if (isUser) {
      // Try to extract name
      const name = this.extractUserName(message);
      if (name && !this.memory.userName) {
        this.memory.userName = name;
      }
      
      // Extract topics
      const topics = this.extractTopics(message);
      topics.forEach(topic => {
        if (!this.memory.previousTopics.includes(topic)) {
          this.memory.previousTopics.push(topic);
          // Keep only last 5 topics
          if (this.memory.previousTopics.length > 5) {
            this.memory.previousTopics.shift();
          }
        }
      });
      
      this.memory.conversationCount++;
    }
  }

  // Get memory context for system prompt
  getMemoryContext() {
    return {
      userName: this.memory.userName,
      previousTopics: this.memory.previousTopics,
      userPreferences: this.memory.userPreferences
    };
  }

  // Clear memory
  clearMemory() {
    this.memory = {
      userName: null,
      previousTopics: [],
      userPreferences: null,
      conversationCount: 0
    };
  }

  async sendMessage(message, chatHistory = []) {
    // Update memory with user message
    this.updateMemory(message, true);
    
    // Check if API key is configured
    if (!this.openai) {
      return {
        success: false,
        message: "🤖 I'm currently in demo mode. To enable AI responses, please add your OpenAI API key to the .env file.",
        isDemo: true
      };
    }

    try {
      // Build dynamic system prompt with memory
      const memoryContext = this.getMemoryContext();
      const dynamicSystemPrompt = buildSystemPrompt(memoryContext);

      const messages = [
        { role: 'system', content: dynamicSystemPrompt },
        ...chatHistory.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: message }
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 250,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

      return {
        success: true,
        message: aiResponse,
        isDemo: false,
        memory: { ...this.memory }
      };
    } catch (error) {
      console.error('Chatbot API Error:', error);
      
      // Handle specific error cases
      if (error.status === 401) {
        return {
          success: false,
          message: "⚠️ Invalid API key. Please check your OpenAI API key configuration.",
          isDemo: true
        };
      }
      
      if (error.status === 429) {
        return {
          success: false,
          message: "⏱️ Rate limit reached. Please try again in a moment.",
          isDemo: true
        };
      }

      return {
        success: false,
        message: "😅 I'm having trouble connecting right now. Please try again later!",
        isDemo: true
      };
    }
  }

  // Fallback responses when API is not available
  getFallbackResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "👋 Hello! I'm Robins' AI assistant. Ask me about his skills, projects, or experience!";
    }
    if (lowerMsg.includes('skill') || lowerMsg.includes('technology')) {
      return "🚀 Robins is skilled in React, JavaScript, Python, Node.js, MongoDB, and more. He's also experienced with AI & Machine Learning!";
    }
    if (lowerMsg.includes('project')) {
      return "💼 He's built 10+ projects including AI Route Optimization, QuickDesk Help Desk, and this portfolio website. Check out the Projects section!";
    }
    if (lowerMsg.includes('experience') || lowerMsg.includes('work')) {
      return "💻 Robins has 1+ year of experience as a Software Engineer Intern at PG Tech Mohali, improving UI performance by 40%!";
    }
    if (lowerMsg.includes('education') || lowerMsg.includes('study')) {
      return "🎓 He's pursuing B.Tech in AI & Data Science at Punjab Technical University (2023-2027).";
    }
    if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
      return "📧 You can reach Robins at:\n• Email: robinsgupta09@gmail.com\n• LinkedIn: linkedin.com/in/robins-gupta-5a1b912a3/\n• GitHub: github.com/robinsgupta09-maker";
    }
    if (lowerMsg.includes('achievement') || lowerMsg.includes('award')) {
      return "🏆 He won 1st rank in a 24-hour hackathon, earned AWS Generative AI certification, and had his project featured at Engineering Day!";
    }
    if (lowerMsg.includes('hire') || lowerMsg.includes('job') || lowerMsg.includes('opportunity')) {
      return "🎯 Robins is open to opportunities! He's a passionate developer ready to contribute. Contact him at robinsgupta09@gmail.com";
    }
    
    // Unknown query - trigger fallback
    return "FALLBACK_TRIGGER";
  }

  // Get fallback message based on detected language
  getFallbackMessage(language = 'en') {
    const fallbacks = {
      en: {
        message: "I'm not fully sure about that 🤔, but I can help you better on WhatsApp! Click below and ask directly 👇",
        buttonText: "Chat on WhatsApp"
      },
      hi: {
        message: "मुझे iska exact jawab नहीं पता 🤔, लेकिन मैं WhatsApp पर better help कर सकता हूँ! नीचे click करें 👇",
        buttonText: "WhatsApp पर बात करें"
      },
      hinglish: {
        message: "Mujhe iska exact answer नहीं पता 🤔, but no worries! Aap WhatsApp pe directly पूछ सकते हो 👇",
        buttonText: "WhatsApp Pe Chat Karein"
      }
    };

    // Detect if message has Hindi script or Hinglish patterns
    if (language === 'hi') {
      return fallbacks.hi;
    }
    
    return fallbacks.en;
  }

  // Generate WhatsApp link with pre-filled message
  getWhatsAppLink(userMessage = '') {
    const phone = '918708493016';
    const defaultText = 'Hi Robins, I have a question from your portfolio';
    const text = userMessage 
      ? `Hi Robins, I have a question: ${userMessage}`
      : defaultText;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
}

export const chatbotService = new ChatbotService();
export default chatbotService;
