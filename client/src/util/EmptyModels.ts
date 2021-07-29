import { Chat, User } from "../actions";

export const AnonymousUser: User = {
  id: "UNKNOWN",
  userName: "",
  passWord: "",
  chats: [],
  imageUrl: "broken",
  createdAt: new Date().getTime(),
};

export const emptyChat: Chat = {
  id: "UNKNOWN",
  name: "",
  imageUrl: "broken",
  lastUpdated: new Date().getTime(),
  messages: [],
  members: [],
};
