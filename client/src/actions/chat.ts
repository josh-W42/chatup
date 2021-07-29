import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { Message } from "./message";
import { ActionTypes } from "./types";

const { REACT_APP_SERVER_URL } = process.env;

export interface Chat {
  id: string;
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
  payload: string;
}

export interface FetchChatAction {
  type: ActionTypes.fetchChat;
  payload: Chat;
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

export const fetchChat = (id: number, errorCallback: () => void) => {
  return async (dispatch: Dispatch<FetchChatAction>) => {
    try {
      if (!REACT_APP_SERVER_URL) {
        throw new Error("No Server URL Found");
      }

      const response = await axios.get<any, AxiosResponse<{ chat: Chat }>>(
        `${REACT_APP_SERVER_URL}chats/${id}`
      );

      dispatch<FetchChatAction>({
        type: ActionTypes.fetchChat,
        payload: response.data.chat,
      });
    } catch (error) {
      console.error(error);
      errorCallback();
    }
  };
};
