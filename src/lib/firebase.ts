// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "portfolio-gen-8dcea.firebaseapp.com",
  projectId: "portfolio-gen-8dcea",
  storageBucket: "portfolio-gen-8dcea.appspot.com",
  messagingSenderId: "176504407096",
  appId: "1:176504407096:web:c43bdccd2087f2d90ad2cd",
  measurementId: "G-L22H2VE3E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, GoogleAuthProvider, signInWithPopup };