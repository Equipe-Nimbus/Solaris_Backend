import { Router } from "express";
import { loginUser } from "../controllers";

const router = Router();

router.post("/", loginUser);

export default router;
