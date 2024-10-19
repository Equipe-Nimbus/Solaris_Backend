import { Requisicao, User } from "../../entity"

export const montaObjetoRequisicao =  (requisicao: Requisicao, dadosRequisao: any, usuario: User): Requisicao => {
    requisicao.data_requisicao = dadosRequisao.dataRequisicao;
    requisicao.tempo_inicio_requisicao = dadosRequisao.dataInicioRequisicao;
    requisicao.tempo_final_requisicao = dadosRequisao.dataFinalRequisicao;
    requisicao.User = usuario;

    return requisicao;
}