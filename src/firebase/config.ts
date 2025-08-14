import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBQgUrlmUg7USgrnyiaHUMQIFny6dV7EvI",
  authDomain: "wellness-project-738b0.firebaseapp.com",
  projectId: "wellness-project-738b0",
  storageBucket: "wellness-project-738b0.firebasestorage.app",
  messagingSenderId: "76807672857",
  appId: "1:76807672857:web:6f02d11a7605875945c688",
  measurementId: "G-865SBHTV8G"
};

// Add console log for debugging
console.log('🔥 Firebase Config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  currentDomain: window.location.hostname
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
