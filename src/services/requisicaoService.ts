import { Imagem, Requisicao, User } from "../entity";
import { AppDataSource } from "../config/data-source";
import { ListaRequisicao, RequisicaoElementoLista } from "../types/requisicao";
import { unix_to_date } from "../utils/conversorUnixEmDate";
import { transformaBbox } from "../utils/transformaBBox";
import { converteDatetime } from "../utils/converteDatetime";

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

export const atualizaStatusRequisicao = async (requisicao: Requisicao): Promise<void> => {
    const requisicaoRepositorio = AppDataSource.getRepository(Requisicao);
    
    try {        
        await requisicaoRepositorio
        .createQueryBuilder()
        .update(Requisicao)
        .set({
            status_requisicao: true,
        })
        .where("id_requisicao = :id", { id: requisicao.id_requisicao })
        .execute();
    } catch (error) {
        console.log(`Descrição do erro: ${error}`)
    }
};

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
};
  
export const montaObjetoRequisicao =  (requisicao: Requisicao, dadosRequisao: any, usuario: User, bbox: number[]): Requisicao => {
    requisicao.data_requisicao = dadosRequisao.dataRequisicao;
    requisicao.tempo_inicio_requisicao = dadosRequisao.dataInicioRequisicao;
    requisicao.tempo_final_requisicao = dadosRequisao.dataFinalRequisicao;
    requisicao.bbox_requisicao = bbox;
    requisicao.user = usuario;
  
    return requisicao;
};

export const obterRequisicaoComImagens = async (id_requisicao: string) => {
    const requisicaoRepository = AppDataSource.getRepository(Requisicao);
    
    try {
      const requisicao = await requisicaoRepository.findOne({
        where: { id_requisicao },
        relations: ["imagens"]
      });
  
      if (!requisicao) {
        console.error(`Requisição com ID ${id_requisicao} não encontrada.`);
        return null;
      }
  
      const resposta = {
        id_requisicao: requisicao.id_requisicao,
        status_requisicao: requisicao.status_requisicao,
        data_requisicao: unix_to_date(requisicao.data_requisicao),
        tempo_inicio_requisicao: unix_to_date(requisicao.tempo_inicio_requisicao),
        tempo_final_requisicao: unix_to_date(requisicao.tempo_final_requisicao),
        bbox_requisicao: requisicao.bbox_requisicao,
        imagens: requisicao.imagens.map((imagem: Imagem) => ({
          id: imagem.id_imagem,
          tiff: imagem.link_imagem_tiff,
          thumbnail: imagem.link_imagem_thumbnail,
          bbox: imagem.bbox_imagem,
          mascara: imagem.mascaras_imagem,
          download_links: imagem.links_download_imagem
        }))
      };
  
      return resposta;
    } catch (error) {
      console.error("Erro ao obter requisição com imagens:", error);
      throw error;
    }
};