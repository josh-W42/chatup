import { Router } from "express";
import { chat } from "../controllers";
import { authenticate } from "passport";

const router = Router();

router.post("/new", authenticate("jwt", { session: false }), chat.createChat);

export default router;
