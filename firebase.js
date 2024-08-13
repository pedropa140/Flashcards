// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFZIf6QFwqy6dPTZKdjuTZaBwDwprFhnw",
  authDomain: "flashcardsaas-f2dc0.firebaseapp.com",
  projectId: "flashcardsaas-f2dc0",
  storageBucket: "flashcardsaas-f2dc0.appspot.com",
  messagingSenderId: "389081140436",
  appId: "1:389081140436:web:fce9211185fa3ff75bff41",
  measurementId: "G-D7QKSJ8NM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);