import { getRequisicaoByUser, obterRequisicaoComImagens } from "../services/requisicaoService";
import { Request, Response } from "express";
import { ListaRequisicao } from "../types/requisicao";

export const buscarRequisicoes = async (req: Request, res: Response): Promise<void> => {
    let id_usuario = parseInt(req.params.id_user);
    try {
        const requisicoes = await getRequisicaoByUser(id_usuario);
        res.send(requisicoes);
        return;
    } catch (error) {
        console.error("Erro ao buscar requisições:", error);
        let listaVazia: ListaRequisicao = { listaRequisicao: [] };
        res.send(listaVazia);
        return;
    }
};

export const buscarRequisicaoPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const requisicao = await obterRequisicaoComImagens(id);

        if (!requisicao) {
            res.status(404).json({ erro: "Requisição não encontrada" });
            return;
        }

        res.status(200).json(requisicao);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ erro: "Erro ao buscar requisição", detalhes: errorMessage });
    }
};