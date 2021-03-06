import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@mui/icons-material";
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
import AddContact from "./AddContact";

const Sidebar = () => {
   const [user] = useAuthState(auth);
   const [chatList, setChatList] = useState([]);
   const [usersProfile, setUsersProfile] = useState([]);
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

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      setError({ isError: false, message: "" });
   };

   const chatAlreadyExist = (recipientEmail) =>
      chatList.filter((chat) => chat.users.includes(recipientEmail)).length > 0
         ? true
         : false;

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
         <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
         </Search>

         <ActionContainer>
            <button
               className="custom-btn btn-8"
               onClick={handleOpen}
               name="Sign In"
               style={{ width: 280 }}
            >
               <span>Start a new chat</span>
            </button>
         </ActionContainer>

         {usersProfile.map((profile) => {
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
   height: calc(100vh - 80px);
   max-height: calc(100vh - 80px);
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

const Search = styled.div`
   display: flex;
   align-items: center;
   padding: 5px;
   border-radius: 2px;
`;

const SearchInput = styled.input`
   outline-width: 0;
   border: none;
   flex: 1;
   margin-left: 5px;
   padding: 15px 10px;
   border: 2px solid whitesmoke;
`;
