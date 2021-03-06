"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var routes_1 = __importDefault(require("./routes"));
var router = express_1.Router();
exports.router = router;
router.use("/auth", routes_1.default.auth);
router.use("/users", routes_1.default.user);
router.use("/chats", routes_1.default.chat);
router.use("/messages", routes_1.default.message);
