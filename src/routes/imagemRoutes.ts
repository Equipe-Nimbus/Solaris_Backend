import { Router } from "express";
import { buscarImagens } from "../controllers";

const router = Router();

router.get("/", buscarImagens);

export default router;
