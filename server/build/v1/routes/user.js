"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var passport_1 = require("passport");
var isGettingOwnData_1 = __importDefault(require("../middleware/isGettingOwnData"));
var router = express_1.Router();
// router.get("/test", user.test);
router.get("/:userName", passport_1.authenticate("jwt", { session: false }), isGettingOwnData_1.default, controllers_1.user.getUser);
exports.default = router;
