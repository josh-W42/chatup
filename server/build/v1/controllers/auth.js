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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var uuid_1 = require("uuid");
var helper_1 = require("../util/helper");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var JWT_SECRET = process.env.JWT_SECRET;
var test = function (req, res) {
    // const dbRef = db.ref("/"); // a reference to the global db
    // try {
    //   dbRef.once("value", (data) => {
    //     return res.json({
    //       message: "Success",
    //       data,
    //     });
    //   });
    // } catch {
    //   res.json({
    //     message: "sFailure",
    //   });
    // }
    res.json({
        message: "success",
    });
};
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, passWord, foundUserRef, dbSnapshot, user_1, isValid, payload, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userName = _a.userName, passWord = _a.passWord;
                // type guards
                if (!userName || !passWord) {
                    return [2 /*return*/, helper_1.handleError(new Error("Invalid UserName or Password"), 400, res)];
                }
                if (!JWT_SECRET) {
                    return [2 /*return*/, helper_1.handleError(new Error("No Environment Variables"), 500, res)];
                }
                foundUserRef = models_1.db.ref("/users/" + userName);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, foundUserRef.once("value")];
            case 2:
                dbSnapshot = _b.sent();
                if (!dbSnapshot.exists()) {
                    return [2 /*return*/, helper_1.handleError(new Error("No User Found"), 400, res)];
                }
                user_1 = dbSnapshot.val();
                return [4 /*yield*/, bcrypt_1.compare(passWord, user_1.passWord)];
            case 3:
                isValid = _b.sent();
                if (!isValid) {
                    return [2 /*return*/, helper_1.handleError(new Error("Invalid Password"), 400, res)];
                }
                payload = {
                    id: user_1.id,
                    userName: user_1.userName,
                };
                jsonwebtoken_1.sign(payload, JWT_SECRET, { expiresIn: 7200 }, function (error, token) { return __awaiter(void 0, void 0, void 0, function () {
                    var verified, chats;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error)
                                    return [2 /*return*/, helper_1.handleError(error, 500, res)];
                                if (!token)
                                    return [2 /*return*/, helper_1.handleError(new Error("No Token Found"), 500, res)];
                                verified = jsonwebtoken_1.verify(token, JWT_SECRET);
                                return [4 /*yield*/, helper_1.getAllChats(user_1.userName)];
                            case 1:
                                chats = _a.sent();
                                res.json({
                                    token: "Bearer " + token,
                                    user: __assign(__assign({}, user_1), { passWord: "", chats: chats }),
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, helper_1.handleError(error_1, 500, res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, passWord, userRef, foundUserRef, foundUser, newUser_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userName = _a.userName, passWord = _a.passWord;
                // type guard the input
                if (!userName || !passWord) {
                    return [2 /*return*/, helper_1.handleError(new Error("Invalid UserName or Password"), 400, res)];
                }
                userRef = models_1.db.ref("/users");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                foundUserRef = userRef.child("/" + userName);
                return [4 /*yield*/, foundUserRef.once("value")];
            case 2:
                foundUser = _b.sent();
                if (foundUser.exists()) {
                    return [2 /*return*/, helper_1.handleError(new Error("Username Already Exists"), 400, res)];
                }
                newUser_1 = {
                    id: uuid_1.v4(),
                    userName: userName,
                    passWord: passWord,
                    imageUrl: "",
                    createdAt: new Date().getTime(),
                };
                // Salt and Hash passWord
                bcrypt_1.genSalt(12, function (error, salt) {
                    if (error)
                        return helper_1.handleError(error, 500, res);
                    bcrypt_1.hash(newUser_1.passWord, salt, function (error, hash) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            if (error)
                                return [2 /*return*/, helper_1.handleError(error, 500, res)];
                            newUser_1.passWord = hash;
                            // initialize a member to chat resource
                            models_1.db.ref("/membersToChats").update((_a = {},
                                _a["" + newUser_1.userName] = "no chats",
                                _a));
                            // Save the user
                            userRef.update((_b = {},
                                _b["" + newUser_1.userName] = newUser_1,
                                _b), function (err) {
                                if (err) {
                                    // in the event of a failure, remove the previous resource.
                                    models_1.db.ref("/membersToChats").child("" + newUser_1.userName).remove();
                                }
                            });
                            res.status(201).json({
                                created: __assign(__assign({}, newUser_1), { passWord: "", chats: [] }),
                            });
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, helper_1.handleError(error_2, 500, res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    login: login,
    test: test,
    signUp: signUp,
};
