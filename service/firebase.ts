// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQWZDh495Ctgmgn1iCHzNS_FrPkDRDpFY",
  authDomain: "gifted-chat-6e4a7.firebaseapp.com",
  projectId: "gifted-chat-6e4a7",
  storageBucket: "gifted-chat-6e4a7.appspot.com",
  messagingSenderId: "603364780024",
  appId: "1:603364780024:web:8ff9af3cf2eeb7d85b980d",
  measurementId: "G-8Q15SLRDB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };