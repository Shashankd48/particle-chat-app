import { useEffect, useState, useContext, Fragment } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import { useMediaQuery } from "@mui/material";
import { DrawerContext } from "../contexts/DrawerContextProvider";
import { CLOSE, TOGGLE } from "../actions/drawerActions";

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
   ({ theme, open }) => ({
      flexGrow: 1,
      //   padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
         transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
         }),
         marginLeft: 0,
      }),
   })
);

const DrawerHeader = styled("div")(({ theme }) => ({}));

export default function NewSidebar({ children }) {
   const matches = useMediaQuery("(max-width:758px)");
   const { drawer, dispatch } = useContext(DrawerContext);

   useEffect(() => {
      dispatch({
         type: TOGGLE,
         payload: {
            isOpen: !matches,
         },
      });
   }, [matches]);

   return (
      <Box sx={{ display: "flex", zIndex: -10 }}>
         <Drawer
            sx={{
               width: drawerWidth,
               flexShrink: 0,
               "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                  height: "fit-content",
                  zIndex: 0,
               },
            }}
            variant="permanent"
            anchor="left"
            open={drawer.isOpen}
         >
            <div>
               <SidebarHeader />
            </div>
            {drawer.isOpen && (
               <Fragment>
                  <Divider />
                  <Sidebar />
               </Fragment>
            )}
         </Drawer>
         <Main open={drawer.isOpen}>{children}</Main>
      </Box>
   );
}
