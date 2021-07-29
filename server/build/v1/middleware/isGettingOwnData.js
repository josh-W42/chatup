"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isGettingOwnData = function (req, res, next) {
    var user = req.user;
    var userName = req.params.userName;
    if (user && user.userName === userName) {
        next();
        return;
    }
    res.status(403).json({
        message: "Must Be Logged In As That User To Do That"
    });
};
exports.default = isGettingOwnData;
