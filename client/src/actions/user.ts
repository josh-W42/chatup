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

export const createUser = (newUser: User): CreateUserAction => {
  return {
    type: ActionTypes.createUser,
    payload: newUser,
  };
};
