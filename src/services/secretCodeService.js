/**
 * Secret Code Service - Easter Egg Feature
 * Listens for keyboard input and triggers actions on secret code detection
 */

const SECRET_CODES = {
  muskan: {
    name: 'muskan',
    message: 'You found the secret! 😊',
    subtitle: 'Welcome to the hidden realm...',
  },
  admin: {
    name: 'admin',
    message: 'Admin Portal Detected! 🔐',
    subtitle: 'Authorized access only...',
  },
};

const MAX_INPUT_LENGTH = 20; // Prevent memory overflow
const RESET_TIMEOUT = 5000; // Reset after 5 seconds of inactivity

class SecretCodeService {
  constructor() {
    this.typedInput = '';
    this.resetTimer = null;
    this.listeners = [];
    this.isActive = false;
  }

  /**
   * Start listening for keyboard input
   */
  startListening(onSecretFound) {
    if (this.isActive) return;

    this.isActive = true;
    this.onSecretFound = onSecretFound;

    // Letter keys only (a-z, A-Z)
    const handleKeyPress = (event) => {
      // Ignore input in form fields
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA'
      ) {
        return;
      }

      const key = event.key?.toLowerCase();

      // Only capture alphabetic characters
      if (key && /^[a-z]$/.test(key)) {
        this.typedInput += key;

        // Limit input length
        if (this.typedInput.length > MAX_INPUT_LENGTH) {
          this.typedInput = this.typedInput.slice(-MAX_INPUT_LENGTH);
        }

        // Check if any secret code matches
        this.checkForSecretCode();

        // Reset timer
        this.resetOnTimeout();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    this.keyPressListener = handleKeyPress;
  }

  /**
   * Check if typed input contains any secret code
   */
  checkForSecretCode() {
    for (const [code, data] of Object.entries(SECRET_CODES)) {
      if (this.typedInput.includes(code)) {
        this.onSecretFound?.(data);
        this.resetInput();
        return;
      }
    }
  }

  /**
   * Reset typed input after timeout of inactivity
   */
  resetOnTimeout() {
    clearTimeout(this.resetTimer);

    this.resetTimer = setTimeout(() => {
      this.typedInput = '';
    }, RESET_TIMEOUT);
  }

  /**
   * Reset typed input immediately
   */
  resetInput() {
    this.typedInput = '';
    clearTimeout(this.resetTimer);
  }

  /**
   * Stop listening for keyboard input
   */
  stopListening() {
    if (this.keyPressListener) {
      document.removeEventListener('keydown', this.keyPressListener);
    }
    clearTimeout(this.resetTimer);
    this.isActive = false;
    this.typedInput = '';
  }
}

// Export singleton instance
export default new SecretCodeService();
