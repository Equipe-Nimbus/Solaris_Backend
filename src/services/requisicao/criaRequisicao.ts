import { AppDataSource } from "../../config";
import { Requisicao, User } from "../../entity";
import { converteDatetime } from "../converteDatetime";
import { montaObjetoRequisicao } from "./montaObjetoRequisicao";
import { transformaBbox } from "./transformaBbox";

export const criarRequisicao = async (usuario: User, datetime: string, bbox: string): Promise<Requisicao> => {
    const dataAtual = Math.floor(new Date().getTime() / 1000);
    const periodoRequisicaoOrdenado = converteDatetime(datetime);
    
    const dadosRequisicaoTratados = {
        dataRequisicao: dataAtual,
        dataInicioRequisicao: periodoRequisicaoOrdenado[0],
        dataFinalRequisicao: periodoRequisicaoOrdenado[1],
    };

    const bboxManipulado = transformaBbox(bbox);
    let requisicao = new Requisicao();
    requisicao = montaObjetoRequisicao(requisicao, dadosRequisicaoTratados, usuario, bboxManipulado);

    try {
        const requisicaoRepositorio = AppDataSource.getRepository(Requisicao);
        await requisicaoRepositorio.save(requisicao);
        return requisicao;
    } catch (error) {
        throw new Error(`Descrição do erro: ${error}`);
    };
}