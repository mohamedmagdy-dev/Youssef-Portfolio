import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlDJ1n2LNvbhYWJ69crIJo1fDWUtgByDk",
  authDomain: "yossef-profile.firebaseapp.com",
  projectId: "yossef-profile",
  storageBucket: "yossef-profile.appspot.com",
  messagingSenderId: "122998428942",
  appId: "1:122998428942:web:b7e2c56e7ca68896e6b35f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);