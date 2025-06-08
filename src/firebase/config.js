import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVcs413Efkdv9uzV0eihWlOYalqL6UQfk",
  authDomain: "mentorship-af9e5.firebaseapp.com",
  projectId: "mentorship-af9e5",
  storageBucket: "mentorship-af9e5.firebasestorage.app",
  messagingSenderId: "889109398366",
  appId: "1:889109398366:web:76be80442301e3d03645cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();