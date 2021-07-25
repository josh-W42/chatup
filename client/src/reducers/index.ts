import { combineReducers } from "redux";
import { newChatReducer } from "./newChat";

export interface StoreState {
  newChatOpen: boolean;
}

export const reducers = combineReducers<StoreState>({
  newChatOpen: newChatReducer,
});
