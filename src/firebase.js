// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeWfqfgArnYbSLHBUKji81U7si2loBeE4",
  authDomain: "bestresonsiblegroup.firebaseapp.com",
  projectId: "bestresonsiblegroup",
  storageBucket: "bestresonsiblegroup.firebasestorage.app",
  messagingSenderId: "534273512139",
  appId: "1:534273512139:web:54d9190932acf15b0a014e",
  measurementId: "G-HHNHD81KJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Analytics conditional on browser support
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
