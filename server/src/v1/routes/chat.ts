import { Router } from "express";
import { chat } from "../controllers";
import { authenticate } from "passport";

const router = Router();

router.get("/:id", authenticate("jwt", { session: false }), chat.getChat);

router.post("/new", authenticate("jwt", { session: false }), chat.createChat);

export default router;
