import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL } = process.env;

// get the service account json
const serviceAccount = require("../../../firebaseConfig.json");

// initialize app with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE_URL,
});

export const db = admin.database();

// let data: DataBase = {
//   chats: new Map<string, Chat>(),
//   users: new Map<string, User>(),
//   messages: new Map<string, Map<string, Message>>(),
//   members: new Map<string, Map<string, string>>(),
// };

export * from "./modelTypes";
export * from "./expressTypes";
