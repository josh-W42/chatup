export interface DataBase {
  chats: Map<number, Chat>;
  users: Map<string, User>;
  messages: Map<number, Map<number, Message>>;
  members: Map<number, Map<string, boolean>>;
}

export interface Chat {
  name: string;
  imageUrl: string;
  lastUpdated: number;
  lastMessage: string;
}

export interface User {
  userName: string;
  password: string;
  imageUrl: string;
  createdAt: number;
}

export interface Message {
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
    "members": {
      "23483932": {
        "username": { true },
        ...
      },
      ...
    }
  }
*/
