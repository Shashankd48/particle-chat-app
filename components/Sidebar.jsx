import { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@mui/material";
import {
   Chat as ChatIcon,
   MoreVert as MoreVertIcon,
   Search as SearchIcon,
} from "@mui/icons-material";
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
import { useRouter } from "next/router";
import AddContact from "./AddContact";

const Sidebar = () => {
   const [user] = useAuthState(auth);
   const [chatList, setChatList] = useState([]);
   const [usersProfile, setUsersProfile] = useState([]);
   const router = useRouter();
   const [open, setOpen] = useState(false);
   const [error, setError] = useState({
      isError: false,
      message: "",
   });

   useEffect(() => {
      if (chatList.length > 0) {
         getUsersAccount();
      }
   }, [chatList]);

   useEffect(() => {
      if (user) getUsersChat(user.email);
   }, [user]);

   const getUsersChat = (userEmail) => {
      const q = query(
         collection(db, "chats"),
         where("users", "array-contains", userEmail)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const users = [];

         querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, users: doc.data().users });
         });

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

      setUsersProfile(tempProfiles);
   };

   const handleOpen = () => setOpen(true);

   const handleClose = () => {
      setOpen(false);
      setError({ isError: false, message: "" });
   };

   const chatAlreadyExist = (recipientEmail) =>
      chatList.filter((chat) => chat.users.includes(recipientEmail)).length > 0
         ? true
         : false;

   const logout = () => auth.signOut();

   const addContact = async (email) => {
      if (!email) {
         setError({ isError: true, message: "Please enter you email!" });
         return;
      }

      let userAccount = await getUserByEmail(email);

      if (!userAccount) {
         setError({ isError: true, message: "User's account not found!" });
         return;
      }

      if (
         EmailValidator.validate(email) &&
         email !== user.email &&
         !chatAlreadyExist(email)
      ) {
         try {
            const docRef = await addDoc(collection(db, "chats"), {
               users: [user.email, email],
            });
            setOpen(false);
            return;
         } catch (e) {
            setError({ isError: true, message: "Failed to add contact!" });
            return;
         }
      }
      setError({
         isError: true,
         message: "Chat already created with this user!",
      });
   };

   return (
      <Container>
         <Header>
            <UserAvatar
               onClick={logout}
               src={user.photoURL}
               alt="Contact picture"
            />

            <Title onClick={() => router.push("/")}>{user.displayName}</Title>

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

         <ActionContainer>
            <SidebarButton
               onClick={handleOpen}
               color="primary"
               variant="contained"
            >
               Start a new chat
            </SidebarButton>
         </ActionContainer>

         {usersProfile.map((profile, index) => {
            return (
               <Chat
                  profile={profile}
                  key={profile.chatId}
                  id={profile.chatId}
               />
            );
         })}

         <AddContact
            open={open}
            error={error}
            onClose={handleClose}
            addContact={addContact}
         />
      </Container>
   );
};

export default Sidebar;

const Container = styled.div`
   height: 100vh;
   max-width: 320px;
   min-width: 290px;
   border-right: 2px solid whitesmoke;
   flex: 0.45;
   overflow-y: scroll;

   ::-webkit-scrollbar {
      display: none;
   }
   -ms-overflow-style: none;
   scrollbar-width: none;
`;

const ActionContainer = styled.div`
   display: flex;
   justify-content: center;
   border-bottom: 2px solid whitesmoke;
   padding: 20px 0;
`;

const Title = styled.p`
   font-size: 18px;
   font-weight: 600;
   cursor: pointer;
`;

const Header = styled.div`
   display: flex;
   position: sticky;
   top: 0;
   background-color: #fff;
   z-index: 10;
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
   width: 92%;
`;
