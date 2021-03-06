import { Action, ActionTypes } from "../actions";

export const newChatDialogReducer = (
  state: boolean = false,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.openNewChat:
      return action.payload;
    case ActionTypes.closeNewChat:
      return action.payload;
    default:
      return state;
  }
};
