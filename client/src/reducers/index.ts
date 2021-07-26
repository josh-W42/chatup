import { combineReducers } from "redux";
import { Chat, ChatPartial } from "../actions";
import { chatReducer } from "./chat";
import { newChatDialogReducer, chatPartialReducer } from "./chatPartial";

export interface StoreState {
  newChatOpen: boolean;
  chatPartials: ChatPartial[];
  chat: Chat;
}

export const reducers = combineReducers<StoreState>({
  newChatOpen: newChatDialogReducer,
  chatPartials: chatPartialReducer,
  chat: chatReducer,
});
