import { Router } from "express";
import { message } from "../controllers";
import { authenticate } from "passport";

const router = Router();

router.post(
  "/new",
  authenticate("jwt", { session: false }),
  message.createMessage
);

export default router;
