import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  initializeAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATIBdijk5Eo4izheoXtnin6Jhm4aO9Ln8",
  authDomain: "altlens.firebaseapp.com",
  projectId: "altlens",
  storageBucket: "altlens.firebasestorage.app",
  messagingSenderId: "168795519410",
  appId: "1:168795519410:web:f97e654c75580ee8a98cab",
  measurementId: "G-W83GT2RKY8"
};

const app = initializeApp(firebaseConfig);

// Initialize auth without persistence option
const auth = initializeAuth(app);

export { auth };
export const db = getFirestore(app);

// Auth utility functions for Expo/React Native

// Create user with email and password
export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Listen for auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Google sign-in (Expo/React Native)
export const signInWithGoogle = async (idToken: string) => {
  const credential = GoogleAuthProvider.credential(idToken);
  try {
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
