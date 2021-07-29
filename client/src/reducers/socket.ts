import { Action, ActionTypes } from "../actions";

export const chatListenerReducer = (state: string = "", action: Action) => {
  switch (action.type) {
    case ActionTypes.joinChat:
      return action.payload;
    default:
      return state;
  }
};
