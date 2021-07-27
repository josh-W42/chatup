"use strict";
// import * as admin from "firebase-admin";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// import * as data from "./fake.json";
var data = {
    chats: new Map(),
    users: new Map(),
    messages: new Map(),
    members: new Map(),
};
exports.db = data;
