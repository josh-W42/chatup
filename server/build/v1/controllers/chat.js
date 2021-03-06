"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var helper_1 = require("../util/helper");
var helper_2 = require("../util/helper");
var createChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, user, newChat, newChatRef, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                name = req.body.name;
                if (!name) {
                    return [2 /*return*/, helper_1.handleError(new Error("Invalid Chat Name"), 400, res)];
                }
                user = req.user;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                newChat = {
                    id: "",
                    name: name,
                    imageUrl: "",
                    lastUpdated: new Date().getTime(),
                    lastMessage: "",
                };
                return [4 /*yield*/, models_1.db.ref("/chats").push()];
            case 2:
                newChatRef = _d.sent();
                newChat.id = newChatRef.key;
                newChatRef.set(newChat);
                res.status(201).json({ chat: newChat });
                // create a link between the chat and the first member
                models_1.db.ref("/membersToChats/" + user.userName).update((_a = {},
                    _a["" + newChat.id] = newChat,
                    _a));
                // remove password for security
                user.passWord = "";
                // create an opposing link
                models_1.db.ref("/chatsToMembers").update((_b = {},
                    _b["" + newChat.id] = { user: user },
                    _b));
                // initialize the messages data
                models_1.db.ref("/messages").update((_c = {},
                    _c["" + newChat.id] = "no Messages",
                    _c));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                helper_1.handleError(error_1, 500, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, chatSnapShot, chat, messages, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.db.ref("/chats/" + id).once("value")];
            case 2:
                chatSnapShot = _a.sent();
                if (!chatSnapShot.exists()) {
                    return [2 /*return*/, helper_1.handleError(new Error("Chat Does Not Exist"), 400, res)];
                }
                chat = chatSnapShot.val();
                return [4 /*yield*/, helper_1.getAllMessages(chat.id)];
            case 3:
                messages = _a.sent();
                res.json({
                    chat: __assign(__assign({}, chat), { messages: messages }),
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                helper_1.handleError(error_2, 500, res);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getAllChats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chatsSnapshot, chats, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.db.ref("/chats").once("value")];
            case 1:
                chatsSnapshot = _a.sent();
                chats = helper_2.toArray(chatsSnapshot);
                res.json({
                    chats: chats,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                helper_1.handleError(error_3, 500, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var joinChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, chatSnapShot, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                user = req.user;
                id = req.params.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.db.ref("/chats/" + id).once("value")];
            case 2:
                chatSnapShot = _c.sent();
                if (!chatSnapShot.exists()) {
                    helper_1.handleError(new Error("Chat does not exist"), 400, res);
                }
                // add the chat to the user
                user.passWord = "";
                models_1.db.ref("/chatsToMembers/" + id).update((_a = {},
                    _a["" + user.userName] = user,
                    _a));
                // update associated table
                models_1.db.ref("/membersToChats/" + user.userName).update((_b = {},
                    _b["" + id] = chatSnapShot.val(),
                    _b));
                res.json({
                    chat: chatSnapShot.val(),
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                helper_1.handleError(error_4, 500, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { createChat: createChat, getChat: getChat, getAllChats: getAllChats, joinChat: joinChat };
