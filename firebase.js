import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import Firebase Auth

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "flashcardsaas-10d04.firebaseapp.com",
  projectId: "flashcardsaas-10d04",
  storageBucket: "flashcardsaas-10d04.appspot.com",
  messagingSenderId: "1010657508733",
  appId: "1:1010657508733:web:3f56bec152191b377ae014",
  measurementId: "G-XDXGLFW44W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Firebase Auth

export { db, auth };