import { useRouter } from "next/router";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@mui/material";
import {
   Chat as ChatIcon,
   MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SidebarHeader = () => {
   const router = useRouter();
   const logout = () => auth.signOut();
   const [user] = useAuthState(auth);

   return (
      <Header>
         <UserAvatar
            onClick={logout}
            src={user?.photoURL}
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
   );
};

export default SidebarHeader;

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

const IconsContainer = styled.div``;
