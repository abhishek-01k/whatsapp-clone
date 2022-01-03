// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6KDcrubLwGQjpUjb-MifSnCuXUnoWeSc",
  authDomain: "whatsappclone-373ac.firebaseapp.com",
  projectId: "whatsappclone-373ac",
  storageBucket: "whatsappclone-373ac.appspot.com",
  messagingSenderId: "1072178554920",
  appId: "1:1072178554920:web:31cc1322e0b35021a66d1d"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db,auth,provider};
