import { AppDataSource } from "../../config";
import { Requisicao } from "../../entity";
import { unix_to_date } from "../../utils/conversorUnixEmDate";
import { Imagem } from "../../entity";

export const obterRequisicaoComImagens = async (id_requisicao: string) => {
  const requisicaoRepository = AppDataSource.getRepository(Requisicao);
  
  const requisicao = await requisicaoRepository.findOne({
    where: { id_requisicao },
    relations: ["imagens"]
  });

  if (!requisicao) {
    return null;
  }

  const resposta = {
    id_requisicao: requisicao.id_requisicao,
    status_requisicao: requisicao.status_requisicao,
    data_requisicao: unix_to_date(requisicao.data_requisicao),
    tempo_inicio_requisicao: unix_to_date(requisicao.tempo_inicio_requisicao),
    tempo_final_requisicao: unix_to_date(requisicao.tempo_final_requisicao),
    imagens: requisicao.imagens.map((imagem: Imagem) => ({
      id_imagem: imagem.id_imagem,
      link_tiff: imagem.link_imagem_tiff,
      link_thumbnail: imagem.link_imagem_thumbnail,
      bbox_imagem: imagem.bbox_imagem,
      mascara_imagem: imagem.mascaras_imagem,
      link_preview_mascara: imagem.links_download_imagem
    }))
  };

  return resposta;
};
