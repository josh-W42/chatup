import { ChatPartial } from "./chatPartial";
import { ActionTypes } from "./types";

export interface User {
  id: number;
  username: string;
  password: string;
  chats: ChatPartial[];
  imageUrl: string;
  createdAt: Date;
}

export interface Credentials {
  userName: string;
  password: string;
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

export const createUser = (newUser: User): CreateUserAction => {
  return {
    type: ActionTypes.createUser,
    payload: newUser,
  };
};
