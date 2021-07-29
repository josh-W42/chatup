export interface DataBase {
  chats: Map<string, Chat>;
  users: Map<string, User>;
  messages: Map<string, Map<string, Message>>;
  chatsToMembers: Map<string, Map<string, string>>;
  membersToChats: Map<string, Map<string, boolean>>;
}

export interface Chat {
  id: string;
  name: string;
  imageUrl: string;
  lastUpdated: number;
  lastMessage: string;
}

export interface User {
  id: string;
  userName: string;
  passWord: string;
  imageUrl: string;
  createdAt: number;
}

export interface Message {
  id: string;
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
