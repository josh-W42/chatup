import { combineReducers } from "redux";
import { ChatPartial } from "../actions";
import { newChatDialogReducer, newChatReducer } from "./newChat";

export interface StoreState {
  newChatOpen: boolean;
  chatPartials: ChatPartial[];
}

export const reducers = combineReducers<StoreState>({
  newChatOpen: newChatDialogReducer,
  chatPartials: newChatReducer,
});
