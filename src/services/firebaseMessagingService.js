import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc, onSnapshot, orderBy } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyExample",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-10ac6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-10ac6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-10ac6.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "551135277440",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:551135277440:web:1234567890"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization warning:', error.message);
}

// ====================================
// CONTACT FORM SERVICE (Frontend)
// ====================================

/**
 * Submit a new contact form message
 */
export const submitContactMessage = async (messageData) => {
  if (!db) {
    console.error('Firestore not initialized');
    throw new Error('Database not available');
  }

  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      name: messageData.name,
      email: messageData.email,
      message: messageData.message,
      subject: messageData.subject || 'No Subject',
      status: 'unread',
      timestamp: new Date(),
      createdAt: new Date().toISOString(),
      read: false,
      readAt: null
    });

    console.log('Message submitted with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting message:', error);
    throw error;
  }
};

// ====================================
// ADMIN MESSAGES SERVICE
// ====================================

/**
 * Fetch all messages (used for admin panel)
 */
export const fetchAllMessages = async () => {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }

  try {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const messages = [];

    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

/**
 * Real-time listener for messages (Admin Panel)
 * Returns unsubscribe function
 */
export const onMessagesChange = (callback) => {
  if (!db) {
    console.error('Firestore not initialized');
    return () => {};
  }

  try {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(messages);
    }, (error) => {
      console.error('Error in real-time listener:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up real-time listener:', error);
    return () => {};
  }
};

/**
 * Mark message as read
 */
export const markMessageAsRead = async (messageId) => {
  if (!db) {
    console.error('Firestore not initialized');
    throw new Error('Database not available');
  }

  try {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
      status: 'read',
      read: true,
      readAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

/**
 * Delete a message
 */
export const deleteMessage = async (messageId) => {
  if (!db) {
    console.error('Firestore not initialized');
    throw new Error('Database not available');
  }

  try {
    await deleteDoc(doc(db, 'messages', messageId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

/**
 * Get message statistics
 */
export const getMessageStats = async () => {
  if (!db) {
    return { total: 0, unread: 0, read: 0 };
  }

  try {
    const allMessages = await fetchAllMessages();
    const total = allMessages.length;
    const unread = allMessages.filter(m => m.status === 'unread' || !m.read).length;
    const read = total - unread;

    return { total, unread, read };
  } catch (error) {
    console.error('Error getting message stats:', error);
    return { total: 0, unread: 0, read: 0 };
  }
};

export { db, app };
