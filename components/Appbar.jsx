import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { DrawerContext } from "../contexts/DrawerContextProvider";
import { OPEN } from "../actions/drawerActions";
import { useAuthState } from "react-firebase-hooks/auth";

const Appbar = () => {
   const { drawer, dispatch } = useContext(DrawerContext);

   const handleDrawerOpen = () => {
      dispatch({ type: OPEN });
   };

   return (
      <Container>
         {!drawer.isOpen && (
            <IconButton onClick={handleDrawerOpen}>
               <MenuIcon />
            </IconButton>
         )}

         <Title>Particle Chat</Title>
      </Container>
   );
};

export default Appbar;

const Container = styled.div`
   position: sticky;
   background-color: #ffffff;
   z-index: 10;
   top: 0;
   display: flex;
   padding: 11px;
   width: 100%;
   height: 80px;
   align-items: center;
   border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
   font-size: 1.6rem;
   font-weight: 700;
   background: -webkit-linear-gradient(#573dfa, #d62dd1);
   background-clip: text;
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
`;
