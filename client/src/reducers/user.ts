import { Action, ActionTypes, User } from "../actions";
import { AnonymousUser } from "../util/EmptyModels";

export const userReducer = (state: User = AnonymousUser, action: Action) => {
  switch (action.type) {
    case ActionTypes.createUser:
      return action.payload;
    case ActionTypes.loginUser:
      // TODO
      return state;
    case ActionTypes.deleteUser:
      // TODO
      return state;
    case ActionTypes.addChatPartial:
      state.chats.push(action.payload);
      return state;
    case ActionTypes.deleteChatPartial:
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
      return state;
    default:
      return state;
  }
};
