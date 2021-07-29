import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AuthPayload, ActionTypes, ChatPartial } from "./index";

const { REACT_APP_SERVER_URL } = process.env;

export interface User {
  id: number;
  userName: string;
  passWord: string;
  chats: ChatPartial[];
  imageUrl: string;
  createdAt: Date;
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
  payload: number;
}

export interface AddChatPartialAction {
  type: ActionTypes.addChatPartial;
  payload: ChatPartial;
}

export interface DeleteChatPartialAction {
  type: ActionTypes.deleteChatPartial;
  payload: number;
}

export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: User;
}

export const addChatPartial = (newChat: ChatPartial): AddChatPartialAction => {
  return {
    type: ActionTypes.addChatPartial,
    payload: newChat,
  };
};

export const deleteChatPartial = (id: number): DeleteChatPartialAction => {
  return {
    type: ActionTypes.deleteChatPartial,
    payload: id,
  };
};

export const fetchUser = (userInfo: AuthPayload, errorCallback: Function) => {
  return async (dispatch: Dispatch<FetchUserAction>) => {
    try {
      if (!REACT_APP_SERVER_URL) {
        throw new Error("No SERVER URL FOUND");
      }

      const response = await axios.get<
        AuthPayload,
        AxiosResponse<{ user: User }>
      >(`${REACT_APP_SERVER_URL}/users/${userInfo.userName}`);

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
  errorCallback: Function,
  successCallback: Function,
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
      >(`${REACT_APP_SERVER_URL}/auth/signup`, newUser);

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
  errorCallback: Function,
  successCallback: Function
) => {
  return async (dispatch: Dispatch<LoginUserAction>) => {
    try {
      if (!REACT_APP_SERVER_URL) {
        throw new Error("No SERVER URL FOUND");
      }

      const response = await axios.post<
        Credentials,
        AxiosResponse<{ token: string; user: User }>
      >(`${REACT_APP_SERVER_URL}/auth/login`, userCredentials);

      // store token locally
      localStorage.setItem("jwtToken", response.data.token);

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
