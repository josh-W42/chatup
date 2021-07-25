import { ActionTypes } from "./types";

export interface OpenNewChatAction {
  type: ActionTypes.openNewChat;
  payload: boolean;
}

export interface CloseNewChatAction {
  type: ActionTypes.closeNewChat;
  payload: boolean;
}

export const openNewChat = (): OpenNewChatAction => {
  return {
    type: ActionTypes.openNewChat,
    payload: true,
  };
};

export const closeNewChat = (): CloseNewChatAction => {
  return {
    type: ActionTypes.closeNewChat,
    payload: false,
  };
};
