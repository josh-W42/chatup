import axios, { AxiosResponse } from "axios";
import { ChatPartial } from "../actions";

const { REACT_APP_SERVER_URL } = process.env;

export interface ChatPartialPayload {
  name: string;
}

export const postChatPartial = async (
  chatInfo: ChatPartialPayload,
  errorCallBack: () => void,
  successCallBack: (newChat: ChatPartial) => void,
  formData?: FormData
) => {
  try {
    if (!REACT_APP_SERVER_URL) {
      throw new Error("No SERVER URL FOUND");
    }

    const response = await axios.post<
      ChatPartialPayload,
      AxiosResponse<{ chat: ChatPartial }>
    >(`${REACT_APP_SERVER_URL}chats/new`, chatInfo);

    /*
      TODO, If implementing image uploads, another
      fetch is required to upload the image to the API.
    */

    successCallBack(response.data.chat);
  } catch (error) {
    console.error(error);
    errorCallBack();
  }
};

export const fetchChatPartials = async (
  errorCallback: () => void,
  successCallBack: (chats: ChatPartial[]) => void
) => {
  try {
    if (!REACT_APP_SERVER_URL) {
      throw new Error("NO SERVER URL FOUND");
    }

    const response = await axios.get<
      null,
      AxiosResponse<{ chats: ChatPartial[] }>
    >(`${REACT_APP_SERVER_URL}chats/all`);

    successCallBack(response.data.chats);
  } catch (error) {
    console.error(error);
    errorCallback();
  }
};
