import { ActionTypes } from "./index";

/*
  Chat Partials are smaller data versions
  of the Chat Model structure. Mainly used
  for presenting in long lists.

  The normal Chat Models contain additional information,
  like all its messages and members for example
*/
export interface ChatPartial {
  id: number;
  name: string;
  imageUrl: string;
  lastUpdated: number;
  lastMessage: string;
}

export interface AddChatPartialAction {
  type: ActionTypes.addChatPartial;
  payload: ChatPartial;
}

export interface DeleteChatPartialAction {
  type: ActionTypes.deleteChatPartial;
  payload: number;
}

export const addChatPartial = (newChat: ChatPartial): AddChatPartialAction => {
  return {
    type: ActionTypes.addChatPartial,
    payload: newChat,
  };
};

export const deleteChatPartial = (id: number): DeleteChatPartialAction => {
  return {
    type: ActionTypes.deleteChatPartial,
    payload: id,
  };
};
