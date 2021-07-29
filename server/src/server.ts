import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { router as v1Router } from "./v1";
import passport from "passport";
import passportConfig from "./v1/config/passport";
import { Server } from "socket.io";
import { JoinLeavePayload, NewContentPayload } from "./v1/models";

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
  // console.log(`connected: $${socket.id}`);
  // socket.on("leave room", (data: JoinLeavePayload) => {
  //   const id: string = data.id;
  //   socket.leave(id);
  // });
  // socket.on("join room", (data: JoinLeavePayload) => {
  //   console.log(data.id);
  //   const id: string = data.id;
  //   socket.join(id);
  // });
  // socket.on("new message", (data: NewContentPayload) => {
  //   // console.log(data.chatId);
  //   // console.log(socket.rooms);
  //   io.to(data.chatId).emit("update messages", data);
  //   // socket.to(data.chatId).emit("new message", data);
  // });
  // socket.on("disconnect", () => {
  //   // console.log(`disconnect: ${socket.id}`);
  // });
});

// io.emit("message", new Date().toTimeString());
