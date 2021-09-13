import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export async function getMessagesByChatId(chatId) {
   const q = query(collection(db, "messages"), where("chatId", "==", chatId));
   const querySnapshot = await getDocs(q);
   let messages = [];
   querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
   });
   return messages;
}
