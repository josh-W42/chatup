"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var app = express_1.default();
var PORT = process.env.PORT || 8000;
// Declare initial Middleware
app.use(express_1.default.urlencoded({ extended: false })); // image parsing
app.use(express_1.default.json()); // json parser
app.use(morgan_1.default("dev")); // development logger
app.use(cors_1.default());
app.get("/api", function (req, res) {
    res.json({
        message: "Welcome to the ChatUp API!",
    });
});
app.get("*", function (req, res) {
    res.status(404).json({
        message: "Not Found",
    });
});
app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
});
