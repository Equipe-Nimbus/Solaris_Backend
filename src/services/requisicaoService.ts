import { Requisicao } from "../entity";
import { AppDataSource } from "../config/data-source";
import { ListaRequisicao, RequisicaoElementoLista } from "../types/requisicao";
import { unix_to_date } from "../utils/conversorUnixEmDate";

export const getRequisicaoByUser = async (idUsuario: number): Promise<ListaRequisicao> => {
    const requisicaoRepository = AppDataSource.getRepository(Requisicao);
    
    const requisicao = await requisicaoRepository.find({ where:{user:{id_user:idUsuario}} });
    
    return formataListaRequisicaoByUser(requisicao);
  };


const formataListaRequisicaoByUser = (listaRequisicao:Requisicao[]):ListaRequisicao =>{
    let listaRequisicaoFormatada:ListaRequisicao = {listaRequisicao:[]}
    listaRequisicao.forEach((requisicao:Requisicao)=>{
        let elementoListaRequisicao:RequisicaoElementoLista = {
            id_requisicao:requisicao.id_requisicao,
            data_requisicao:unix_to_date(requisicao.data_requisicao),
            status_requisicao:requisicao.status_requisicao
        }
        listaRequisicaoFormatada.listaRequisicao.push(elementoListaRequisicao)
    })

    return listaRequisicaoFormatada
}