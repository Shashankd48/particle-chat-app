import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getChatById, getMessagesByChatId } from "../../functions/chats";
import Titlebar from "../../components/Titlebar";
import NewSidebar from "../../components/NewSidebar";
import { Fragment } from "react";

const Chat = ({ chat, messages, recipientUser }) => {
   const [user] = useAuthState(auth);

   const MainContent = () => {
      return (
         <Fragment>
            <Titlebar title={`Chat with ${chat.users[1]}`} />

            <ChatContainer>
               <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
         </Fragment>
      );
   };

   return <NewSidebar> {MainContent()} </NewSidebar>;

   return (
      <Container>
         <Titlebar title={`Chat with ${chat.users[1]}`} />

         <Sidebar />

         <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
         </ChatContainer>
      </Container>
   );
};
export default Chat;

export async function getServerSideProps(context) {
   const chat = await getChatById(context.query.id);

   const messages = await getMessagesByChatId(context.query.id);

   return {
      props: {
         chat,
         messages: JSON.stringify(messages),
      },
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
