import { Chat, Action, ActionTypes } from "../actions";
import { emptyChat } from "../util/EmptyModels";

export const chatReducer = (state: Chat = emptyChat, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchChat:
      return action.payload;
    case ActionTypes.addMessage:
      return { ...state, messages: [...state.messages, action.payload] };
    case ActionTypes.deleteMessage:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
