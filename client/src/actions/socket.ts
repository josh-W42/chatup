import { ActionTypes, Message } from ".";

export interface NewContentPayload {
  message: Message;
  chatId: string;
}

export interface JoinChatAction {
  type: ActionTypes.joinChat;
  payload: string;
}

export const joinChat = (id: string): JoinChatAction => {
  return {
    type: ActionTypes.joinChat,
    payload: id,
  };
};
