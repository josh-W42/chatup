import { combineReducers } from "redux";
import { Chat, User } from "../actions";
import { authReducer } from "./auth";
import { chatReducer } from "./chat";
import { newChatDialogReducer } from "./chatPartial";
import { userReducer } from "./user";

export interface StoreState {
  newChatOpen: boolean;
  chat: Chat;
  user: User;
  isAuth: boolean;
}

export const reducers = combineReducers<StoreState>({
  newChatOpen: newChatDialogReducer,
  chat: chatReducer,
  user: userReducer,
  isAuth: authReducer,
});
