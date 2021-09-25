import { db } from "../firebase";
import {
   query,
   collection,
   where,
   getDocs,
   getDoc,
   doc,
   orderBy,
   deleteDoc,
} from "firebase/firestore";
import moment from "moment";

export async function getMessagesByChatId(chatId) {
   const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
   );
   const querySnapshot = await getDocs(q);
   let messages = [];
   querySnapshot.forEach((doc) => {
      messages.push({
         id: doc.id,
         ...doc.data(),
         time: moment(new Date(doc.data().timestamp.toDate())).format("LT"),
      });
   });
   return messages;
}

export async function getChatById(id) {
   const ref = doc(db, "chats", id);
   const chatRef = await getDoc(ref);
   return { id: chatRef.id, ...chatRef.data() };
}

export async function deleteMessagesByChatId(chatId) {
   return await deleteDoc(doc(db, "messages", chatId));
}
