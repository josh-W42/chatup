"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var routes_1 = require("./routes");
var router = express_1.Router();
exports.router = router;
router.use("/auth", routes_1.auth);
