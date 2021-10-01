import { OPEN, CLOSE, TOGGLE } from "../actions/drawerActions";

const initialState = {
   isOpen: true,
};

export const drawerReducer = (state = initialState, action) => {
   switch (action.type) {
      case OPEN:
         return { ...state, isOpen: true };

      case CLOSE:
         return { ...state, isOpen: false };

      case TOGGLE:
         return { ...state, isOpen: action.payload.isOpen };

      default:
         return state;
   }
};
