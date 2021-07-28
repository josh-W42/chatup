"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
var handleError = function (err, statusCode, res) {
    console.error(err);
    res.status(statusCode).json({
        message: err.message,
    });
};
exports.handleError = handleError;
