import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAm7xL69jRjFnQnbyt2mZ0RRQHbe3amd5c",
  authDomain: "p-login-and-registration.firebaseapp.com",
  projectId: "p-login-and-registration",
  storageBucket: "p-login-and-registration.firebasestorage.app",
  messagingSenderId: "580987954794",
  appId: "1:580987954794:web:e3b4cb6f96f13975780c13",
  measurementId: "G-7SBXDKVH87"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth with session persistence
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Auth persistence error:", err);
});

// ✅ Firestore + Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
