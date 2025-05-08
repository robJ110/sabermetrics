// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDoc, getDocs, addDoc, Timestamp, doc, updateDoc, increment, setDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot, runTransaction } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6WVsOXssm3GK9YDm5QdCPtAJ3dK-YpEc",
    authDomain: "sabermetrics110.firebaseapp.com",
    projectId: "sabermetrics110",
    storageBucket: "sabermetrics110.firebasestorage.app",
    messagingSenderId: "121208602850",
    appId: "1:121208602850:web:60dfd4da4b21a414845ebb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, getDoc, getDocs, Timestamp, addDoc, doc, updateDoc, increment,setDoc };
export { query, orderBy, limit, where, onSnapshot, runTransaction };