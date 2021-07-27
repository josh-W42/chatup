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
exports.handlers = {
    login: login,
    test: test,
};
