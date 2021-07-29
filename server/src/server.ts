import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { router as v1Router } from "./v1";
import passport from "passport";
import passportConfig from "./v1/config/passport";
import { Server } from "socket.io";

passportConfig(passport);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Declare initial Middleware
app.use(express.urlencoded({ extended: false })); // image parsing
app.use(express.json()); // json parser
app.use(morgan("dev")); // development logger
app.use(cors()); // allow CORS requests
app.use(passport.initialize()); // passport init

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the ChatUp API!",
  });
});

app.use("/api/v1", v1Router);

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

const server = app.listen(PORT, () => {
  console.log("Listening on PORT: ", PORT);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.emit("message", new Date().toTimeString());
