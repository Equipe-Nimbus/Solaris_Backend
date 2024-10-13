import { Image } from "../types/image";
import { api } from "../utils";

export const obterImagens = async (bbox: string, datetime: string): Promise<Image[]> => {
  const url = `https://data.inpe.br/bdc/stac/v1/search?collections=CB4A-WPM-PCA-FUSED-1&bbox=${bbox}&datetime=${datetime}`;

  const dados = await api(url);

  // Ordenar pela data
  const featuresOrdenadas = dados.features.sort((a: any, b: any) => {
    const dataA = new Date(a.properties.datetime);
    const dataB = new Date(b.properties.datetime);
    return dataA.getTime() - dataB.getTime();
  });

  const imagens = featuresOrdenadas.map((feature: any) => {
    return {
      thumbnail: feature.assets.thumbnail.href,
      tiff: feature.assets.tci.href,
      data: feature.properties.datetime,
      bbox: feature.bbox
    };
  });

  return imagens;
};