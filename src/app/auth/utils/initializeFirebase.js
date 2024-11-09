import { initializeApp } from 'firebase/app';

export const initializeFirebase = (firebaseConfig) => {
  try {
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Firebase initialization error', error.stack);
  }
};
