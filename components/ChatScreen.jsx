import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import {
   MoreVert as MoreVertIcon,
   AttachFile as AttachFileIcon,
   InsertEmoticon as InsertEmoticonIcon,
   Mic as MicIcon,
} from "@material-ui/icons";

const ChatScreen = ({ chat, messages }) => {
   const [user] = useAuthState(auth);
   const router = useRouter();

   const ShowMessages = () => {};

   return (
      <Container>
         <Header>
            <Avatar />

            <HeaderInformation>
               <h3>Rec Email</h3>
               <p>last seen...</p>
            </HeaderInformation>

            <HeaderIcons>
               <IconButton>
                  <AttachFileIcon />
               </IconButton>

               <IconButton>
                  <MoreVertIcon />
               </IconButton>
            </HeaderIcons>
         </Header>

         <MessageContainer>
            {/*TODO: Messages Container */}

            <EndOfMessage />
         </MessageContainer>

         <InputContainer>
            <IconButton>
               <InsertEmoticonIcon />
            </IconButton>

            <Input />

            <IconButton>
               <MicIcon />
            </IconButton>
         </InputContainer>
      </Container>
   );
};

export default ChatScreen;

const Container = styled.div``;

const Input = styled.input`
   flex: 1;
   outline: none;
   padding: 15px 20px;
   position: sticky;
   bottom: 0;
   background-color: #fff;
   margin: 0 15px;
   border-radius: 5px;
   border: none;
   font-size: 16px;
`;

const InputContainer = styled.form`
   display: flex;
   align-items: center;
   padding: 10px;
   position: sticky;
   bottom: 0;
   background-color: whitesmoke;
   z-index: 100;
`;

const Header = styled.div`
   position: sticky;
   background-color: whitesmoke;
   z-index: 10;
   top: 0;
   display: flex;
   padding: 11px;
   height: 80px;
   align-items: center;
   border: 2px solid whitesmoke;
`;

const HeaderInformation = styled.div`
   margin-left: 15px;
   flex: 1;
   > h3 {
      margin: 0;
      margin-bottom: 2px;
   }
   > p {
      font-size: 14px;
      margin: 0;
   }
`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
   padding: 30px;
   background-color: #e5ded8;
   min-height: 90vh;
`;

const HeaderIcons = styled.div``;
