import { ActionTypes } from ".";

export interface Message {
  id: string;
  content: string;
  author: string;
  authorId: string;
  authorImageUrl: string;
  sentGraphic: boolean;
  graphicUrls: string[];
  createdAt: number;
}

export interface AddMessageActon {
  type: ActionTypes.addMessage;
  payload: Message;
}

export interface DeleteMessageAction {
  type: ActionTypes.deleteMessage;
  payload: string;
}

export const addMessage = (
  newMessage: Message,
  chatId: string
): AddMessageActon => {
  return {
    type: ActionTypes.addMessage,
    payload: newMessage,
  };
};

export const deleteMessage = (
  id: string,
  chatId: string
): DeleteMessageAction => {
  return {
    type: ActionTypes.deleteMessage,
    payload: id,
  };
};
