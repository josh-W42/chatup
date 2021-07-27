// import * as admin from "firebase-admin";

// get the service account json
// const serviceAccount = require("../../../firebaseConfig.json");

// initialize app with service account
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://chatup-8fbe4-default-rtdb.firebaseio.com",
// });

// export const db = admin.database()
import { DataBase, Chat, User, Message } from "./types";
// import * as data from "./fake.json";

let data: DataBase = {
  chats: new Map<number, Chat>(),
  users: new Map<string, User>(),
  messages: new Map<number, Map<number, Message>>(),
  members: new Map<number, Map<string, boolean>>(),
};

export const db: DataBase = data;
