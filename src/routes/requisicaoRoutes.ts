import { Router } from "express";
import { buscarRequisicoes } from "../controllers";

const router = Router();

router.get("/:id_user", buscarRequisicoes);

export default router;
