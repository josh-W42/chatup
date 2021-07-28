import { Chat, User } from "../actions";

export const AnonymousUser: User = {
  id: -1,
  userName: "Anonymous",
  password: "",
  chats: [],
  imageUrl: "broken",
  createdAt: new Date(),
};

export const emptyChat: Chat = {
  id: -1,
  name: "",
  imageUrl: "broken",
  lastUpdated: new Date(),
  messages: [],
  members: [],
};
