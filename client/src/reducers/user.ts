import { Action, ActionTypes, User } from "../actions";
import { AnonymousUser } from "../util/EmptyModels";

export const userReducer = (state: User = AnonymousUser, action: Action) => {
  switch (action.type) {
    case ActionTypes.createUser:
      return action.payload;
    case ActionTypes.loginUser:
      return action.payload;
    case ActionTypes.deleteUser:
      // TODO
      return state;
    case ActionTypes.fetchUser:
      return action.payload;
    case ActionTypes.addChatPartial:
      return { ...state, chats: [action.payload, ...state.chats] };
    case ActionTypes.deleteChatPartial:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload),
      };
    default:
      return state;
  }
};
