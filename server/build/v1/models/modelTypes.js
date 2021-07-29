"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
