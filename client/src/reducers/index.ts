import { combineReducers } from "redux";
import { Chat, ChatPartial, User } from "../actions";
import { chatReducer } from "./chat";
import { chatPartialReducer, newChatDialogReducer } from "./chatPartial";
import { userReducer } from "./user";

export interface StoreState {
  newChatOpen: boolean;
  chatList: ChatPartial[];
  chat: Chat;
  user: User;
}

export const reducers = combineReducers<StoreState>({
  newChatOpen: newChatDialogReducer,
  chatList: chatPartialReducer,
  chat: chatReducer,
  user: userReducer,
});
