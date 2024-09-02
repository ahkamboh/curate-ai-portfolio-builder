// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "curate-ai-cbb7f.firebaseapp.com",
  projectId: "curate-ai-cbb7f",
  storageBucket: "curate-ai-cbb7f.appspot.com",
  messagingSenderId: "919323812484",
  appId: "1:919323812484:web:6859158b8d1360904318d1",
  measurementId: "G-3MWD4XMPPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, GoogleAuthProvider, signInWithPopup };