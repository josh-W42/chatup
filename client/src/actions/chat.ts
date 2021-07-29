import { Message } from "./message";
import { ActionTypes } from "./types";

export interface Chat {
  id: number;
  name: string;
  imageUrl: string;
  lastUpdated: number;
  messages: Message[];
  members: number[];
}

export interface AddMessageActon {
  type: ActionTypes.addMessage;
  payload: Message;
}

export interface DeleteMessageAction {
  type: ActionTypes.deleteMessage;
  payload: number;
}

export interface FetchChatAction {
  type: ActionTypes.fetchChat;
  payload: Chat;
}

export const addMessage = (
  newMessage: Message,
  chatId: number
): AddMessageActon => {
  return {
    type: ActionTypes.addMessage,
    payload: newMessage,
  };
};

export const deleteMessage = (
  id: number,
  chatId: number
): DeleteMessageAction => {
  return {
    type: ActionTypes.deleteMessage,
    payload: id,
  };
};

export const fetchChat = (id: number): FetchChatAction => {
  const emptyChat = {
    id: id,
    name: "placeholder",
    imageUrl: "broken",
    lastUpdated: new Date().getTime(),
    messages: [],
    members: [],
  };

  return {
    type: ActionTypes.fetchChat,
    payload: emptyChat,
  };
};
