// // firebase.js
// import { initializeApp } from 'firebase/app';
// import { 
//   getAuth, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup
// } from 'firebase/auth';

// // Initialize Firebase - Replace with your config
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const handleAuthError = (error) => {
//   const errorMessages = {
//     'auth/invalid-email': 'Invalid email format. Please try again.',
//     'auth/user-disabled': 'This account has been disabled. Please contact support.',
//     'auth/user-not-found': 'No account found with this email. Please sign up.',
//     'auth/wrong-password': 'Incorrect password. Please try again.',
//     'auth/email-already-in-use': 'This email is already in use. Please sign in.',
//     'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
//     'auth/internal-error': 'An internal error occurred. Please try again later.',
//     'auth/popup-closed-by-user': 'Google sign-in was cancelled. Please try again.',
//     'auth/cancelled-popup-request': 'The sign-in process was cancelled. Please try again.',
//     'auth/popup-blocked': 'The sign-in popup was blocked by your browser. Please allow popups and try again.',
//   };

//   return {
//     code: error.code || 'unknown',
//     message: errorMessages[error.code] || 'An unknown error occurred. Please try again.',
//   };
// };

// export const signUpWithEmail = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     console.error('Sign-up error:', error);
//     return { success: false, error: handleAuthError(error) };
//   }
// };

// export const signInWithEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     console.error('Sign-in error:', error);
//     return { success: false, error: handleAuthError(error) };
//   }
// };

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     return { success: true, user: result.user };
//   } catch (error) {
//     console.error('Google sign-in error:', error);
//     return { success: false, error: handleAuthError(error) };
//   }
// };