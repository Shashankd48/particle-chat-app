import { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import {
   Chat as ChatIcon,
   MoreVert as MoreVertIcon,
   Search as SearchIcon,
} from "@material-ui/icons";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import {
   collection,
   addDoc,
   query,
   where,
   onSnapshot,
} from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import { getUserByEmail, getUsersByEmails } from "../functions/users";

const Sidebar = () => {
   const [user] = useAuthState(auth);
   const [chatList, setChatList] = useState([]);
   const [usersProfile, setUsersProfile] = useState([]);

   const getUsersChat = (userEmail) => {
      const q = query(
         collection(db, "chats"),
         where("users", "array-contains", userEmail)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const users = [];

         querySnapshot.forEach((doc) => {
            console.log("log: doc", doc.id);
            users.push({ id: doc.id, users: doc.data().users });
         });

         console.log("log: doc-user", users);
         if (users.length > 0) {
            setChatList(users);
         }
      });
   };

   const getUsersEmailList = (usersList, userLoggedIn) => {
      let usersEmails = [];
      usersList.forEach((chats) => {
         chats.users.forEach((email) => {
            if (email != userLoggedIn.email) {
               usersEmails.push(email);
            }
         });
      });
      return usersEmails;
   };

   const getUsersAccount = async () => {
      let emails = getUsersEmailList(chatList, user);
      let users = await getUsersByEmails(emails);

      // Set chat id for all the users

      let tempProfiles = [];
      users.forEach((user) => {
         let index = chatList.findIndex((chat) =>
            chat.users.includes(user.email)
         );
         if (index != -1)
            tempProfiles.push({ ...user, chatId: chatList[index].id });
      });

      console.log("log: tempProfiles", tempProfiles);

      setUsersProfile(tempProfiles);
   };

   useEffect(() => {
      if (chatList.length > 0) {
         getUsersAccount();
      }
   }, [chatList]);

   useEffect(() => {
      if (user) getUsersChat(user.email);
   }, [user]);

   const createChat = async () => {
      const input = prompt(
         "Please enter an email address for the user you wish to chat with"
      );

      if (!input) return;

      let userAccount = await getUserByEmail(input);
      if (!userAccount) {
         alert("User's account not found!");
         return;
      }

      if (
         EmailValidator.validate(input) &&
         input !== user.email &&
         !chatAlreadyExist(input)
      ) {
         // TODO: We need to add chat into DB 'chats' collection

         try {
            const docRef = await addDoc(collection(db, "chats"), {
               users: [user.email, input],
            });
            console.log("Document written with ID: ", docRef.id);
            return;
         } catch (e) {
            console.error("Error adding document: ", e);
            return;
         }
      }
      alert("Chat already created with this user!");
   };

   const chatAlreadyExist = (recipientEmail) =>
      chatList.filter((chat) => chat.users.includes(recipientEmail)).length > 0
         ? true
         : false;

   return (
      <Container>
         <Header>
            <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />

            <Title>{user.displayName}</Title>

            <IconsContainer>
               <IconButton>
                  <ChatIcon />
               </IconButton>

               <IconButton>
                  <MoreVertIcon />
               </IconButton>
            </IconsContainer>
         </Header>

         <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
         </Search>

         <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

         {/* TODO: List of chats */}
         {usersProfile.map((profile, index) => {
            return (
               <Chat
                  profile={profile}
                  key={profile.chatId}
                  id={profile.chatId}
               />
            );
         })}
      </Container>
   );
};

export default Sidebar;

const Container = styled.div`
   background-color: whitesmoke;
   min-height: 100vh;
   min-width: 290px;
   border-right: 2px solid whitesmoke;
`;

const Title = styled.p`
   font-size: 16px;
   font-weight: 500;
`;

const Header = styled.div`
   display: flex;
   position: sticky;
   top: 0;
   /* background-color: #fff; */
   z-index: 1;
   justify-content: space-between;
   align-items: center;
   padding: 15px;
   height: 80px;
   border-bottom: 3px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
   cursor: pointer;
   :hover {
      opacity: 0.8;
   }
`;

const Search = styled.div`
   display: flex;
   align-items: center;
   padding: 5px;
   border-radius: 2px;
`;

const IconsContainer = styled.div``;

const SearchInput = styled.input`
   outline-width: 0;
   border: none;
   flex: 1;
   margin-left: 5px;
   padding: 15px 10px;
   border: 2px solid whitesmoke;
`;

const SidebarButton = styled(Button)`
   width: 100%;
   &&& {
      border-bottom: 2px solid whitesmoke;
      border-top: 2px solid whitesmoke;
   }
`;
