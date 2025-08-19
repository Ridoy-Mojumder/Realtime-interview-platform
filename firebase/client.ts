// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCmaxi0dS2xN2RWY_ek-p2eAGWLBQ4pHIM",
  authDomain: "talentai-978a7.firebaseapp.com",
  projectId: "talentai-978a7",
  storageBucket: "talentai-978a7.firebasestorage.app",
  messagingSenderId: "1002767623370",
  appId: "1:1002767623370:web:e1db4cb651ffa739a58033",
  measurementId: "G-W0GFZ1VPQ6"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app)