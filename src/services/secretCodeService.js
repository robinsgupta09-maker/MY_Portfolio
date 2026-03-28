// Secret codes configuration
const SECRET_CODES = {
  muskan: {
    name: 'muskan',
    message: 'I Love You, Muskan! 💕',
    subtitle: 'Welcome to the hidden realm...',
    description: 'This secret message is just for you! You found the easter egg hidden deep in my portfolio. This shows how special you are to me! 🌸',
    extraDetails: 'Thank you for being the most amazing person in my life. Every moment with you is precious! ✨',
  },
  admin: {
    name: 'admin',
    message: 'Admin Portal Detected! 🔐',
    subtitle: 'Authorized access only...',
    description: 'You have found the admin access portal!',
  },
};

let typedSequence = '';
let resetTimer = null;
let onSecretFoundCallback = null;
let isListening = false;

// Log to both console and a global variable for debugging
window.__secretDebug = {
  typedSequence: '',
  lastKey: '',
  eventsFired: 0,
};

const handleKeyDown = (e) => {
  window.__secretDebug.eventsFired++;
  window.__secretDebug.lastKey = e.key;
  
  const key = e.key.toLowerCase();

  // Only letters (a-z)
  if (/^[a-z]$/.test(key)) {
    typedSequence += key;
    window.__secretDebug.typedSequence = typedSequence;
    
    console.log('📝 Key pressed:', key);
    console.log('🔤 Sequence:', typedSequence);

    // Keep only last 20 characters
    if (typedSequence.length > 20) {
      typedSequence = typedSequence.slice(-20);
    }

    // Clear previous reset timer
    clearTimeout(resetTimer);

    // Check all secret codes
    for (const [secretCode, data] of Object.entries(SECRET_CODES)) {
      if (typedSequence.includes(secretCode)) {
        console.log('🎉🎉🎉 FOUND SECRET:', secretCode);
        console.log('📢 Calling callback...');
        if (onSecretFoundCallback) {
          onSecretFoundCallback(data);
        }
        typedSequence = '';
        window.__secretDebug.typedSequence = '';
        return;
      }
    }

    // Reset after 5 seconds of inactivity
    resetTimer = setTimeout(() => {
      console.log('⏱️ Reset - no activity');
      typedSequence = '';
      window.__secretDebug.typedSequence = '';
    }, 5000);
  }
};

const secretCodeService = {
  init(callback) {
    console.log('✅ INITIALIZING SECRET CODE SERVICE');
    console.log('📞 Callback:', callback ? '✓ Provided' : '✗ Missing');
    
    isListening = true;
    onSecretFoundCallback = callback;
    
    // Add listener
    document.addEventListener('keydown', handleKeyDown);
    console.log('✅ Event listener added');
    
    // Global debug access
    window.__secretCodeDebug = {
      sequence: () => window.__secretDebug.typedSequence,
      reset: () => { typedSequence = ''; window.__secretDebug.typedSequence = ''; },
      status: () => ({ isListening, typedSequence, eventsFired: window.__secretDebug.eventsFired })
    };
    
    console.log('💡 Debug commands:');
    console.log('  window.__secretCodeDebug.sequence()     - Get typed sequence');
    console.log('  window.__secretCodeDebug.status()       - Get status');
    console.log('  window.__secretCodeDebug.reset()        - Reset sequence');
  },

  destroy() {
    console.log('🛑 Destroying secret code service');
    document.removeEventListener('keydown', handleKeyDown);
    clearTimeout(resetTimer);
    isListening = false;
  },
};

export default secretCodeService;
