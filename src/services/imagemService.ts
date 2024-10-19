import { Image } from "../types/image";
import { api } from "../utils";
import { consultaImagem } from "./imagem/consultaImagem";
import { criarImagem } from "./imagem/criarImagem";
import { criarRequisicao } from "./requisicao/criaRequisicao";
import { criarUser } from "./userService";
import { getUserById } from "./usuario/getUserById";

export const obterImagens = async (bbox: string, datetime: string, id: string): Promise<Image[]> => {
  const url = `https://data.inpe.br/bdc/stac/v1/search?collections=CB4A-WPM-PCA-FUSED-1&bbox=${bbox}&datetime=${datetime}`;

  const dados = await api(url);
  /* https://data.inpe.br/bdc/stac/v1/search?collections=CB4A-WPM-PCA-FUSED-1&bbox=-53.68008262499999,-30.704058359478445,-50.888266125,-28.453917336246782&datetime=2024-10-17/2024-09-17 */

  // Ordenar pela data
  const featuresOrdenadas = dados.features.sort((a: any, b: any) => {
    const dataA = new Date(a.properties.datetime);
    const dataB = new Date(b.properties.datetime);
    return dataA.getTime() - dataB.getTime();
  });

  const usuario = await getUserById(id);

  if (usuario == null) {
    throw new Error("Usuário não identificado")
  }

  const requisicao = await criarRequisicao(usuario, datetime);

  const imagens = await Promise.all(featuresOrdenadas.map(async (feature: any) => {
    const imagemSalva = await consultaImagem(feature.id);
    console.log(imagemSalva);
    if (imagemSalva == false) {
      criarImagem(feature.id, feature.bbox, feature.assets.tci.href, requisicao);
    }
    return {
      thumbnail: feature.assets.thumbnail.href,
      tiff: feature.assets.tci.href,
      data: feature.properties.datetime,
      bbox: feature.bbox
    };
  }));
  return imagens;
};