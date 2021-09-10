import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDqlT3CMYN10P0oUhU9bNY2VotKWW_tNNs",
   authDomain: "whatsapp-next-v2-5a63e.firebaseapp.com",
   projectId: "whatsapp-next-v2-5a63e",
   storageBucket: "whatsapp-next-v2-5a63e.appspot.com",
   messagingSenderId: "448873639935",
   appId: "1:448873639935:web:bb2d36bc46cf1057d7c1ca",
   measurementId: "G-30RHLZGEMW",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
