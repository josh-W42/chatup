import { Router } from "express";
import routes from "./routes";

const router = Router();

router.use("/auth", routes.auth);
router.use("/users", routes.user);

export { router };
