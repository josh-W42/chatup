import { Router } from "express";
import routes from "./routes";

const router = Router();

router.use("/auth", routes.auth);
router.use("/users", routes.user);
router.use("/chats", routes.chat);
router.use("/messages", routes.message);

export { router };
