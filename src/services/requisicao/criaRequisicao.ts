import { AppDataSource } from "../../config";
import { Requisicao, User } from "../../entity";
import { converteDatetime } from "../converteDatetime";
import { montaObjetoRequisicao } from "./montaObjetoRequisicao";

export const criarRequisicao = async (usuario: User, datetime: string): Promise<Requisicao> => {
    const dataAtual = Math.floor(new Date().getTime() / 1000);
    const periodoRequisicaoOrdenado = converteDatetime(datetime);
    
    const dadosRequisicaoTratados = {
        dataRequisicao: dataAtual,
        dataInicioRequisicao: periodoRequisicaoOrdenado[0],
        dataFinalRequisicao: periodoRequisicaoOrdenado[1],
    };

    let requisicao = new Requisicao();
    requisicao = montaObjetoRequisicao(requisicao, dadosRequisicaoTratados, usuario);

    try {
        const requisicaoRepositorio = AppDataSource.getRepository(Requisicao);
        await requisicaoRepositorio.save(requisicao);
        return requisicao;
    } catch (error) {
        throw new Error(`Descrição do erro: ${error}`);
    };
}