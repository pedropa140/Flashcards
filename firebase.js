// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebase } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirebase(app);

export {db}