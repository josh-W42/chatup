import { Router } from "express";
import { auth } from "../controllers";

const router = Router();

router.get("/test", auth.test);
router.post("/login", auth.login);

export { router };
