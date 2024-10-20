import { Request, Response } from "express";
import { atualizaLinksImagem, getUserById, obterImagens, processarImagens } from "../services";
import { Image } from "../types/image";
import { criarRequisicao } from "../services/requisicao/criaRequisicao";
import { Requisicao } from "../entity";
import { atualizaStatusRequisicao } from "../services/requisicao/atualizaStatusRequisicao";
import { ResponseIA } from "../types/responseIA";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime, id } = req.query;

  if (!bbox || !datetime || !id) {
    res.status(400).json({ erro: "Os parâmetros bbox, datetime e id são obrigatórios." });
    return;
  }

  const usuario = await getUserById(id as string);

  if (usuario == null) {
    throw new Error("Usuário não identificado")
  }

  const requisicao = await criarRequisicao(usuario, datetime as string);

  let imagens: Image[];
  try {
    imagens = await obterImagens(bbox as string, datetime as string, requisicao as Requisicao);
    console.log("links: ", imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao obter as imagens." });
    return;
  }

  let respostaIA;
  let linksPNG: string[] = [];
  let downloadLinks: string[] = [];
  try {
    respostaIA = await processarImagens(imagens) as ResponseIA;
    if (respostaIA != null || respostaIA != undefined){
      downloadLinks = respostaIA.download_links;
      linksPNG = respostaIA.pngs;
    }    
  } catch (erro) {
    res.status(500).json({ erro });
    return;
  }
  if(respostaIA != null || respostaIA != undefined) {
    imagens.forEach(async (imagem, index) => {
      await atualizaLinksImagem(linksPNG[index], downloadLinks[index], imagem.id);      
    }
  )};

  atualizaStatusRequisicao(requisicao);

  res.status(200).json({
    imagens
  });
}

