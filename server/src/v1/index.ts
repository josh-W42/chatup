import { Router } from "express";
import routes from "./routes";

const router = Router();

router.use("/auth", routes.auth);

export { router };
