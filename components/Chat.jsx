import { Avatar } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { getUserByEmail } from "../functions/users";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import {
   query,
   collection,
   where,
   getDoc,
   doc,
   getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const Chat = ({ id, profile }) => {
   //    const [user] = useAuthState(auth);

   return (
      <Container>
         {profile && (
            <Fragment>
               <UserAvatar src={profile.photoURL} />
               <Title>{profile.name}</Title>
            </Fragment>
         )}
      </Container>
   );
};

export default Chat;

const Title = styled.p`
   font-size: 16px;
   font-weight: 500;
`;

const UserAvatar = styled(Avatar)`
   margin: 5px;
   margin-right: 15px;
`;

const Container = styled.div`
   display: flex;
   align-items: center;
   cursor: pointer;
   padding: 5px 10px;
   word-wrap: break-word;
   transition: background-color 200ms ease-in;
   :hover {
      background-color: #e9eaeb;
   }
`;
