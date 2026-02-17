import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfrhOh-WMSocmpd3i0Rbf6p0j9aRHJb3I",
  authDomain: "fitness-app-f51b2.firebaseapp.com",
  projectId: "fitness-app-f51b2",
  storageBucket: "fitness-app-f51b2.firebasestorage.app",
  messagingSenderId: "587830951749",
  appId: "1:587830951749:web:e31ad2ffd756a27bbec82c",
  measurementId: "G-QB5ZD0RY0L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
