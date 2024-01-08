import {
  SET_LOADING,
  SET_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === SET_USER) {
    return {
      ...state,
    };
  }
  throw new Error(`no such action : ${action}`);
};

export default reducer;
