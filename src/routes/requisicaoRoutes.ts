import { Router } from "express";
import { buscarRequisicoes } from "../controllers";
import { buscarRequisicaoPorId } from "../controllers";

const router = Router();

router.get("/:id_user", buscarRequisicoes);
router.get("/historico/:id", buscarRequisicaoPorId);

export default router;
