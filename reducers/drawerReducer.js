import { OPEN, CLOSE } from "../actions/drawerActions";

const initialState = {
   open: true,
};

export const drawerReducer = (state = initialState, action) => {
   switch (action.type) {
      case OPEN:
         return { ...state, open: action.payload };

      case CLOSE:
         return { ...state, open: action.payload };

      default:
         return state;
   }
};
