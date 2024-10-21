import { AppDataSource } from "../../config";
import { Requisicao } from "../../entity";
import { unix_to_date } from "../../utils/conversorUnixEmDate";
import { Imagem } from "../../entity";

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