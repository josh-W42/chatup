import { combineReducers } from "redux";
import { Chat, ChatPartial, User } from "../actions";
import { chatReducer } from "./chat";
import { newChatDialogReducer, chatPartialReducer } from "./chatPartial";
import { userReducer } from "./user";

export interface StoreState {
  newChatOpen: boolean;
  chatPartials: ChatPartial[];
  chat: Chat;
  user: User;
}

export const reducers = combineReducers<StoreState>({
  newChatOpen: newChatDialogReducer,
  chatPartials: chatPartialReducer,
  chat: chatReducer,
  user: userReducer,
});
