"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
var user_1 = __importDefault(require("./user"));
var chat_1 = __importDefault(require("./chat"));
var message_1 = __importDefault(require("./message"));
exports.default = { auth: auth_1.default, user: user_1.default, chat: chat_1.default, message: message_1.default };
