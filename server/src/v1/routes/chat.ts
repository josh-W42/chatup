import { Router } from "express";
import { chat } from "../controllers";
import { authenticate } from "passport";

const router = Router();

router.get("/all", authenticate("jwt", { session: false }), chat.getAllChats);

router.get("/:id", authenticate("jwt", { session: false }), chat.getChat);

router.put("/:id/join", authenticate("jwt", { session: false }), chat.joinChat);

router.post("/new", authenticate("jwt", { session: false }), chat.createChat);

export default router;
