import { Action, ActionTypes, ChatPartial } from "../actions";

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

export const newChatReducer = (state: ChatPartial[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.addChatPartial:
      return state.concat([action.payload]);
    case ActionTypes.deleteChatPartial:
      return state.filter((chat) => chat.id !== action.payload);
    default:
      return state;
  }
};
