// For production
// import * as admin from "firebase-admin";

// const { DATABASE_URL } = process.env;

// get the service account json
// const serviceAccount = require("../../../firebaseConfig.json");

// initialize app with service account
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: DATABASE_URL,
// });

// export const db = admin.database()

import { DataBase, Chat, User, Message } from "./types";

let data: DataBase = {
  chats: new Map<number, Chat>(),
  users: new Map<string, User>(),
  messages: new Map<number, Map<number, Message>>(),
  members: new Map<number, Map<string, boolean>>(),
};

export const db: DataBase = data;
export * from "./types";
