import produce from "immer";
import {
  GET_USERS_LIST_SUCCESS,
  CHANGE_USER_ACTIVE_PAGE,
} from "./constant";

const initialState = {
  usersList: [],
  userActivePage: 1,
  
};

const Users = produce((state, action) => {
  switch (action.type) {
    case GET_USERS_LIST_SUCCESS:
      state.usersList = action.payload;
      break;
    case CHANGE_USER_ACTIVE_PAGE:
      state.userActivePage = action.payload;
      break;
  
    default:
  }
}, initialState);

export default Users;
