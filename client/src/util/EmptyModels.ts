import { Chat, User } from "../actions";

export const AnonymousUser: User = {
  id: -1,
  username: "Anonymous",
  password: "",
  chats: [],
  imageUrl: "broken",
  createdAt: new Date(),
};

export const emptyChat: Chat = {
  id: 1,
  name: "basic",
  imageUrl: "broken",
  lastUpdated: new Date(),
  messages: [],
  members: [],
};
