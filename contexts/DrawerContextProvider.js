import { createContext, useReducer, useEffect } from "react";
import { drawerReducer } from "../reducers/DrawerReducer";

export const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
   const [drawer, dispatch] = useReducer(drawerReducer, {
      open: window.innerWidth < 758 ? false : true,
   });

   return (
      <DrawerContext.Provider value={{ drawer, dispatch }}>
         {children}
      </DrawerContext.Provider>
   );
};

export default DrawerContextProvider;
