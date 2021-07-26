import { FetchChatAction } from "./chat";
import {
  OpenNewChatAction,
  CloseNewChatAction,
  AddChatPartialAction,
  DeleteChatPartialAction,
  AddMessageActon,
  DeleteMessageAction,
} from "./index";

export enum ActionTypes {
  openNewChat,
  closeNewChat,
  addChatPartial,
  deleteChatPartial,
  addMessage,
  deleteMessage,
  fetchChat,
}

export type Action =
  | OpenNewChatAction
  | CloseNewChatAction
  | AddChatPartialAction
  | DeleteChatPartialAction
  | AddMessageActon
  | DeleteMessageAction
  | FetchChatAction;
