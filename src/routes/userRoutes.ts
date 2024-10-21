import e, { Router } from "express";
import { criarNovouser } from "../controllers/userController";

const router = Router();

router.post("/", criarNovouser);

export default router;