import {
  OpenNewChatAction,
  CloseNewChatAction,
  AddChatPartialAction,
  DeleteChatPartialAction,
  AddMessageActon,
  DeleteMessageAction,
  CreateUserAction,
  LoginUserAction,
  FetchChatAction,
  DeleteUserAction,
} from "./index";

export enum ActionTypes {
  openNewChat,
  closeNewChat,
  addChatPartial,
  deleteChatPartial,
  addMessage,
  deleteMessage,
  fetchChat,
  createUser,
  deleteUser,
  loginUser,
}

export type Action =
  | OpenNewChatAction
  | CloseNewChatAction
  | AddChatPartialAction
  | DeleteChatPartialAction
  | AddMessageActon
  | DeleteMessageAction
  | FetchChatAction
  | CreateUserAction
  | DeleteUserAction
  | LoginUserAction;
