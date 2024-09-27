import { api } from "../utils";

export const obterImagens = async (bbox: string, datetime: string): Promise<string[]> => {
  const url = `https://data.inpe.br/bdc/stac/v1/search?collections=CB4A-WPM-PCA-FUSED-1&bbox=${bbox}&datetime=${datetime}`;
  
  const dados = await api(url);

  const linksImagens = dados.features.map((feature: any) => feature.assets.thumbnail.href);
  
  return linksImagens;
};
