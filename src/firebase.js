import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm7xL69jRjFnQnbyt2mZ0RRQHbe3amd5c",
  authDomain: "p-login-and-registration.firebaseapp.com",
  projectId: "p-login-and-registration",
  storageBucket: "p-login-and-registration.appspot.com",
  messagingSenderId: "580987954794",   
  appId: "1:580987954794:web:e3b4cb6f96f13975780c13"              
}
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

