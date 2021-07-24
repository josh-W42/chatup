import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8000;

// Declare initial Middleware
app.use(express.urlencoded({ extended: false })); // image parsing
app.use(express.json()); // json parser
app.use(morgan("dev")); // development logger
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the ChatUp API!",
  });
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log("Listening on PORT: ", PORT);
});
