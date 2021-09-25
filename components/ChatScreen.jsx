import { useEffect, useState } from "react";
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
import {
   doc,
   setDoc,
   Timestamp,
   addDoc,
   collection,
   query,
   where,
   onSnapshot,
   orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
   const [user] = useAuthState(auth);
   const router = useRouter();
   const [input, setInput] = useState("");
   const [messagesSnapshot, setMessagesSnapshot] = useState([]);
   const [recipientProfile, setRecipientProfile] = useState({
      name: "",
      photoURL: "",
      email: "",
      lastSeen: "",
   });

   const getMessagesSnapshot = () => {
      const q = query(
         collection(db, "messages"),
         where("chatId", "==", router.query.id),
         orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const messages = [];

         querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
         });

         setMessagesSnapshot(messages);
      });
   };

   const getRecipientSnapsShot = (recipientEmail) => {
      const q = query(
         collection(db, "users"),
         where("email", "==", recipientEmail)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         let user;

         querySnapshot.forEach((doc) => {
            user = { id: doc.id, ...doc.data() };
         });

         user = { ...user, lastSeen: user.lastSeen.toDate().getTime() };

         setRecipientProfile(user);
      });
   };

   useEffect(() => {
      if (user && chat) {
         const recipientEmail = getRecipientEmail(chat.users, user);

         console.log("log: recipientEmail", recipientEmail);
         getRecipientSnapsShot(recipientEmail);
      }
   }, [chat, user]);

   useEffect(() => {
      if (typeof window !== "undefined") {
         getMessagesSnapshot();
         return;
      }
   }, [messages]);

   const ShowMessages = () => {
      if (messagesSnapshot.length > 0) {
         return messagesSnapshot.map((message) => (
            <Message message={message} key={message.id} user={message.user} />
         ));
      } else {
         return JSON.parse(messages).map((message) => (
            <Message message={message} key={message.id} user={message.user} />
         ));
      }
   };

   const sendMessage = async (e) => {
      e.preventDefault();

      //Add message to messages collection with chatId
      await addDoc(collection(db, "messages"), {
         user: user.email,
         timestamp: Timestamp.now(),
         photoURL: user.photoURL,
         name: user.displayName,
         chatId: router.query.id,
         message: input,
      });

      // update user lastSeen
      await setDoc(
         doc(db, "users", user.uid),
         {
            lastSeen: Timestamp.now(),
         },
         {
            merge: true,
         }
      );

      setInput("");
   };

   return (
      <Container>
         <Header>
            {recipientProfile ? (
               <Avatar alt="User's Avatar" src={recipientProfile.photoURL} />
            ) : (
               <Avatar alt="User's Avatar">
                  {chat.users[1][0].toUpperCase()}
               </Avatar>
            )}

            <HeaderInformation>
               <h3>
                  {recipientProfile ? recipientProfile.name : chat.users[1]}
               </h3>
               {recipientProfile ? (
                  <p>
                     Last active:{" "}
                     {recipientProfile.lastSeen ? (
                        <TimeAgo datetime={recipientProfile.lastSeen} />
                     ) : (
                        "Unavailable"
                     )}{" "}
                  </p>
               ) : (
                  ""
               )}
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
            {ShowMessages()}

            <EndOfMessage />
         </MessageContainer>

         <InputContainer>
            <IconButton>
               <InsertEmoticonIcon />
            </IconButton>

            <Input
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Enter message here..."
            />
            <button
               hidden
               disabled={!input}
               onClick={sendMessage}
               type="submit"
            >
               Send Message
            </button>

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
