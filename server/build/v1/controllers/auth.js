"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
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
    try {
        // check if username exists
    }
    catch (_b) { }
};
exports.handlers = {
    login: login,
    test: test,
    signUp: signUp,
};
