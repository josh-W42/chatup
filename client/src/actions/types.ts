import {
  OpenNewChatAction,
  CloseNewChatAction,
  AddChatPartialAction,
  DeleteChatPartialAction,
} from "./index";

export enum ActionTypes {
  openNewChat,
  closeNewChat,
  addChatPartial,
  deleteChatPartial,
}

export type Action =
  | OpenNewChatAction
  | CloseNewChatAction
  | AddChatPartialAction
  | DeleteChatPartialAction;
