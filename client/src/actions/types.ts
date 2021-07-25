import { OpenNewChatAction, CloseNewChatAction } from "./index";

export enum ActionTypes {
  openNewChat,
  closeNewChat,
}

export type Action = OpenNewChatAction | CloseNewChatAction;
