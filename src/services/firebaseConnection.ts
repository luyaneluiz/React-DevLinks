// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3VT9V0tYhQSYdfo1WI06n4z0Y2MUrtDE",
  authDomain: "reactlinks-626f5.firebaseapp.com",
  projectId: "reactlinks-626f5",
  storageBucket: "reactlinks-626f5.appspot.com",
  messagingSenderId: "1088378241709",
  appId: "1:1088378241709:web:48be5d78bc5260b7507c24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
