import { Chat, Action, ActionTypes } from "../actions";

const emptyChat = {
  id: 1,
  name: "basic",
  imageUrl: "broken",
  lastUpdated: new Date(),
  messages: [],
  members: [],
};

export const chatReducer = (state: Chat = emptyChat, action: Action) => {
  switch (action.type) {
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
