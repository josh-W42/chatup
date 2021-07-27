import { Router } from "express";
import { auth } from "../controllers";

const router = Router();

router.get("/test", auth.test);
router.post("/login", auth.login);
router.post("/signup", auth.signUp);

export { router };
