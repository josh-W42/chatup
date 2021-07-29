"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var passport_1 = require("passport");
var router = express_1.Router();
router.post("/new", passport_1.authenticate("jwt", { session: false }), controllers_1.chat.createChat);
exports.default = router;
