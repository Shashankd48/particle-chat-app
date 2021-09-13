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
import { getMessagesByChatId } from "../../functions/chats";

const Chat = ({ chat, messages }) => {
   const [user] = useAuthState(auth);
   return (
      <Container>
         <Head>
            <title>Chat with {chat.users[1]}</title>
         </Head>

         <Sidebar />

         <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
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

   const messages = await getMessagesByChatId(context.query.id);

   console.log("log: ", messages);

   return {
      props: { chat, messages: JSON.stringify(messages) },
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
