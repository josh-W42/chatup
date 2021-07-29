import axios, { AxiosResponse } from "axios";
import { ChatPartial } from "../actions";

const { REACT_APP_SERVER_URL } = process.env;

export interface ChatPartialPayload {
  name: string;
  imageUrl: string;
}

export const postChatPartial = async (
  chatInfo: ChatPartialPayload,
  errorCallBack: Function,
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
