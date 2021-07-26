import { Message } from "./message";
import { ActionTypes } from "./types";

export interface Chat {
  id: number;
  name: string;
  imageUrl: string;
  lastUpdated: Date;
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
