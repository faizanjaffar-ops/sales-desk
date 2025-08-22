// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoUIxU2wwMPq-VV14ukBpPD_3Kn6-MbjY",
  authDomain: "sales-desk-7ca0f.firebaseapp.com",
  projectId: "sales-desk-7ca0f",
  storageBucket: "sales-desk-7ca0f.firebasestorage.app",
  messagingSenderId: "84617400821",
  appId: "1:84617400821:web:3c65afbfa593a4e5d510bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
