// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY02FNoqjOYnwxSkySLGRGm_bPV1cILkg",
  authDomain: "sodeico-recrutement.firebaseapp.com",
  projectId: "sodeico-recrutement",
  storageBucket: "sodeico-recrutement.firebasestorage.app",
  messagingSenderId: "41966443364",
  appId: "1:41966443364:web:727202390aac89701b7871",
  measurementId: "G-DHPZVBYZMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);