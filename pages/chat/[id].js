import styled from "styled-components";
import Head from "next/dist/shared/lib/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import {
   collection,
   doc,
   query,
   where,
   getDocs,
   getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = ({ chat, messages }) => {
   const [user] = useAuthState(auth);
   return (
      <Container>
         <Head>
            <title>Chat with {chat.users[1]}</title>
         </Head>

         <Sidebar />

         <ChatContainer>
            <ChatScreen />
         </ChatContainer>
      </Container>
   );
};
export default Chat;

export async function getServerSideProps(context) {
   const ref = doc(db, "chats", context.query.id);
   const chatRef = await getDoc(ref);
   const chat = { id: chatRef.id, ...chatRef.data() };

   console.log("CHAT ", chat);

   // const messagesRes = await ref
   //    .collection("messages")
   //    .orderBy("timestamp", "acs")
   //    .get();

   // const messages = messagesRes.docs
   //    .map((doc) => ({
   //       id: doc.id,
   //       ...doc.data(),
   //    }))
   //    .map((messages) => ({
   //       ...messages,
   //       timestamp: messages.timestamp.toDate().getTime(),
   //    }));

   // const chatRef

   return {
      props: { chat: chat, messages: [] },
   };
}

const Container = styled.div`
   display: flex;
`;

const ChatContainer = styled.div`
   flex: 1;
   overflow: scroll;
   height: 100vh;

   ::-webkit-scrollbar {
      display: none;
   }
   --ms-overflow-style: none;
   scrollbar-width: none;
`;
