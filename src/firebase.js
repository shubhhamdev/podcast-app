// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4BuZq_RrgQUnFKvJnsHFyJQFSRIt_eN8",
  authDomain: "podcast-project-frontend.firebaseapp.com",
  projectId: "podcast-project-frontend",
  storageBucket: "podcast-project-frontend.appspot.com",
  messagingSenderId: "282746668600",
  appId: "1:282746668600:web:eed8065d7157110677c8cd",
  measurementId: "G-85FRT72PZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
