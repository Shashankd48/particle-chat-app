import { useRouter } from "next/router";
import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import {
   Chat as ChatIcon,
   ChevronLeft as ChevronLeftIcon,
   Logout as LogoutIcon,
} from "@mui/icons-material";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Fragment, useContext } from "react";
import { DrawerContext } from "../contexts/DrawerContextProvider";
import { CLOSE } from "../actions/drawerActions";

const SidebarHeader = () => {
   const router = useRouter();
   const logout = () => auth.signOut();
   const [user] = useAuthState(auth);
   const { dispatch } = useContext(DrawerContext);

   const handleDrawerClose = () => {
      dispatch({ type: CLOSE });
   };

   return (
      <Header>
         {user && (
            <Fragment>
               <UserAvatar src={user.photoURL} alt="Contact picture" />
               <Title onClick={() => router.push("/")}>
                  {user.displayName}
               </Title>
            </Fragment>
         )}

         <IconsContainer>
            <IconButton onClick={logout}>
               <LogoutIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton onClick={handleDrawerClose}>
               <ChevronLeftIcon sx={{ fontSize: 28 }} />
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
