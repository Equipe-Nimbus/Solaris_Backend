import { Imagem, Requisicao } from "../entity";
import { Image } from "../types/image";
import { api } from "../utils";
import { AppDataSource } from "../config";
import axios from "axios";

export const obterImagens = async (bbox: string, datetime: string, requisicao: Requisicao): Promise<Image[] | void> => {
  try {    
    const url = `https://data.inpe.br/bdc/stac/v1/search?collections=CB4A-WPM-PCA-FUSED-1&bbox=${bbox}&datetime=${datetime}`;
    const dados = await api(url);
  
    const features = dados.features;
    const featuresOrdenadas = dados.features.sort((a: any, b: any) => {
      const dataA = new Date(a.properties.datetime);
      const dataB = new Date(b.properties.datetime);
      return dataA.getTime() - dataB.getTime();
    });
  
    const imagens = await Promise.all(featuresOrdenadas.map(async (feature: any) => {
      const imagemSalva = await getImageById(feature.id);
      if (imagemSalva) {
        return {
          id: feature.id,
          thumbnail: feature.assets.thumbnail.href,
          tiff: feature.assets.tci.href,
          data_imagem_criacao: feature.properties.datetime,
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
        data_imagem_criacao: feature.properties.datetime,
        bbox: feature.bbox
      };
    }));
    return imagens;
  } catch (error) {
    console.log(`Problemas ao buscar imagem: ${error}`)
  }
};

export const criarImagem = async (idImagem: string, bboxImagem: number[], linkImagemTiff: string, linkImagemThumbnail: string, requisicao: Requisicao): Promise<void> => {
  let imagem = new Imagem();
  imagem = montaObjetoImagem(imagem, idImagem, linkImagemTiff,linkImagemThumbnail ,bboxImagem);

  try {
      const imagemRepositorio = AppDataSource.getRepository(Imagem);
      await imagemRepositorio.save(imagem);
  } catch (error) {
      console.log(error);
  };
};

export const atualizaLinksImagem = async (linkMascara: string, linkDownload: string, idImagem: string): Promise<void> => {
  const imagemRepositorio = AppDataSource.getRepository(Imagem);
  try {
      const imagemRecuperada = await getImageById(idImagem) as Imagem;
      if(imagemRecuperada.mascaras_imagem == null || imagemRecuperada.mascaras_imagem == undefined) {
          await imagemRepositorio.createQueryBuilder().
                  update(imagemRecuperada).
                  set({
                      mascaras_imagem: linkMascara,
                      links_download_imagem: linkDownload,
                  }).
                  where(
                      "id_imagem = :id", {id: imagemRecuperada.id_imagem} 
                  ).
                  execute();          
      }
  } catch (error) {
      console.log(`Descrição do erro: ${error}`)
  } 
};

export const getImageById = async (idImagem: string): Promise<Imagem | null> =>  {
  const imageRepositorio = AppDataSource.getRepository(Imagem);
 
  const imagemRecuperada = await imageRepositorio.findOne({
      where: {
          id_imagem: idImagem,
      },
  });

  return imagemRecuperada;
  
};

export const montaObjetoImagem = (imagem: Imagem, id_imagem: string, linkImagemTiff: string, linkImagemThumbnail: string, bboxImagem: number[]): Imagem => {
  imagem.id_imagem = id_imagem;
  imagem.link_imagem_tiff = linkImagemTiff;
  imagem.link_imagem_thumbnail = linkImagemThumbnail;
  imagem.bbox_imagem = bboxImagem;
  return imagem;
};

export const relacionaImagemRequisicao = async (imagemId: string, requisicao: Requisicao): Promise<void> => {
  const imagemRepositorio = AppDataSource.getRepository(Imagem);

  const imagemRecuperada = await getImageById(imagemId);

  console.log(imagemRecuperada);

  await imagemRepositorio.createQueryBuilder().
              relation(Requisicao, "imagens").
              of(requisicao).
              add(imagemRecuperada);
};