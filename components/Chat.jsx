import { Avatar } from "@material-ui/core";
import { Fragment } from "react";

import styled from "styled-components";

import { useRouter } from "next/router";

const Chat = ({ profile }) => {
   const router = useRouter();

   const enterChat = () => {
      router.push(`/chat/${profile.chatId}`);
   };

   return (
      <Container onClick={enterChat}>
         {profile && (
            <Fragment>
               <UserAvatar src={profile.photoURL} alt="Profile picture" />
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
