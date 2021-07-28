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
  AuthorizeUserAction,
  UnAuthorizeUserAction,
  FetchUserAction,
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
  authorizeUser,
  unAuthorizeUser,
  fetchUser,
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
  | LoginUserAction
  | AuthorizeUserAction
  | UnAuthorizeUserAction
  | FetchUserAction;
