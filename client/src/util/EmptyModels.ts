import { Chat, User } from "../actions";

export const AnonymousUser: User = {
  id: -1,
  userName: "",
  passWord: "",
  chats: [],
  imageUrl: "broken",
  createdAt: new Date().getTime(),
};

export const emptyChat: Chat = {
  id: -1,
  name: "",
  imageUrl: "broken",
  lastUpdated: new Date().getTime(),
  messages: [],
  members: [],
};
