"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = express_1.Router();
exports.router = router;
router.post("/login", controllers_1.auth.login);
