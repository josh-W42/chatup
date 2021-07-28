"use strict";
// For production
// import admin from "firebase-admin";
// import dotenv from "dotenv";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var data = {
    chats: new Map(),
    users: new Map(),
    messages: new Map(),
    members: new Map(),
};
exports.db = data;
__exportStar(require("./modelTypes"), exports);
__exportStar(require("./expressTypes"), exports);
