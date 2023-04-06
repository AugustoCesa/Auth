// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCmwmUXGAkpQBXP-UvkDvvTkQNlql-1FYw",
  authDomain: "authbox-f04e4.firebaseapp.com",
  databaseURL: "https://authbox-f04e4-default-rtdb.firebaseio.com",
  projectId: "authbox-f04e4",
  storageBucket: "authbox-f04e4.appspot.com",
  messagingSenderId: "25256592367",
  appId: "1:25256592367:web:2d9358bf2d67b6582bac1a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()
