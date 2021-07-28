"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var DATABASE_URL = process.env.DATABASE_URL;
// get the service account json
var serviceAccount = require("../../../firebaseConfig.json");
// initialize app with service account
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: DATABASE_URL,
});
exports.db = firebase_admin_1.default.database();
// let data: DataBase = {
//   chats: new Map<uuid, Chat>(),
//   users: new Map<string, User>(),
//   messages: new Map<uuid, Map<uuid, Message>>(),
//   members: new Map<uuid, Map<string, string>>(),
// };
__exportStar(require("./modelTypes"), exports);
__exportStar(require("./expressTypes"), exports);
