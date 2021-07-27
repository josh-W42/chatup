import { Chat, Action, ActionTypes } from "../actions";
import { emptyChat } from "../util/EmptyModels";

export const chatReducer = (state: Chat = emptyChat, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchChat:
      return action.payload;
    case ActionTypes.addMessage:
      state.messages.push(action.payload);
      return state;
    case ActionTypes.deleteMessage:
      state.messages = state.messages.filter((message) => {
        return message.id !== action.payload;
      });
      return state;
    default:
      return state;
  }
};
