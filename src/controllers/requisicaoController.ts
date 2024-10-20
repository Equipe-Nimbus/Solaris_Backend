import { getRequisicaoByUser } from "../services/requisicaoService";
import { Request, Response } from "express";
import { ListaRequisicao } from "../types/requisicao";

export const buscarRequisicoes = async (req: Request, res: Response):Promise<void> => {
    let id_usuario = parseInt(req.params.id_user)
    try {
        const requisicoes = await getRequisicaoByUser(id_usuario);
        res.send(requisicoes)
        return;
    } catch (error) {
        console.error("Erro ao buscar requisições:", error);
        let listaVazia:ListaRequisicao = {listaRequisicao:[]}
        res.send(listaVazia)
        return;
    }
}