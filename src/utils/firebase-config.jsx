import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYfSt_Xdw1iVDro7tpQtTG85T-8y7QZac",
  authDomain: "netflix-ver2-2a827.firebaseapp.com",
  projectId: "netflix-ver2-2a827",
  storageBucket: "netflix-ver2-2a827.appspot.com",
  messagingSenderId: "819337186948",
  appId: "1:819337186948:web:ab598b66c25b995e72bcd1",
  measurementId: "G-6W2PY2B0ZB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

export const db = getFirestore(app);
