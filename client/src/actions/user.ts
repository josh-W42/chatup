import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import setAuthToken from "../util/setAuthToken";
import { AuthPayload, ActionTypes, ChatPartial } from "./index";

const { REACT_APP_SERVER_URL } = process.env;

export interface User {
  id: string;
  userName: string;
  passWord: string;
  chats: ChatPartial[];
  imageUrl: string;
  createdAt: number;
}

export interface Credentials {
  userName: string;
  passWord: string;
}

export interface CreateUserAction {
  type: ActionTypes.createUser;
  payload: User;
}

export interface LoginUserAction {
  type: ActionTypes.loginUser;
  payload: User;
}

export interface DeleteUserAction {
  type: ActionTypes.deleteUser;
  payload: string;
}

export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: User;
}

export const fetchUser = (userInfo: AuthPayload, errorCallback: () => void) => {
  return async (dispatch: Dispatch<FetchUserAction>) => {
    try {
      if (!REACT_APP_SERVER_URL) {
        throw new Error("No SERVER URL FOUND");
      }

      const response = await axios.get<
        AuthPayload,
        AxiosResponse<{ user: User }>
      >(`${REACT_APP_SERVER_URL}users/${userInfo.userName}`);

      if (!response.data.user) {
        throw new Error("User No Returned");
      }

      dispatch<FetchUserAction>({
        type: ActionTypes.fetchUser,
        payload: response.data.user,
      });
    } catch (error) {
      console.error(error);
      errorCallback();
    }
  };
};

export const createUser = (
  newUser: Credentials,
  errorCallback: () => void,
  successCallback: () => void,
  formData?: FormData
) => {
  return async (dispatch: Dispatch<CreateUserAction>) => {
    try {
      if (!REACT_APP_SERVER_URL) {
        throw new Error("No SERVER URL FOUND");
      }

      const response = await axios.post<
        Credentials,
        AxiosResponse<{ created: User }>
      >(`${REACT_APP_SERVER_URL}auth/signup`, newUser);

      /*
        TODO - Access another route for updating a profile picture
        axios.put<
          User,
          AxiosResponse<{ imageUrl: string }>
        >(`${REACT_APP_SERVER_URL}/users/changeProfile`, newUser, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      */

      dispatch<CreateUserAction>({
        type: ActionTypes.createUser,
        payload: response.data.created,
      });

      successCallback();
    } catch (error) {
      console.error(error);
      errorCallback();
    }
  };
};

export const loginUser = (
  userCredentials: Credentials,
  errorCallback: () => void,
  successCallback: () => void
) => {
  return async (dispatch: Dispatch<LoginUserAction>) => {
    try {
      if (!REACT_APP_SERVER_URL) {
        throw new Error("No SERVER URL FOUND");
      }

      const response = await axios.post<
        Credentials,
        AxiosResponse<{ token: string; user: User }>
      >(`${REACT_APP_SERVER_URL}auth/login`, userCredentials);

      // store token locally
      localStorage.setItem("jwtToken", response.data.token);
      setAuthToken(response.data.token);

      dispatch<LoginUserAction>({
        type: ActionTypes.loginUser,
        payload: response.data.user,
      });

      successCallback();
    } catch (error) {
      console.error(error);
      errorCallback();
    }
  };
};
