import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import "../axios";
import {
  SET_LOADING,
  SET_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from "./actions";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  user: null,
  name: null,
  email: null,
  type: null,
  classGrade: null,
  subjectExpertise: null,
  language: null,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/users/register`, {
        ...userInput,
      });
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          role: data.user.role,
          email: data.user.email,
          token: data.token,
        })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  // login
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/users/login`, {
        ...userInput,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          role: data.user.role,
          email: data.user.email,
          token: data.token,
        })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
