"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../util/helper");
var createChat = function (req, res) {
    var name = req.body.name;
    if (!name) {
        return helper_1.handleError(new Error("Invalid Chat Name"), 400, res);
    }
    try {
    }
    catch (error) {
        helper_1.handleError(error, 500, res);
    }
    var user = req.user;
};
exports.default = { createChat: createChat };
