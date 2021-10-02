import { useEffect, useContext, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import { useMediaQuery } from "@mui/material";
import { DrawerContext } from "../contexts/DrawerContextProvider";
import { TOGGLE } from "../actions/drawerActions";

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
   ({ theme, open }) => ({
      flexGrow: 1,
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

export default function Base({ children }) {
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
            <DrawerHeader>
               <SidebarHeader />
            </DrawerHeader>
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
