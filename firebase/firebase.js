// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH6r-6KDvL_yhY_p8A4UMlZg8qNaWtwM0",
  authDomain: "recipe-pro-39e05.firebaseapp.com",
  projectId: "recipe-pro-39e05",
  storageBucket: "recipe-pro-39e05.appspot.com",
  messagingSenderId: "1005860987107",
  appId: "1:1005860987107:web:cb6d9a7d504c37d25065d6",
  measurementId: "G-QPKLJN6PS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);