import { db } from "../firebase";
import {
   query,
   collection,
   where,
   getDoc,
   doc,
   getDocs,
} from "firebase/firestore";

export async function getUserByEmail(userEmail) {
   const q = query(collection(db, "users"), where("email", "==", userEmail));
   const querySnapshot = await getDocs(q);
   let user;
   querySnapshot.forEach((doc) => {
      user = doc.data();
   });
   return user;
}

export async function getUsersByEmails(usersEmail) {
   const q = query(collection(db, "users"), where("email", "in", usersEmail));
   const querySnapshot = await getDocs(q);
   let users = [];
   querySnapshot.forEach((doc) => {
      users.push(doc.data());
   });
   return users;
}
