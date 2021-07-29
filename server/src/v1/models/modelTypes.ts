export type uuid = string;

export interface DataBase {
  chats: Map<uuid, Chat>;
  users: Map<string, User>;
  messages: Map<uuid, Map<uuid, Message>>;
  chatsToMembers: Map<uuid, Map<string, string>>;
  membersToChats: Map<string, Map<uuid, boolean>>;
}

export interface Chat {
  id: uuid;
  name: string;
  imageUrl: string;
  lastUpdated: number;
  lastMessage: string;
}

export interface User {
  id: uuid;
  userName: string;
  passWord: string;
  imageUrl: string;
  createdAt: number;
}

export interface Message {
  id: uuid;
  author: string;
  content: string;
  authorImageUrl: string;
  sentGraphic: boolean;
  graphicUrls: string[];
  createdAt: number;
}

/*
  An example JSON layout of database
  for reference.
  
  {
    "chats": {
      "23483932": { Chat },
      ...
    },
    "users": {
      "username": { User },
      ...
    },
    "messages": {
      "23483932": {
        "94584503": { Message },
        ...
      },
      ...
    },
    "chatsToMembers": {
      "23483932": {
        "username": { "nickname" || "username" },
        ...
      },
      ...
    }
    "membersToChats": {
      "userName": {
        "23483932": true,
        ...
      },
      ...
    },
  }
*/
