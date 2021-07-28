"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var v1_1 = require("./v1");
var passport_1 = __importDefault(require("passport"));
var passport_2 = __importDefault(require("./v1/config/passport"));
passport_2.default(passport_1.default);
dotenv_1.default.config();
var app = express_1.default();
var PORT = process.env.PORT || 8000;
// Declare initial Middleware
app.use(express_1.default.urlencoded({ extended: false })); // image parsing
app.use(express_1.default.json()); // json parser
app.use(morgan_1.default("dev")); // development logger
app.use(cors_1.default()); // allow CORS requests
app.use(passport_1.default.initialize()); // passport init
app.get("/api", function (req, res) {
    res.status(200).json({
        message: "Welcome to the ChatUp API!",
    });
});
app.use("/api/v1", v1_1.router);
app.get("*", function (req, res) {
    res.status(404).json({
        message: "Not Found",
    });
});
app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
});
