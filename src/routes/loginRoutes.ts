import { Router } from "express";
import { loginUser } from "../controllers";

const router = Router();

router.get("/", loginUser);

export default router;
