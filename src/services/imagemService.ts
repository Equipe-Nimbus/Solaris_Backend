import { Requisicao } from "../entity";
import { Image } from "../types/image";
import { api } from "../utils";
import { getImageById } from "./imagem/getImageById";
import { criarImagem } from "./imagem/criarImagem";

export const obterImagens = async (bbox: string, datetime: string, requisicao: Requisicao): Promise<Image[] | void> => {
  try {    
    const url = `https://data.inpe.br/bdc/stac/v1/search?collections=CB4A-WPM-PCA-FUSED-1&bbox=${bbox}&datetime=${datetime}&limit=1`;
  
    const dados = await api(url);
  
    // Ordenar pela data
    const featuresOrdenadas = dados.features.sort((a: any, b: any) => {
      const dataA = new Date(a.properties.datetime);
      const dataB = new Date(b.properties.datetime);
      return dataA.getTime() - dataB.getTime();
    });
  
    const imagens = await Promise.all(featuresOrdenadas.map(async (feature: any) => {
      const imagemSalva = await getImageById(feature.id);
      if (imagemSalva) {
        /* relacionaImagemRequisicao(imagemSalva.id_imagem, requisicao); */
        return {
          id: feature.id,
          thumbnail: feature.assets.thumbnail.href,
          tiff: feature.assets.tci.href,
          data: feature.properties.datetime,
          bbox: feature.bbox,
          mascara: imagemSalva.mascaras_imagem,
          download_links: imagemSalva.links_download_imagem,
        };
      }
      criarImagem(feature.id, feature.bbox, feature.assets.tci.href, feature.assets.thumbnail.href, requisicao);
      return {
        id: feature.id,
        thumbnail: feature.assets.thumbnail.href,
        tiff: feature.assets.tci.href,
        data: feature.properties.datetime,
        bbox: feature.bbox
      };
    }));
    return imagens;
  } catch (error) {
    console.log(`Problemas ao buscar imagem: ${error}`)
  }
};