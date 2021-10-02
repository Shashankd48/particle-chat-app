import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import { getChatById, getMessagesByChatId } from "../../functions/chats";
import Titlebar from "../../components/Titlebar";
import Base from "../../components/Base";
import { Fragment } from "react";

const Chat = ({ chat, messages }) => {
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

   return <Base> {MainContent()} </Base>;
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
