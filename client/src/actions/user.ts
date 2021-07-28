import { ChatPartial } from "./chatPartial";
import { ActionTypes } from "./types";
import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";

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
  payload: string;
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

export const createUser = (newUser: Credentials, formData?: FormData) => {
  return async (dispatch: Dispatch<CreateUserAction>) => {
    try {
      if (REACT_APP_SERVER_URL) {
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
      } else {
        throw new Error("No SERVER URL FOUND");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
