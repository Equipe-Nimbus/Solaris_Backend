import { Router } from "express";
import { buscarImagens } from "../controllers/imagemController";

const router = Router();

router.get("/", buscarImagens);

export default router;
