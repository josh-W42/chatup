import { Router } from "express";
import { user } from "../controllers";
import { authenticate } from "passport";
import isGettingOwnData from "../middleware/isGettingOwnData";

const router = Router();

router.get("/test", user.test);

router.get(
  "/:userName",
  authenticate("jwt", { session: false }),
  isGettingOwnData,
  user.getUser
);

export default router;
