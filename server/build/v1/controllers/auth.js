"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var test = function (req, res) {
    res.json({
        message: "Success",
    });
};
var login = function (req, res) {
    res.json({
        message: "Not Implemented",
    });
};
var signUp = function (req, res) {
    var _a = req.body, userName = _a.userName, password = _a.password;
    console.log(userName, password);
    try {
        // check if username exists
        if (models_1.db.users.has(userName))
            throw new Error("Username is taken!");
        // if not, create new entry
    }
    catch (error) {
        res.json({
            message: error,
        });
    }
};
exports.default = {
    login: login,
    test: test,
    signUp: signUp,
};
