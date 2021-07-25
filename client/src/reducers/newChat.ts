import { Action, ActionTypes } from "../actions";

export const newChatReducer = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case ActionTypes.openNewChat:
      return action.payload;
    case ActionTypes.closeNewChat:
      return action.payload;
    default:
      return state;
  }
};
