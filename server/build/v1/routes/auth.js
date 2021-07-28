"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = express_1.Router();
router.get("/test", controllers_1.auth.test);
router.post("/login", controllers_1.auth.login);
router.post("/signup", controllers_1.auth.signUp);
exports.default = router;
