import axios, { AxiosResponse } from "axios";
import { Message } from "../actions";

const { REACT_APP_SERVER_URL } = process.env;

export interface MessagePayload {
  chatId: string;
  content: string;
  sentGraphic: boolean;
}

export const postMessage = async (
  messageInfo: MessagePayload,
  errorCallBack: () => void,
  successCallBack: (newMessage: Message) => void,
  formData?: FormData
) => {
  try {
    if (!REACT_APP_SERVER_URL) {
      throw new Error("No SERVER URL FOUND");
    }

    const response = await axios.post<
      MessagePayload,
      AxiosResponse<{ message: Message }>
    >(`${REACT_APP_SERVER_URL}messages/new`, messageInfo);

    /*
      TODO, If implementing image uploads, another
      fetch is required to upload the images to the API.
    */

    successCallBack(response.data.message);
  } catch (error) {
    console.error(error);
    errorCallBack();
  }
};
