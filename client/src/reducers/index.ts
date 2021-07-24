import { combineReducers } from "redux";

export interface StoreState {}

export const reducers = combineReducers<StoreState>({
  init: () => 1, // just for initalizing
});
